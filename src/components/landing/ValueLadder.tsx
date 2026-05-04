import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { PRODUCTS } from "@/src/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { 
  CheckCircle2, 
  ShoppingCart, 
  Loader2, 
  Globe, 
  ChevronDown,
  CircleDollarSign
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export function ValueLadder() {
  const [currency, setCurrency] = useState<'IDR' | 'USD'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jasasaja_currency');
      if (saved === 'IDR' || saved === 'USD') return saved;
    }
    return 'IDR';
  });
  const [hasExplicitlySelected, setHasExplicitlySelected] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('jasasaja_currency');
    }
    return false;
  });
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  useEffect(() => {
    if (hasExplicitlySelected) {
      localStorage.setItem('jasasaja_currency', currency);
    }
  }, [currency, hasExplicitlySelected]);

  const selectCurrency = (c: 'IDR' | 'USD') => {
    setCurrency(c);
    setHasExplicitlySelected(true);
  };

  const handleCheckout = async (productId: string) => {
    setLoadingProductId(productId);
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          currency,
          userEmail: 'demo@jasasaja.ai' // Mock email for demo
        })
      });
      
      const data = await response.json();
      
      if (data.checkoutUrl) {
        toast.success(`Redirecting to ${currency === 'IDR' ? 'Midtrans' : 'Stripe'}...`);
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.message || 'Checkout failed');
      }
    } catch (error: any) {
      toast.error(error.message || "Payment integration error. Check server logs and ENV keys.");
      console.error(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const tiers = [
    { id: 'lead_magnet', name: 'Free Resources', description: 'Immediate value to get you started.' },
    { id: 'tripwire', name: 'Entry Products', description: 'Low-cost, high-impact digital tools.' },
    { id: 'core', name: 'Core Solutions', description: 'Our primary specialized automation kits.' },
    { id: 'premium', name: 'Premium Service', description: 'Enterprise-grade bespoke AI architecture.' }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Value Ladder</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Dari aset digital terjangkau hingga sistem pendongkrak bisnis berskala global.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "group glass border-primary/30 hover:border-primary px-6 py-6 rounded-2xl flex items-center gap-3 bg-primary/5 transition-all scale-105 shadow-xl shadow-primary/10 cursor-pointer outline-none",
                )}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <CircleDollarSign className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-mono text-primary font-bold tracking-widest leading-none mb-1">
                    Currency Selection
                  </div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    {currency} {currency === 'USD' ? '(PPP Active)' : ''}
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-white/10 w-56 p-2 rounded-xl">
                <DropdownMenuItem 
                  onClick={() => selectCurrency('IDR')}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${currency === 'IDR' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'}`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold">IDR (Rupiah)</span>
                    <span className="text-[10px] opacity-60 uppercase font-mono">Lokal Indonesia</span>
                  </div>
                  {currency === 'IDR' && <CheckCircle2 className="w-4 h-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => selectCurrency('USD')}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer mt-1 ${currency === 'USD' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'}`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold">USD (Dollar)</span>
                    <span className="text-[10px] opacity-60 uppercase font-mono">PPP Adjusted</span>
                  </div>
                  {currency === 'USD' && <CheckCircle2 className="w-4 h-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* PPP Explanation */}
        <div className="mb-12 glass p-6 rounded-2xl border-primary/20 bg-primary/5 flex flex-col md:flex-row items-start gap-6">
          <div className="p-3 rounded-xl bg-primary/20 text-primary shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Global Pricing Equity (PPP)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kami percaya pada aksesibilitas global. Fitur <strong>Purchasing Power Parity (PPP)</strong> secara otomatis menyesuaikan harga produk digital kami berdasarkan kekuatan ekonomi di wilayah Anda. 
              Ini memastikan bahwa klien di pasar berkembang mendapatkan nilai yang adil dan proposional, memungkinkan adopsi teknologi tanpa hambatan biaya yang tidak merata secara global.
            </p>
          </div>
        </div>

        <div className="relative">
          {!hasExplicitlySelected && (
            <div className="absolute inset-0 z-20 glass backdrop-blur-md rounded-3xl border-primary/20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="p-4 rounded-2xl bg-primary/20 text-primary mb-6">
                <Globe className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Pilih Mata Uang Anda</h3>
              <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
                Silakan pilih mata uang preferensi Anda untuk melihat penyesuaian harga PPP yang adil untuk wilayah Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                 <Button 
                    onClick={() => selectCurrency('IDR')} 
                    className="flex-1 py-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl"
                  >
                    IDR (Rupiah)
                 </Button>
                 <Button 
                    onClick={() => selectCurrency('USD')} 
                    variant="outline" 
                    className="flex-1 py-6 glass border-white/10 hover:bg-white/5 font-bold rounded-xl"
                  >
                    USD (US Dollar)
                 </Button>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start transition-all duration-700 ${!hasExplicitlySelected ? 'blur-[8px] pointer-events-none opacity-50' : 'blur-0 opacity-100'}`}>
            {tiers.map((tier) => {
            const tierProducts = PRODUCTS.filter(p => p.tier === tier.id);
            return (
              <Card key={tier.id} className={`glass border-white/5 h-full flex flex-col ${tier.id === 'core' ? 'ring-2 ring-primary/50' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tier.name}
                    {tier.id === 'core' && <Badge className="bg-primary/20 text-primary border-primary/20 text-[10px]">POPULAR</Badge>}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    {tierProducts.length > 0 ? (
                      tierProducts.map(product => (
                        <div key={product.id} className="group/item relative overflow-hidden rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                          {product.image && (
                            <div className="h-32 overflow-hidden relative">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover opacity-60 group-hover/item:scale-110 group-hover/item:opacity-80 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>
                          )}
                          <div className="p-3 relative">
                            <div className="text-sm font-bold truncate">{product.name}</div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-xs text-primary font-mono">
                                {currency === 'IDR' 
                                  ? `Rp ${product.price.idr.toLocaleString('id-ID')}` 
                                  : `$${product.price.usd}`}
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 w-7 p-0 rounded-full hover:bg-primary/20 text-primary"
                                disabled={loadingProductId === product.id}
                                onClick={() => handleCheckout(product.id)}
                              >
                                {loadingProductId === product.id 
                                  ? <Loader2 className="w-3 h-3 animate-spin" /> 
                                  : <ShoppingCart className="w-3 h-3" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                        <div className="text-sm italic text-muted-foreground p-4 bg-white/5 rounded-lg border border-dashed border-white/10 text-center">
                          Coming Soon: Automated Assets
                        </div>
                    )}
                  </div>

                  <ul className="mt-6 space-y-2">
                    {['Akses Instan', 'Lisensi Komersial', 'Lifetime Updates'].map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-primary" /> {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest py-6"
                    onClick={() => {
                      const firstProduct = tierProducts[0];
                      if (firstProduct) handleCheckout(firstProduct.id);
                      else toast.info("Check back soon for available products in this tier.");
                    }}
                  >
                    Mulai Sekarang
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-muted-foreground font-mono bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Globe className="w-3 h-3" /> 
            Purchasing Power Parity (PPP) active. Pricing adjusted for regional economic fairness.
          </div>
        </div>
      </div>
    </section>
  );
}
