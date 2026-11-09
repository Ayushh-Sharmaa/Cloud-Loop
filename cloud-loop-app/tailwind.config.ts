import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand palette — Midnight/Lime System ── */
        "brand-black":  "#0B0B0C",
        "brand-white":  "#FFFFFF",
        "brand-lime":   "#C6F432",
        "brand-lime-dark": "#a8d620",

        /* Legacy aliases → all point to lime */
        primary: {
          DEFAULT: "#C6F432",
          50:  "#f9ffe0",
          100: "#f1ffb3",
          200: "#e4ff66",
          300: "#d4f832",
          400: "#C6F432",
          500: "#a8d620",
          600: "#84aa10",
          700: "#628010",
          800: "#4a6010",
          900: "#334010",
        },
        secondary: {
          DEFAULT: "#C6F432",
          50:  "#f9ffe0",
          100: "#f1ffb3",
          200: "#e4ff66",
          300: "#d4f832",
          400: "#C6F432",
          500: "#a8d620",
          600: "#84aa10",
          700: "#628010",
          800: "#4a6010",
          900: "#334010",
        },
        accent: {
          DEFAULT: "#C6F432",
          50:  "#f9ffe0",
          100: "#f1ffb3",
          200: "#e4ff66",
          300: "#d4f832",
          400: "#C6F432",
          500: "#a8d620",
          600: "#84aa10",
          700: "#628010",
          800: "#4a6010",
          900: "#334010",
        },

        /* ── Light mode surfaces ── */
        background:          "#F7F7F2",
        "background-alt":    "#FFFFFF",
        "card-surface":       "#FFFFFF",
        border:               "#E5E5DC",
        "text-primary":       "#0B0B0C",
        "text-secondary":     "#4A4A45",

        /* ── Dark mode — Cloud Loop logo palette ── */
        /* Deep purple-navy starry theme from the logo background */
        "dark-background":     "#0D0E1A",   /* deepest navy-purple */
        "dark-background-alt": "#111327",   /* slightly lighter purple */
        "dark-card":           "#13152A",   /* card surface — visible purple */
        "dark-border":         "#252848",   /* border — muted purple */
        "dark-text-primary":   "#F0F4FF",   /* near-white — very visible */
        "dark-text-secondary": "#A5B0D9",   /* muted lavender — readable */
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        card:    "16px",
        "card-lg": "20px",
        pill:    "9999px",
      },

      boxShadow: {
        card:           "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "card-hover":   "0 8px 30px -4px rgba(0,0,0,0.10), 0 4px 12px -4px rgba(0,0,0,0.06)",
        "glow-primary": "0 0 30px rgba(79,217,255,0.25)",
        "glow-secondary":"0 0 30px rgba(122,92,255,0.25)",
        glass:          "0 8px 32px 0 rgba(0,0,0,0.08)",
      },

      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #4FD9FF 0%, #7A5CFF 50%, #A855F7 100%)",
        "gradient-hero":  "radial-gradient(ellipse at top left, rgba(79,217,255,0.14) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(122,92,255,0.14) 0%, transparent 60%)",
        "gradient-card":  "linear-gradient(135deg, rgba(79,217,255,0.06) 0%, rgba(122,92,255,0.06) 100%)",
        "gradient-btn":   "linear-gradient(135deg, #4FD9FF 0%, #7A5CFF 100%)",
      },

      animation: {
        float:          "float 6s ease-in-out infinite",
        "float-delayed":"float 6s ease-in-out 2s infinite",
        "pulse-slow":   "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in":      "fadeIn 0.5s ease-out",
        "slide-up":     "slideUp 0.5s ease-out",
        "slide-down":   "slideDown 0.3s ease-out",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },

      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};

export default config;
