import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { 
  LayoutDashboard, 
  Settings, 
  Terminal, 
  Cpu, 
  Zap, 
  Activity,
  Package,
  History,
  ShieldCheck,
  CreditCard,
  Loader2,
  Sparkles,
  Image as ImageIcon,
  Search,
  LineChart,
  PackageCheck,
  Palette
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { generateNicheImage } from "@/src/services/geminiService";
import { toast } from "sonner";

interface Purchase {
  id: string;
  name: string;
  niche: string;
  date: string;
  status: string;
  price: string;
}

export function CommandCenter() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingNiche, setGeneratingNiche] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch('/api/purchases');
        const data = await response.json();
        setPurchases(data.purchases);
      } catch (error) {
        console.error("Failed to fetch purchases", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleGenerateImage = async (niche: string, desc: string) => {
    setGeneratingNiche(niche);
    try {
      const url = await generateNicheImage(niche, desc);
      if (url) {
        setGeneratedImages(prev => ({ ...prev, [niche]: url }));
        toast.success(`Generated new ${niche} branding asset!`);
      }
    } catch (error) {
      toast.error("AI Generation failed. Check API configuration.");
    } finally {
      setGeneratingNiche(null);
    }
  };

  const filteredPurchases = purchases.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 scale-os-grid">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Scale OS Command Center</h1>
            <p className="text-muted-foreground text-sm">Welcome back, Agent. Your digital ecosystem is operational.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border-white/10 text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM LIVE
             </div>
             <Button variant="outline" size="icon" className="rounded-lg glass border-white/10">
                <Settings className="w-4 h-4" />
             </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Assets', value: '12', icon: Package, color: 'text-blue-400' },
            { label: 'AI Cycles Used', value: '8.4k', icon: Zap, color: 'text-yellow-400' },
            { label: 'Network Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-400' },
            { label: 'Security Score', value: '98/100', icon: ShieldCheck, color: 'text-purple-400' }
          ].map((stat) => (
            <Card key={stat.label} className="glass border-white/5">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Purchased Assets */}
          <Card className="lg:col-span-2 glass border-white/5">
            <CardHeader className="border-b border-white/5 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Your Purchases</CardTitle>
                  <CardDescription>Access and manage your digital agency assets.</CardDescription>
                </div>
                <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input 
                      placeholder="Filter assets..." 
                      className="pl-9 glass border-white/10 rounded-xl h-10 text-xs"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {loading ? (
                  <div className="p-20 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mb-2" />
                    <span className="text-xs font-mono">Syncing with Scale OS...</span>
                  </div>
                ) : filteredPurchases.length > 0 ? (
                  filteredPurchases.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{item.name}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                            <span className="text-primary font-bold">{item.niche}</span>
                            <span>•</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="text-white/40">{item.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <Badge variant="outline" className={item.status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'}>
                           {item.status}
                         </Badge>
                         <Button size="sm" variant="outline" className="glass border-white/10 hover:bg-primary/20 hover:text-primary transition-all text-[10px] h-7">Manage</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-muted-foreground text-sm italic">
                    No active assets found in your command center.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / AI Visual Sync */}
          <div className="space-y-6">
            <Card className="glass border-white/5 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Visual Sync
                </CardTitle>
                <CardDescription>Generate dynamic branding assets per niche.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { niche: '#Computer', desc: 'Futuristic datacenter neon blue', icon: Terminal },
                  { niche: '#Gold', desc: 'Golden circuits financial luxury', icon: LineChart },
                  { niche: '#Parfum', desc: 'Floating bottle iridescent mist', icon: PackageCheck },
                  { niche: '#HeritageAI', desc: 'Glowing digital batik fractal', icon: Palette }
                ].map(item => (
                  <div key={item.niche} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{item.niche}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 text-[10px] bg-primary/10 text-primary hover:bg-primary/20"
                        onClick={() => handleGenerateImage(item.niche, item.desc)}
                        disabled={generatingNiche === item.niche}
                      >
                        {generatingNiche === item.niche ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Regenerate'}
                      </Button>
                    </div>
                    {generatedImages[item.niche] ? (
                      <img 
                        src={generatedImages[item.niche]} 
                        className="w-full h-24 object-cover rounded-lg border border-white/10"
                        alt={item.niche}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-24 bg-black/40 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/10 gap-2">
                        <item.icon className="w-6 h-6 text-white/10" />
                        <span className="text-[10px] text-white/5 uppercase font-mono tracking-tighter">Awaiting Sync</span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass border-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Financial Overview</CardTitle>
                <CardDescription>Multi-currency payout status.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Stripe (USD)</span>
                  </div>
                  <span className="text-sm font-bold">$1,240.50</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Midtrans (IDR)</span>
                  </div>
                  <span className="text-sm font-bold">Rp 4.2M</span>
                </div>
                <Button variant="outline" className="w-full glass border-white/10 hover:bg-white/5 text-xs">Manage Payouts</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
