/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      backgroundColor: {
        "dark-bg-color": "#1f2937",
        "light-bg-color": "#f6f6f6"
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}