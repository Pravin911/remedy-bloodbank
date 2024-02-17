/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3876BF'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}