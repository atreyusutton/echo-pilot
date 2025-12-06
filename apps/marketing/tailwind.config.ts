import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1A2A3A",
        teal: "#3CC7B3",
        "teal-dark": "#34B39D",
        "soft-gray": "#F4F6F8",
        "accent-lime": "#B8FF5A",
        blush: "#FFF9EE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 15px 45px rgba(23, 35, 54, 0.12)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      spacing: {
        18: "4.5rem",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
