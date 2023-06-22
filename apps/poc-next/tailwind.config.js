const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
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
        dark: "#151616",
        gray: "#282A2D",
        light: "#373A3E",
        "gray-light": "#9EA3A7",
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
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "c4-gradient-main":
          "linear-gradient(77.41deg, #FB2BFF -5.41%, #E5F344 21.24%, #37FF4B 47.31%, #4D89FF 74.54%, #8F00FF 105.82%)",
        "c4-gradient-separator":
          "linear-gradient(256.85deg, #FB2BFF 9.09%, #E5F344 38.43%, #37FF4B 67.14%, #4D89FF 97.12%, #8F00FF 131.56%)",
        "c4-gradient-green":
          "linear-gradient(91.38deg, #E5F344 -4.98%, #37FF4B 98.82%)",
        "c4-gradient-blue":
          "linear-gradient(91.38deg, #4D89FF -4.98%, #8F00FF 98.82%)",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "c4-gradient":
          "linear-gradient(77.41deg, #FB2BFF -5.41%, #E5F344 21.24%, #37FF4B 47.31%, #4D89FF 74.54%, #8F00FF 105.82%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
