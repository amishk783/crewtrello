import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "bg-gradient-to-b from-purple-300 via-purple-600 to-violet-700",
      },
      fontFamily: {
        barlow: ["var(--font-barlow)"],
        inter: ["var(--font-inter)"],
      },
      textColor: {
        primary: "#757575",
      },
    },
  },
  plugins: [],
};
export default config;
