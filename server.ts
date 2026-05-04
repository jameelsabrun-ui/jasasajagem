import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import midtransClient from "midtrans-client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialization for Stripe
let stripe: Stripe | null = null;
const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

// Lazy initialization for Midtrans
let snap: any = null;
const getMidtrans = () => {
  if (!snap && process.env.MIDTRANS_SERVER_KEY) {
    snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });
  }
  return snap;
};

const PRODUCTS = [
  { id: 'vibe-coding-library', name: 'Vibe-Coding Expert Prompt Library', price_idr: 250000, price_usd: 19 },
  { id: 'wealth-tech-dashboard', name: 'WealthTech Lite Dashboard', price_idr: 150000, price_usd: 12 },
  { id: 'bpom-automation', name: 'BPOM Notifkos Ready Pack', price_idr: 550000, price_usd: 39 },
  { id: 'fractal-motif-generator', name: 'JBatik Fractal AI Generator', price_idr: 1500000, price_usd: 99 }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "jasasaja API is running" });
  });

  // Fetch localized pricing with PPP logic
  app.get("/api/products/pricing", (req, res) => {
    const countryCode = req.headers['x-appengine-country'] || 'ID'; // Default to Indonesia if unknown
    
    // Simple PPP logic: 20% discount for non-US/EU/SG if paying in USD? 
    // Or just provide the IDR vs USD rates.
    const pppFactor = countryCode === 'ID' ? 0.85 : 1.0; 

    const localizedProducts = PRODUCTS.map(p => ({
      ...p,
      ppp_price_usd: Math.round(p.price_usd * pppFactor),
      suggested_currency: countryCode === 'ID' ? 'IDR' : 'USD'
    }));

    res.json({ products: localizedProducts, country: countryCode });
  });

  // Checkout Endpoint
  app.post("/api/payments/checkout", async (req, res) => {
    const { productId, currency, userEmail } = req.body;
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    try {
      if (currency === 'IDR') {
        const midtrans = getMidtrans();
        if (!midtrans) throw new Error("Midtrans keys not configured");

        const parameter = {
          transaction_details: {
            order_id: `ORDER-${Date.now()}-${productId}`,
            gross_amount: product.price_idr
          },
          customer_details: {
            email: userEmail
          }
        };

        const transaction = await midtrans.createTransaction(parameter);
        return res.json({ checkoutUrl: transaction.redirect_url, token: transaction.token });
      } else {
        const stripeClient = getStripe();
        if (!stripeClient) throw new Error("Stripe secret key not configured");

        const session = await stripeClient.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
              },
              unit_amount: product.price_usd * 100, // in cents
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: `${req.headers.origin}/?status=success`,
          cancel_url: `${req.headers.origin}/?status=cancel`,
          customer_email: userEmail
        });

        return res.json({ checkoutUrl: session.url });
      }
    } catch (error: any) {
      console.error("Payment integration error:", error);
      res.status(500).json({ 
        error: "Payment initialization failed", 
        message: error.message,
        hint: "Ensure STRIPE_SECRET_KEY or MIDTRANS_SERVER_KEY are set in the environment." 
      });
    }
  });

  // Mock Purchase History Data
  app.get("/api/purchases", (req, res) => {
    const mockHistory = [
      { id: 'h1', name: 'Vibe-Coding Expert Prompt Library', niche: '#Computer', date: '2026-04-24T10:00:00Z', status: 'Active', price: '$19' },
      { id: 'h2', name: 'BPOM Notifkos Ready Pack', niche: '#Parfum', date: '2026-04-21T14:30:00Z', status: 'Active', price: '$39' },
      { id: 'h3', name: 'WealthTech Lite Dashboard', niche: '#Gold', date: '2026-04-15T09:12:00Z', status: 'Expired', price: '$12' },
      { id: 'h4', name: 'JBatik Fractal AI Generator', niche: '#HeritageAI', date: '2026-03-30T16:45:00Z', status: 'Active', price: '$99' },
    ];
    res.json({ purchases: mockHistory });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
