/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      screens: {
        xxs: "320px",
        xs: "450px",
        sm: "640px",
        md: "872px",
        lg: "1025px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
