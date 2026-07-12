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
        /* ── Brand palette ── */
        primary: {
          DEFAULT: "#4FD9FF",
          50:  "#f0fbff",
          100: "#d9f5ff",
          200: "#b3ecff",
          300: "#7de0ff",
          400: "#4FD9FF",
          500: "#1ac8f7",
          600: "#03a8d6",
          700: "#0486ae",
          800: "#0a6e8e",
          900: "#0e5a75",
        },
        secondary: {
          DEFAULT: "#7A5CFF",
          50:  "#f4f2ff",
          100: "#ebe7ff",
          200: "#d9d2ff",
          300: "#bdb0ff",
          400: "#9d85ff",
          500: "#7A5CFF",
          600: "#6638f7",
          700: "#5724e3",
          800: "#481ebf",
          900: "#3c1b9c",
        },
        accent: {
          DEFAULT: "#A855F7",
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#A855F7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        /* ── Light mode surfaces ── */
        background:          "#FFFFFF",
        "background-alt":    "#F8FAFC",
        "card-surface":       "#FFFFFF",
        border:               "#E2E8F0",
        "text-primary":       "#0F172A",
        "text-secondary":     "#64748B",

        /* ── Dark mode surfaces ── */
        "dark-background":     "#0B1126",
        "dark-background-alt": "#111936",
        "dark-card":           "#162143",
        "dark-border":         "#263460",
        "dark-text-primary":   "#E2E8F0",
        "dark-text-secondary": "#94A3B8",
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
