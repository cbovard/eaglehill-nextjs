/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "wood-pattern": "url('../public/images/bg-wood-pattern.jpg')",
        "grass-pattern": "url('../public/images/bg-grass-pattern.png')",
      },
      fontFamily: {
        "bebas-neue": ["var(--font-bebas-neue)"],
      },
      colors: {
        "deep-fir": {
          50: "hsl(85, 100%, 97%)",
          100: "hsl(91, 100%, 92%)",
          200: "hsl(90, 97%, 85%)",
          300: "hsl(90, 96%, 73%)",
          400: "hsl(91, 86%, 58%)",
          500: "hsl(91, 88%, 45%)",
          600: "hsl(91, 95%, 36%)",
          700: "hsl(91, 89%, 29%)",
          800: "hsl(92, 80%, 24%)",
          900: "hsl(92, 77%, 20%)",
          950: "hsl(94, 100%, 7%)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
