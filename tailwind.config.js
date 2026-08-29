/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        "black-100": "rgb(var(--color-black-100) / <alpha-value>)",
        "black-200": "rgb(var(--color-black-200) / <alpha-value>)",
        "white-100": "rgb(var(--color-white-100) / <alpha-value>)",
        heading: "rgb(var(--color-heading) / <alpha-value>)",
        "hero-subtext": "rgb(var(--color-hero-subtext) / <alpha-value>)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};