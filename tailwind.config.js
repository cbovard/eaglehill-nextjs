/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'wood-pattern': "url('../public/images/bg-wood-pattern.jpg')",
        'grass-pattern': "url('../public/images/bg-grass-pattern.png')",
      },
      fontFamily: {
        'bebas-neue': ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
