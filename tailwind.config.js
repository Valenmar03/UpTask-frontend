import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode" : "class",
  theme: {
    fontFamily: {
      outfit: ["Outfit", "Roboto", 'sans-serif'],
      roboto: ["Roboto", "Outfit", 'sans-serif'],
    },
    extend: {},
    keyframes:{
      shimmer: {
        '100%' : {
          transform: 'translateX(100%)'
        }
      }
    }
  },
  plugins: [],
}

