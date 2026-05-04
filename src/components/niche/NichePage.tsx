import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { 
  ArrowLeft, 
  Cpu, 
  Zap, 
  Shield, 
  Globe, 
  Sparkles, 
  Terminal, 
  LineChart, 
  PackageCheck, 
  Palette,
  ChevronRight
} from "lucide-react";
import { Niche } from "@/src/types";

interface NichePageProps {
  nicheId: Niche;
  onBack: () => void;
}

const NICHE_DETAILS: Record<Niche, any> = {
  computer: {
    title: "Scale-as-a-Service",
    subtitle: "High-Performance GPU Infrastructure",
    description: "Massive computational throughput for the next generation of AI training and deployment.",
    icon: Cpu,
    color: "text-blue-400",
    features: [
      { title: "Bare-Metal Nodes", desc: "H100/A100 clusters with dedicated bandwidth." },
      { title: "Edge Deployment", desc: "Global CDN for low-latency inference." },
      { title: "Autoscaling", desc: "Instant resource allocation based on demand." }
    ],
    stats: [
      { label: "Uptime", value: "99.999%" },
      { label: "Latency", value: "<10ms" },
      { label: "Capacity", value: "250+ PFLOPS" }
    ]
  },
  gold: {
    title: "Algorithmic Finance",
    subtitle: "AI-Driven Quantitative Systems",
    description: "Digital financial ecosystems managed by autonomous agents and neural network optimization.",
    icon: LineChart,
    color: "text-amber-400",
    features: [
      { title: "Risk Arbitrage", desc: "Real-time liquidity scan across global markets." },
      { title: "Smart Vaults", desc: "Yield optimization through predictive modeling." },
      { title: "ZK-Proofs", desc: "Privacy-first transactional integrity." }
    ],
    stats: [
      { label: "AUM", value: "$4.2B+" },
      { label: "Efficiency", value: "85% ROI/pa" },
      { label: "Latency", value: "Sub-ms" }
    ]
  },
  parfum: {
    title: "Molecular Aesthetics",
    subtitle: "AI-Synthesized Personal Branding",
    description: "Digital identity refinement through molecular-level aesthetic synthesis and olfactory branding.",
    icon: PackageCheck,
    color: "text-emerald-400",
    features: [
      { title: "Visual DNA", desc: "Unique brand palettes generated from customer data." },
      { title: "Sensory UX", desc: "Multi-modal experiences for luxury platforms." },
      { title: "Digital Rareness", desc: "Algorithmic scarcity for digital collectibles." }
    ],
    stats: [
      { label: "Uniqueness", value: "100% Core" },
      { label: "Retention", value: "92% Growth" },
      { label: "Synthesis", value: "Instant" }
    ]
  },
  heritage: {
    title: "Digital Preservation",
    subtitle: "Cultural Heritage Fractal AI",
    description: "Preserving human culture through digital fractals and immortal blockchain storage.",
    icon: Palette,
    color: "text-purple-400",
    features: [
      { title: "Fractal Mapping", desc: "High-fidelity 3D cultural asset scanning." },
      { title: "Immortal Ledger", desc: "Data redundancy across decentralized nodes." },
      { title: "Legacy AI", desc: "Interactive intelligence trained on historical data." }
    ],
    stats: [
      { label: "Archives", value: "12M+ Units" },
      { label: "Durability", value: "∞ (Stored)" },
      { label: "Resolution", value: "8K LiDAR" }
    ]
  }
};

export function NichePage({ nicheId, onBack }: NichePageProps) {
  const content = NICHE_DETAILS[nicheId];
  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 scale-os-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="ghost" 
            className="group flex items-center gap-2 text-muted-foreground hover:text-white"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Gateway
          </Button>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Badge variant="outline" className="px-4 py-1 text-xs font-mono border-primary/30 text-primary">
               NICHE_GATEWAY_NODE_{nicheId.toUpperCase()}
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              {content.title} <span className={content.color}>#{nicheId}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-xl px-8 h-12 shadow-xl shadow-primary/20">
                Register Interest
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 glass">
                Technical Whitepaper
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative glass border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/40 z-10" />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:scale-110 transition-transform duration-700`}>
                <Icon className="w-64 h-64" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-primary animate-pulse blur-2xl opacity-30" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4 z-20">
                {content.stats.map((stat: any) => (
                  <div key={stat.label} className="glass p-3 rounded-xl border-white/5 backdrop-blur-md">
                    <div className="text-[10px] text-muted-foreground uppercase font-mono">{stat.label}</div>
                    <div className="text-sm font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.features.map((feature: any, idx: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Card className="glass border-white/5 hover:border-primary/30 transition-all h-full group">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-3xl border-white/5 text-center space-y-6 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-right from-transparent via-primary to-transparent" />
          <h2 className="text-3xl font-bold">Secure your place in the future of {nicheId}.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our autonomous scaling systems are currently onboarding limited partners for initial network validation.
          </p>
          <Button size="lg" className="rounded-xl px-12 group">
            Apply for Access
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
