// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#191918",
        "light-bg": "#272726",
        "editor-bg": "#1A1B1A",
        "stroke-color": "#4F4E48",
        "dark-yellow": "#995614",
        yellow: "#FFD776",
        "dark-fg": "#151515",
        fg: "#FCFCFC",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
