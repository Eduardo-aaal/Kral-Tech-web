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
        primary: {
          50: "#e0f7fa",
          100: "#b2ebf2",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00b4d8",
          600: "#0096c7",
          700: "#0077b6",
          800: "#005f8a",
          900: "#003d5c",
        },
        dental: {
          light: "#f0faff",
          dark: "#2d3436",
          muted: "#636e72",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Segoe UI",
          "Tahoma",
          "Geneva",
          "Verdana",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
