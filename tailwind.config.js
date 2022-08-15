const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        "prose": "65ch",
      },
      minWidth:{
        "prose": "65ch",
      },
      colors:{
        "base": "#2b2d42",
        "highlight": "#3685B5",
        'base': {
          DEFAULT: '#2b2d42',
          light: '#46475a',
          dark: '#202232'
        },
        keyframes: {
          vanish: {
            '25%': { color: "transparent" },
            '100%': { height: '0' },
          }
        }
      }
    },
  },
  plugins: [],
}