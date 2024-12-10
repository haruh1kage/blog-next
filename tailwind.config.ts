import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderColor: {
        theme: "var(--theme-border-color)"
      },
      backgroundColor: {
        themeSwitchButtonActive: "var(--theme-switch-button-active)"
      }
    },
  },
  plugins: [],
} satisfies Config;
