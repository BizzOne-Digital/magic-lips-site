import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lavender:    "#A78BFA",  // soft lavender
          "lavender-light": "#DDD6FE",
          "lavender-dark":  "#8A7AB8",
          sky:         "#BAE6FD",  // sky blue
          "sky-light": "#F0F9FF",
          "sky-mid":   "#7DD3FC",
          "sky-dark":  "#0EA5E9",
          blush:       "#FBCFE8",  // soft pink
          gold:        "#F59E0B",
          "gold-light":"#FDE68A",
          cream:       "#FAFAF9",
          white:       "#FFFFFF",
          "deep":      "#1E1035",  // very dark navy for backgrounds
          "deep-mid":  "#2D1F5E",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body:    ["var(--font-inter)",    "sans-serif"],
        script:  ["var(--font-dancing)",  "cursive"],
      },
      backgroundImage: {
        "hero-gradient":   "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 40%, #fdf2f8 100%)",
        "dark-gradient":   "linear-gradient(135deg, #1E1035 0%, #2D1F5E 50%, #1a1a3e 100%)",
        "card-gradient":   "linear-gradient(135deg, rgba(196,181,253,0.15) 0%, rgba(186,230,253,0.15) 100%)",
        "gold-gradient":   "linear-gradient(135deg, #F59E0B 0%, #FDE68A 50%, #D97706 100%)",
        "lavender-gradient":"linear-gradient(135deg, #A78BFA 0%, #9D8EC4 100%)",
        "sky-gradient":    "linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)",
      },
      animation: {
        float:            "float 6s ease-in-out infinite",
        "float-delayed":  "float 6s ease-in-out infinite 2s",
        sparkle:          "sparkle 2.5s ease-in-out infinite",
        shimmer:          "shimmer 3s ease-in-out infinite",
        "pulse-soft":     "pulseSoft 3s ease-in-out infinite",
        marquee:          "marquee 25s linear infinite",
        "slide-up":       "slideUp 0.6s ease-out",
        "fade-in":        "fadeIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%":      { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideUp: {
          "0%":   { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "lavender-sm": "0 4px 20px rgba(196,181,253,0.3)",
        "lavender-md": "0 8px 40px rgba(196,181,253,0.4)",
        "lavender-lg": "0 16px 60px rgba(196,181,253,0.5)",
        "sky-sm":      "0 4px 20px rgba(125,211,252,0.3)",
        "sky-md":      "0 8px 40px rgba(125,211,252,0.4)",
        "card":        "0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(196,181,253,0.2)",
        "card-hover":  "0 8px 40px rgba(196,181,253,0.25), 0 0 0 1px rgba(196,181,253,0.4)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};

export default config;
