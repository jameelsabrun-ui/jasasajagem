import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Cpu, Coins, Droplets, Landmark, ArrowUpRight } from "lucide-react";
import { Niche } from "@/src/types";

const NICHES = [
  {
    id: 'computer' as Niche,
    title: '#Computer',
    description: 'IT Security, PDP Compliance, and Vibe-Coding libraries.',
    icon: Cpu,
    color: 'text-blue-400',
    tags: ['CyberSec', 'Code', 'UU PDP']
  },
  {
    id: 'gold' as Niche,
    title: '#Gold',
    description: 'Digital gold tracking and macro-economic analysis tools.',
    icon: Coins,
    color: 'text-yellow-400',
    tags: ['WealthTech', 'Assets', 'Macro']
  },
  {
    id: 'parfum' as Niche,
    title: '#Parfum',
    description: 'BPOM automation and AI-driven olfactory storytelling.',
    icon: Droplets,
    color: 'text-pink-400',
    tags: ['BPOM', 'Halal', 'Olfactory']
  },
  {
    id: 'heritage' as Niche,
    title: '#HeritageAI',
    description: 'Sustainable Batik and Fractal AI Motif Generators.',
    icon: Landmark,
    color: 'text-emerald-400',
    tags: ['Batik', 'Fractal', 'ESG']
  }
];

export function NicheGateway() {
  return (
    <section className="py-24 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Multi-Niche Gateway</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Solusi digital terspesialisasi yang dikelola oleh orkestrasi AI tingkat lanjut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NICHES.map((niche, index) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass h-full border-white/5 hover:border-primary/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${niche.color}`}>
                    <niche.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{niche.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed mt-2 text-sm">
                    {niche.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {niche.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-[10px] uppercase tracking-wider font-mono hover:bg-white/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
