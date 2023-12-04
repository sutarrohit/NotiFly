import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        c_black: "#09090b",
        c_White: "#fafafa",
        c_grey: "#39393b",
        c_Litegrey: "#64646a",
        c_Graywhite: "#f4f4f5",
        c_red: "#e11d48",
        c_Blue: "#3b82f6",
        c_Green: "#22c55e",
        c_LightGreen: "#adfa1d",
        c_Orange: "#ea580c",
      },
      colors: {
        c_black: "#09090b",
        c_White: "#fafafa",
        c_grey: "#27272a",
        c_Litegrey: "#64646a",
        c_Graywhite: "#f4f4f5",
        c_red: "#e11d48",
        c_Blue: "#3b82f6",
        c_Green: "#22c55e",
        c_LightGreen: "#adfa1d",
        c_Orange: "#ea580c",
      },
    },
  },
  plugins: [],
};
export default config;
