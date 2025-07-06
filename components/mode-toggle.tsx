"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [rotating, setRotating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 300); // reseta rotação após animação
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors duration-200 relative overflow-hidden"
      >
        <motion.div
          className="relative"
          animate={rotating ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-80 dark:scale-0" />
          <Moon className="absolute inset-0 h-4 w-4 rotate-0 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
