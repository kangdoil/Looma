import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // ── Looma Semantic Colors ──
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)",
          "card-looma": "var(--color-bg-card)",
          "input-looma": "var(--color-bg-input)",
          glass: "var(--color-bg-glass)",
          "main-blur": "var(--color-bg-main-blur)",
          "black-blur": "var(--color-bg-black-blur)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
        },
        component: {
          primary: "var(--color-component-primary)",
          secondary: "var(--color-component-secondary)",
          tertiary: "var(--color-component-tertiary)",
          highlight: "var(--color-component-highlight)",
        },
        "border-looma": {
          DEFAULT: "var(--color-border-default)",
          subtle: "var(--color-border-subtle)",
          accent: "var(--color-border-accent)",
          highlight: "var(--color-border-highlight)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Looma
        xs: "var(--radius-xs)",
        "2xl": "var(--radius-md)",
        "4xl": "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        pretendard: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.125rem", fontWeight: "700" },
        ],
        "heading-sm": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.125rem", fontWeight: "600" },
        ],
        "body-lg": ["17px", { lineHeight: "24px", letterSpacing: "-0.125rem", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "-0.125rem", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "-0.125rem", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "-0.125rem", fontWeight: "400" }],
      },
      backgroundImage: {
        "gradient-blue-light": "var(--gradient-accent-blue-light)",
      },
      boxShadow: {
        "btn-container": "var(--shadow-btn-container)",
        card: "var(--shadow-card)",
        overlay: "var(--shadow-overlay)",
        subtle: "var(--shadow-subtle)",
        "accent-blue": "var(--shadow-accent-blue)",
        float: "var(--shadow-float)",
        "looma-sm": "var(--shadow-sm)",
        "looma-md": "var(--shadow-md)",
        image: "var(--shadow-image)",
        "inner-highlight": "var(--shadow-inner-highlight)",
        "inner-glow": "var(--shadow-inner-glow)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
