/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // o "./src/**/*.{ts,tsx}" per TypeScript
  ],
  theme: {
    extend: {},
     fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
  },
  plugins: [],
}