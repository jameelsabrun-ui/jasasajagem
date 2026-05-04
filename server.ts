import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "jasasaja API is running" });
  });

  // Placeholder for AI Content Factory logic
  app.post("/api/ai/content-factory", async (req, res) => {
    const { topic, platform } = req.body;
    // In a real scenario, this would connect to Perplexity/GPT-4o
    res.json({
      status: "processing",
      topic,
      platform,
      message: "Autonomous content generation initiated via jasasaja Scale OS."
    });
  });

  // Placeholder for Payments (Midtrans/Stripe)
  app.post("/api/payments/checkout", async (req, res) => {
    const { productId, currency } = req.body;
    res.json({
      checkoutUrl: "#",
      message: `Checkout initiated for ${productId} in ${currency}.`
    });
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
