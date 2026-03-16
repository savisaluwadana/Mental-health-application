import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#fafaf9",
        },
        sage: {
          50: "#f5f8f6",
          100: "#e7f0e8",
          600: "#6B8F71",
        },
        slate: {
          700: "#334155",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
