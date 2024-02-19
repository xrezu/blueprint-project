/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c4a6e',
        secondary: '#f0f9ff',
        tertiary: '#cbd5e1',
        hover: '#f8fafc',
        detail: '#0ea5e9',
      },
    },
  },
  plugins: [],
}
