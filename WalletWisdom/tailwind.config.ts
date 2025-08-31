import type { Config } from "tailwindcss"

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#F9F6F0", // Soft Beige/Ivory
        foreground: "#1C6E6E", // Deep Teal for text
        primary: {
          DEFAULT: "#1C6E6E", // Deep Teal
          foreground: "#F9F6F0",
        },
        secondary: {
          DEFAULT: "#2C5F2D", // Forest Green
          foreground: "#F9F6F0",
        },
        accent: {
          DEFAULT: "#FFC857", // Warm Gold
          foreground: "#1C6E6E",
        },
        muted: {
          DEFAULT: "#A0C1B8", // Mist Blue
          foreground: "#1C6E6E",
        },
        card: {
          DEFAULT: "#F9F6F0",
          foreground: "#1C6E6E",
        },
        // Custom WalletWisdom colors
        "deep-teal": "#1C6E6E",
        "warm-gold": "#FFC857",
        "soft-beige": "#F9F6F0",
        "forest-green": "#2C5F2D",
        "mist-blue": "#A0C1B8",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
