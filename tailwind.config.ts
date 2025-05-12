
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to bottom right, #8B5CF6, #3B82F6)',
        'blue-gradient': 'linear-gradient(to right, #3B82F6, #2563EB)',
        'vibrant-gradient': 'linear-gradient(to right, #F97316, #8B5CF6)',
        'dark-gradient': 'linear-gradient(to right, #1e293b, #0f172a)',
        'light-gradient': 'linear-gradient(to right, #f0f9ff, #e0f2fe)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent 70%)',
        'accent-gradient': 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
        'cool-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "floating 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)" }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(139, 92, 246, 0.5)',
        'glow': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 25px rgba(139, 92, 246, 0.5)',
        'accent-glow': '0 0 15px rgba(249, 115, 22, 0.5)',
        'blue-glow': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
      textShadow: {
        'glow': '0 0 10px rgba(139, 92, 246, 0.7)',
        'accent-glow': '0 0 10px rgba(249, 115, 22, 0.7)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add a plugin for text shadow
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(139, 92, 246, 0.7)',
        },
        '.text-shadow-accent': {
          textShadow: '0 0 10px rgba(249, 115, 22, 0.7)',
        },
        '.text-shadow-blue': {
          textShadow: '0 0 10px rgba(59, 130, 246, 0.7)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
