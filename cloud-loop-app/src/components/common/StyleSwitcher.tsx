"use client";

import React, { useState, useEffect } from "react";
import { Palette, Check, Sparkles, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export interface DesignStyleOption {
  id: string;
  name: string;
  category: string;
  badge: string;
  accent: string;
}

export const DESIGN_STYLES: DesignStyleOption[] = [
  { id: "default", name: "Default Crimson", category: "Core", badge: "Core", accent: "#f25c66" },
  { id: "glassmorphism", name: "Glassmorphism", category: "Modern", badge: "Frosted", accent: "#38bdf8" },
  { id: "cyberpunk", name: "Cyberpunk", category: "Retro / Tech", badge: "Neon", accent: "#00ffc8" },
  { id: "aurora", name: "Aurora UI", category: "Modern", badge: "Cosmic", accent: "#8b5cf6" },
  { id: "neumorphism", name: "Neumorphism", category: "Tactile", badge: "Soft", accent: "#6366f1" },
  { id: "spatial", name: "Spatial UI", category: "Next-Gen", badge: "visionOS", accent: "#60a5fa" },
  { id: "bento", name: "Bento Grid", category: "Editorial", badge: "Tiles", accent: "#f25c66" },
  { id: "vaporwave", name: "Vaporwave", category: "Retro / Tech", badge: "80s Glow", accent: "#ff6ec7" },
  { id: "neo-brutalism", name: "Neo-Brutalism", category: "Raw", badge: "High Contrast", accent: "#ff0055" },
  { id: "minimalism", name: "Minimalism", category: "Clean", badge: "Swiss", accent: "#a1a1aa" },
  { id: "dark-native", name: "Dark Native", category: "Core", badge: "OLED Pure", accent: "#f25c66" },
  { id: "material", name: "Material Design 3", category: "System", badge: "M3 Tonal", accent: "#e4555f" },
  { id: "claymorphism", name: "Claymorphism", category: "Tactile", badge: "3D Clay", accent: "#ef4444" },
  { id: "skeuomorphism", name: "Skeuomorphism", category: "Tactile", badge: "Physical", accent: "#d4891a" },
  { id: "monochromatic", name: "Monochromatic", category: "Brand", badge: "Single Hue", accent: "#ff6b75" },
  { id: "color-blocking", name: "Color Blocking", category: "Artistic", badge: "Mondrian", accent: "#3a86ff" },
  { id: "maximalism", name: "Maximalism", category: "Artistic", badge: "Layered", accent: "#ff007f" },
  { id: "pixel-art", name: "Pixel Art", category: "Retro / Tech", badge: "8-Bit", accent: "#e53935" },
  { id: "art-deco", name: "Art Deco", category: "Luxury", badge: "1920s Gold", accent: "#c9a84c" },
  { id: "card-based", name: "Card-Based UI", category: "Editorial", badge: "Elevated", accent: "#3b82f6" },
  { id: "typography", name: "Typography", category: "Clean", badge: "Editorial Type", accent: "#ffffff" },
  { id: "asymmetric", name: "Asymmetric", category: "Editorial", badge: "Imbalance", accent: "#f43f5e" },
  { id: "illustrative", name: "Illustrative", category: "Artistic", badge: "Hand-Drawn", accent: "#e85d04" },
  { id: "parallax", name: "Parallax UI", category: "Next-Gen", badge: "Depth Layers", accent: "#818cf8" },
  { id: "flat", name: "Flat Design", category: "Clean", badge: "Zero Shadow", accent: "#e63946" },
  { id: "vui", name: "Voice / VUI", category: "Modern", badge: "Audio Waves", accent: "#34d399" },
];

export function StyleSwitcher() {
  const { designStyle, setDesignStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStyles = DESIGN_STYLES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.badge.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="25 Visual Design Modes (NexaSphere Design System)"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-border dark:border-dark-border bg-white/80 dark:bg-dark-card/80 backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/10 transition-all shadow-sm group"
      >
        <Palette size={14} className="text-primary transition-transform group-hover:rotate-45" />
        <span className="capitalize font-mono hidden sm:inline">{designStyle || "Style"}</span>
        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">25</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 max-h-[460px] overflow-hidden rounded-2xl bg-white dark:bg-[#0c1017] border border-border dark:border-white/10 shadow-2xl z-50 flex flex-col backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-3 border-b border-border dark:border-white/10 flex items-center justify-between bg-black/5 dark:bg-white/5">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-text-primary dark:text-white">
                  25 Visual Design Modes
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-primary dark:hover:text-white p-1 rounded-md"
              >
                <X size={14} />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-2 border-b border-border dark:border-white/5">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search styles (e.g. glass, neon, retro)..."
                className="w-full text-xs px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary focus:outline-none text-text-primary dark:text-white placeholder:text-text-muted"
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto p-2 space-y-1 max-h-[340px] scrollbar-thin">
              {filteredStyles.map((style) => {
                const isActive = (designStyle || "default") === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => {
                      setDesignStyle(style.id as any);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-primary text-white font-bold shadow-md shadow-primary/20"
                        : "hover:bg-black/5 dark:hover:bg-white/5 text-text-primary dark:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-white/20 shadow-sm"
                        style={{ backgroundColor: style.accent }}
                      />
                      <div>
                        <div className="font-semibold leading-tight">{style.name}</div>
                        <div className={`text-[10px] ${isActive ? "text-white/80" : "text-text-muted"}`}>
                          {style.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-black/5 dark:bg-white/10 text-text-secondary dark:text-gray-400"
                        }`}
                      >
                        {style.badge}
                      </span>
                      {isActive && <Check size={13} className="text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
