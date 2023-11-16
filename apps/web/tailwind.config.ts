import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        c_black: "#09090b",
        c_White: "#fafafa",
        c_grey: "#27272a",
        c_Litegrey: "#64646a",
        c_Graywhite: "#f4f4f5",
      },
      colors: {
        c_black: "#09090b",
        c_White: "#fafafa",
        c_grey: "#27272a",
        c_Litegrey: "#64646a",
        c_Graywhite: "#f4f4f5",
      },
    },
  },
  plugins: [],
};
export default config;
