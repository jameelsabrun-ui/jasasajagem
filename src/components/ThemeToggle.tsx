import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-xl border-white/10 glass w-10 h-10">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl border-white/10 glass w-10 h-10 transition-all hover:scale-110 active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in zoom-in spin-in-180 duration-500" />
      ) : (
        <Moon className="w-4 h-4 text-blue-400 animate-in zoom-in spin-in-180 duration-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
