/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-primary-text)",
        secondary: "var(--theme-secondary-text)",
      },
    },
  },
  plugins: [],
};