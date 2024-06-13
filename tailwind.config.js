/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      outfit: ["Outfit", "Roboto", 'sans-serif'],
      roboto: ["Roboto", "Outfit", 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

