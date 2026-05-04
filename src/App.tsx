import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/src/components/landing/Hero";
import { NicheGateway } from "@/src/components/landing/NicheCards";
import { ValueLadder } from "@/src/components/landing/ValueLadder";
import { CommandCenter } from "@/src/components/dashboard/CommandCenter";
import { NichePage } from "@/src/components/niche/NichePage";
import { ThemeProvider } from "@/src/components/ThemeProvider";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { Button } from "@/src/components/ui/button";
import { Cpu, LayoutDashboard, Globe, Shield, Menu, X } from "lucide-react";
import { Toaster } from "@/src/components/ui/sonner";
import { toast } from "sonner";
import { Niche } from "@/src/types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'niche'>('landing');
  const [selectedNiche, setSelectedNiche] = useState<Niche | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateToNiche = (nicheId: Niche) => {
    setSelectedNiche(nicheId);
    setCurrentPage('niche');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setSelectedNiche(null);
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass rounded-2xl border-white/5 py-3 px-6 flex items-center justify-between shadow-lg shadow-black/50">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={navigateToLanding}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">
              J
            </div>
            <span className="font-bold tracking-tighter text-xl">jasasaja</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Products', 'Company', 'Scale OS'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest text-[10px]">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant={currentPage === 'dashboard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedNiche(null);
                setCurrentPage(currentPage === 'dashboard' ? 'landing' : 'dashboard');
              }}
              className="rounded-xl border-white/10 glass hidden sm:flex gap-2"
            >
              {currentPage === 'dashboard' ? (
                <> <Globe className="w-4 h-4" /> Go to Web </>
              ) : (
                <> <LayoutDashboard className="w-4 h-4" /> Command Center </>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <NicheGateway onSelect={navigateToNiche} />
              <ValueLadder />
              
              {/* Footer */}
              <footer className="py-20 px-4 border-t border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-[10px] font-bold">J</div>
                      <span className="font-bold tracking-tighter">jasasaja</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Orkestrasi ekosistem produk digital multi-niche berbasis AI dan arsitektur Vibe Coding.
                    </p>
                  </div>
                  {[
                    { title: 'Niches', links: ['#Computer', '#Gold', '#Parfum', '#HeritageAI'] },
                    { title: 'Platform', links: ['Scale OS', 'Content Factory', 'Payment Hub', 'Security'] },
                    { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'GDPR Compliance', 'UU PDP'] }
                  ].map(col => (
                    <div key={col.title}>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-6 opacity-30">{col.title}</h4>
                      <ul className="space-y-4">
                        {col.links.map(link => (
                          <li key={link}>
                            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-muted-foreground font-mono">
                    © 2026 JASASAJA.ALL_SYSTEMS_OPERATIONAL
                  </div>
                  <div className="flex items-center gap-6">
                    <Shield className="w-4 h-4 text-emerald-500/40" />
                    <div className="text-[10px] text-muted-foreground font-mono">ENCRYPTED AT REST</div>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : currentPage === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <CommandCenter />
            </motion.div>
          ) : (
            selectedNiche && (
              <motion.div
                key={`niche-${selectedNiche}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <NichePage nicheId={selectedNiche} onBack={navigateToLanding} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>

      <Toaster position="bottom-right" richColors />
      </div>
    </ThemeProvider>
  );
}
