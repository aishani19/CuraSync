/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#6366f1', // Indigo Blue with Magenta hint
        'secondary': '#f8fafc', // Off-white
        'gynecologist': '#db2777' // Deep Pink
      }

    },
  },
  plugins: [],
}