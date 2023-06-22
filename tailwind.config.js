/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: {
        50: "#efe7ea",
        100: "#dfced5",
        200: "#bf9dab",
        300: "#9e6c80",
        400: "#7e3b56",
        500: "#5e0a2c",
        600: "#4b0823",
        700: "#38061a",
        800: "#260412",
        900: "#130209",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      brightness: {
        75: ".75",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
};
