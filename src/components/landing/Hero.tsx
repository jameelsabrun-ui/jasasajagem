import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 scale-os-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-primary mb-6">
          <Cpu className="w-3 h-3" />
          <span>POWERED BY SCALE OS V2.0</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gradient mb-6">
          Scale Your Vibe.<br />
          <span className="text-primary italic">Otonom & Eksponensial.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          jasasaja mengorkestrasi ekosistem produk digital multi-niche dengan kecerdasan buatan otonom. Dari automasi IT hingga warisan budaya fractal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full px-8 gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            Mulai Eksplorasi <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 gap-2 glass border-white/10 hover:bg-white/5">
            <Sparkles className="w-4 h-4" /> Lihat Demo AI
          </Button>
        </div>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 md:left-20 hidden lg:block"
      >
        <div className="glass p-4 rounded-2xl border-white/10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">System Status</div>
            <div className="text-[10px] text-primary">All agents operational</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
