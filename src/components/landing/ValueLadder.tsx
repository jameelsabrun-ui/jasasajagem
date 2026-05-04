import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { PRODUCTS } from "@/src/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { CheckCircle2, ShoppingCart } from "lucide-react";

export function ValueLadder() {
  const tiers = [
    { id: 'lead_magnet', name: 'Free Resources', description: 'Immediate value to get you started.' },
    { id: 'tripwire', name: 'Entry Products', description: 'Low-cost, high-impact digital tools.' },
    { id: 'core', name: 'Core Solutions', description: 'Our primary specialized automation kits.' },
    { id: 'premium', name: 'Premium Service', description: 'Enterprise-grade bespoke AI architecture.' }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Value Ladder</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dari aset digital terjangkau hingga sistem pendongkrak bisnis berskala global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
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
                        <div key={product.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                          <div className="text-sm font-bold truncate">{product.name}</div>
                          <div className="text-xs text-primary mt-1">IDR {product.price.idr.toLocaleString('id-ID')}</div>
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
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest py-6">
                    Lihat Katalog
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
