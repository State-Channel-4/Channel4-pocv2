/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#151616",
        "gray": "#282A2D",
        "light": "#373A3E",
        "gray-light": "#9EA3A7",
      },
      backgroundImage: {
        "c4-gradient-main": "linear-gradient(77.41deg, #FB2BFF -5.41%, #E5F344 21.24%, #37FF4B 47.31%, #4D89FF 74.54%, #8F00FF 105.82%)",
        "c4-gradient-separator": "linear-gradient(256.85deg, #FB2BFF 9.09%, #E5F344 38.43%, #37FF4B 67.14%, #4D89FF 97.12%, #8F00FF 131.56%)",
      },
      fontFamily: {
        "title": ["Lexend", "sans-serif"],
        "text": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

