// src/components/toc.tsx
"use client";

import type React from "react";
import type { Toc } from "@/@types/md";
import { motion } from "framer-motion";
import { useState } from "react";
import { List, ChevronDown, BookOpen } from "lucide-react";

interface TocComponentProps {
  toc: Toc[];
}

const TableOfContents: React.FC<TocComponentProps> = ({ toc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Função para scroll suave
  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (!element) return;

    // Offset para navbar + progress bar
    const offset = 120;
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const scrollTo = elementTop - offset;

    window.scrollTo({
      top: Math.max(0, scrollTo),
      behavior: "smooth",
    });
  };

  if (!toc || toc.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-card/50 backdrop-blur-sm border rounded-lg shadow-sm overflow-hidden"
    >
      {/* Header - Always visible */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Table of Contents
            </h3>
            <p className="text-xs text-muted-foreground">
              {toc.length} sections • {Math.ceil(toc.length * 2.5)} min read
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* TOC Content - Collapsible */}
      <motion.div
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4">
          <div className="border-t pt-4">
            <nav>
              <ul className="space-y-1">
                {toc.map((item, index) => {
                  const paddingLeft = (item.level - 1) * 16;

                  return (
                    <motion.li
                      key={item.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.slug)}
                        className="w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 hover:bg-muted/50 hover:text-foreground text-muted-foreground group"
                        style={{ paddingLeft: `${12 + paddingLeft}px` }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Level indicator */}
                          <div className="flex items-center mt-1">
                            <div
                              className={`
                                w-1.5 h-1.5 rounded-full transition-colors duration-200 group-hover:bg-primary
                                ${
                                  item.level === 1
                                    ? "bg-foreground/50"
                                    : item.level === 2
                                    ? "bg-foreground/40"
                                    : "bg-foreground/30"
                                }
                              `}
                            />
                            {item.level === 1 && (
                              <div className="w-4 h-px bg-foreground/20 ml-1" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <span
                              className={`
                                leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors duration-200
                                ${item.level === 1 ? "font-medium" : ""}
                              `}
                            >
                              {item.title}
                            </span>
                            {item.level === 1 && (
                              <div className="text-xs text-muted-foreground/70 mt-1">
                                Section {index + 1}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats - Always visible when collapsed */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 pb-3"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Click to see all sections</span>
            <div className="flex items-center gap-2">
              <List className="w-3 h-3" />
              <span>
                {toc.filter((item) => item.level <= 2).length} main topics
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TableOfContents;
