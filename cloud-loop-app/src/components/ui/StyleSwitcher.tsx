"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Check, ChevronDown, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const STYLES = [
  { id: "default", name: "Default (Cloud Loop)", badge: "Core" },
  { id: "glassmorphism", name: "Glassmorphism", badge: "Frosted" },
  { id: "neumorphism", name: "Neumorphism", badge: "Soft UI" },
  { id: "cyberpunk", name: "Cyberpunk", badge: "Neon" },
  { id: "aurora", name: "Aurora UI", badge: "Ambient" },
  { id: "bento", name: "Bento Grid", badge: "Mosaic" },
  { id: "neo-brutalism", name: "Neo-Brutalism", badge: "Bold" },
  { id: "minimalism", name: "Minimalism", badge: "Clean" },
  { id: "vaporwave", name: "Vaporwave", badge: "Retro" },
  { id: "material", name: "Material 3", badge: "Google" },
];

export function StyleSwitcher() {
  const [currentStyle, setCurrentStyle] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ns-style") || "default";
      setCurrentStyle(saved);
      if (saved !== "default") {
        document.documentElement.setAttribute("data-style", saved);
      } else {
        document.documentElement.removeAttribute("data-style");
      }
    }
  }, []);

  const handleSelect = (id: string) => {
    setCurrentStyle(id);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("ns-style", id);
      if (id !== "default") {
        document.documentElement.setAttribute("data-style", id);
      } else {
        document.documentElement.removeAttribute("data-style");
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-border dark:border-dark-border bg-white/70 dark:bg-dark-card/70 backdrop-blur-md text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-all duration-200 shadow-sm hover:scale-105"
        title="Switch Design System Style"
        aria-label="Switch Design System Style"
      >
        <Palette size={13} className="text-secondary dark:text-primary animate-pulse" />
        <span className="hidden sm:inline capitalize font-medium">{currentStyle}</span>
        <ChevronDown size={11} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border dark:border-dark-border bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl shadow-2xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary border-b border-border/50 dark:border-dark-border/50 flex items-center justify-between">
              <span>Design Styles</span>
              <Sparkles size={11} className="text-primary" />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-0.5 py-1 scrollbar-thin">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleSelect(style.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-left transition-all duration-150",
                    currentStyle === style.id
                      ? "bg-primary/10 text-primary dark:text-primary font-semibold"
                      : "text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary dark:hover:text-dark-text-primary"
                  )}
                >
                  <span className="truncate">{style.name}</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 opacity-70">
                      {style.badge}
                    </span>
                    {currentStyle === style.id && <Check size={12} className="text-primary shrink-0" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
