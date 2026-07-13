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
        ink: "#031927",
        blue: "#04314E",
        crimson: "#3D001C",
        ember: "#FC7A1E",
        linen: "#F2E9DC",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        hebrew: ["var(--font-hebrew)"],
      },
    },
  },
  plugins: [],
};

export default config;