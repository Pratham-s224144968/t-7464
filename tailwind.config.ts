
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
        'purple-blue-gradient': 'linear-gradient(135deg, #6366f1, #3b82f6)',
        'purple-pink-gradient': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        'green-blue-gradient': 'linear-gradient(135deg, #10b981, #3b82f6)',
        'orange-red-gradient': 'linear-gradient(135deg, #f97316, #ef4444)',
        'cyber-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #d946ef)',
        'night-sky': 'radial-gradient(circle, #0f172a, #020617)',
        'aurora': 'linear-gradient(135deg, #0ea5e9, #8b5cf6, #10b981)',
        'neon-glow': 'linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)',
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "zoom-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s infinite ease-in-out",
        "pulse": "pulse 2s infinite ease-in-out",
        "glow": "glow 2s infinite ease-in-out",
        "spin-slow": "spin-slow 8s linear infinite",
        "breathe": "breathe 4s infinite ease-in-out",
        "bounce-subtle": "bounce-subtle 2s infinite ease-in-out",
        "gradient-move": "gradient-move 15s ease infinite",
        "shimmer": "shimmer 3s infinite linear",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "zoom-in": "zoom-in 0.3s ease-out",
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        'neon-purple': '0 0 5px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-pink': '0 0 5px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.4)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'glow': 'box-shadow, opacity',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
