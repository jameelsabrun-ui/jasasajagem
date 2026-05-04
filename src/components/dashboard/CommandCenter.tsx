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
  CreditCard
} from "lucide-react";

export function CommandCenter() {
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
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Your Purchases</span>
                <Button variant="link" className="text-xs text-primary">View All History</Button>
              </CardTitle>
              <CardDescription>Access and manage your digital agency assets.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[
                  { name: 'Vibe-Coding Expert Prompt Library', niche: '#Computer', date: 'Oct 24, 2026', status: 'Active' },
                  { name: 'BPOM Notifkos Ready Pack', niche: '#Parfum', date: 'Oct 21, 2026', status: 'Active' },
                  { name: 'WealthTech Lite Dashboard', niche: '#Gold', date: 'Oct 15, 2026', status: 'Expired' },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{item.name}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">{item.niche}</span>
                          <span>•</span>
                          <span>Purchased on {item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Badge variant="outline" className={item.status === 'Active' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'}>
                         {item.status}
                       </Badge>
                       <Button size="sm" variant="outline" className="glass border-white/10 hover:bg-primary/20 hover:text-primary transition-all">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Content Factory Placeholder */}
          <div className="space-y-6">
            <Card className="glass border-white/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Cpu className="w-20 h-20" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Content Factory</CardTitle>
                <CardDescription>Autonomous content generation pipeline.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                  <Zap className="w-4 h-4 mr-2" /> Generate Now
                </Button>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase mb-2">Active Worker</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono">OpenClaw v1.4</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">IDLE</span>
                  </div>
                </div>
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
