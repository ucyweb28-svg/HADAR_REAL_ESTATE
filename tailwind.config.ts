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
        blue: "#233C58",
        crimson: "#5C0029",
        ember: "#BA5C12",
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