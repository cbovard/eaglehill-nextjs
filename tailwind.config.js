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
      dropShadow: {
        "white-1": [
          "0 20px 13px rgba(255,255,255, 0.1)",
          "0 8px 5px rgba(255,255,255, 0.1)",
        ],
      },
      textShadow: {
        sm: "1px 1px 0 var(--tw-shadow-color)",
        DEFAULT: "2px 2px 0 var(--tw-shadow-color)",
        lg: "4px 4px 0 var(--tw-shadow-color)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    // Add your custom plugin here
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    },
  ],
};
