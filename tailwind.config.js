const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "shade-900": "#040d21",
        "shade-800": "#232b3d",
        "shade-700": "#434a59",
        "shade-600": "#626874"
      },
      width:{
        "prose": "65ch",
      },
      maxWidth:{
        "1/2": "50%",
        "4/5": "80%"
      },
      backgroundImage: {
        'hero-pattern': "radial-gradient(circle at top left,  rgba(0,29,179,1) 0%, rgba(0,0,0,1) 30%);",
      }
    },
  },
  plugins: [],
}