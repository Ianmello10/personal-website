"use client";

import type React from "react";
import type { Toc } from "@/@types/md";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface ProgressBarProps {
  toc: Toc[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ toc }) => {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState<Toc | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);

      // Find active section
      const headings = toc
        .map((item) => document.getElementById(item.slug))
        .filter(Boolean);
      const offset = 120; // navbar + progress bar offset

      let currentActiveId = "";
      let activeSection: Toc | null = null;

      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentActiveId = heading.id;
            activeSection =
              toc.find((item) => item.slug === heading.id) || null;
            break;
          }
        }
      }

      // Fallback to closest section
      if (!currentActiveId) {
        for (const heading of headings) {
          if (heading) {
            const rect = heading.getBoundingClientRect();
            if (rect.top > offset) {
              break;
            }
            currentActiveId = heading.id;
            activeSection =
              toc.find((item) => item.slug === heading.id) || null;
          }
        }
      }

      setActiveId(currentActiveId);
      setCurrentSection(activeSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (!element) return;

    const offset = 120;
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const scrollTo = elementTop - offset;

    window.scrollTo({
      top: Math.max(0, scrollTo),
      behavior: "smooth",
    });
  };

  if (!toc || toc.length === 0) return null;

  const currentIndex = currentSection
    ? toc.findIndex((item) => item.slug === currentSection.slug)
    : -1;
  const sectionProgress =
    currentIndex >= 0 ? ((currentIndex + 1) / toc.length) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md ">
      {/* Progress Bar */}
      <div className="relative h-[2px] bg-muted">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/80"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Section Progress Indicator */}
        <motion.div
          className="absolute top-0 h-full w-1 bg-primary-foreground shadow-sm"
          style={{ left: `${sectionProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Current Section Info */}
      <div className="px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {currentSection ? (
              <>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Section {currentIndex + 1} of {toc.length}
                  </span>
                  <ChevronRight className="w-3 h-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {currentSection.title}
                  </h4>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Reading progress: {Math.round(scrollProgress)}%
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {toc.slice(0, 5).map((item, index) => (
              <button
                key={item.slug}
                onClick={() => scrollToSection(item.slug)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200 hover:scale-125
                  ${
                    item.slug === activeId
                      ? "bg-primary"
                      : index <= currentIndex
                      ? "bg-primary/50"
                      : "bg-muted-foreground/30"
                  }
                `}
                title={item.title}
              />
            ))}
            {toc.length > 5 && (
              <div className="text-xs text-muted-foreground ml-2">
                +{toc.length - 5}
              </div>
            )}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden text-xs text-muted-foreground">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
