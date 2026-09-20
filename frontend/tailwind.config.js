/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          deepest: "#090205",
          dark: "#0E0307",
          canvas: "#19060E",
          card: "#240B15",
          cardElevated: "#300E1C",
          border: "#48162A",
          borderHover: "#6B1D3D",
        },
        gold: {
          bright: "#FDE047",
          light: "#FBBF24",
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
          muted: "rgba(212, 175, 55, 0.15)",
        },
        ruby: {
          light: "#E11D48",
          DEFAULT: "#BE123C",
          dark: "#881337",
        },
        ivory: {
          DEFAULT: "#FFF7ED",
          champagne: "#D6C7B8",
          muted: "#A8988B",
        },
        // Backwards compatibility fallbacks
        peacock: {
          dark: "#B8860B",
          DEFAULT: "#D4AF37",
          light: "#FBBF24",
          glow: "#FDE047",
          muted: "rgba(212, 175, 55, 0.15)",
        },
        amberGold: {
          light: "#FDE047",
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
          muted: "rgba(212, 175, 55, 0.15)",
        },
        midnight: {
          deepest: "#090205",
          dark: "#0E0307",
          canvas: "#19060E",
          card: "#240B15",
          cardElevated: "#300E1C",
          border: "#48162A",
          borderHover: "#6B1D3D",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
