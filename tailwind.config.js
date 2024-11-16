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
    extend: {
      colors: {
        amethyst: {
          '50': '#fbf7fd',
          '100': '#f5eef9',
          '200': '#eddff5',
          '300': '#dec6ec',
          '400': '#caa2de',
          '500': '#ac6ec9',
          '600': '#a061bc',
          '700': '#8a4da3',
          '800': '#734386',
          '900': '#5e376c',
          '950': '#401e4d',
        },
      }
    },
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

