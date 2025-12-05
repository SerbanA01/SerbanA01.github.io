/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80c0ff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0073e6',
          600: '#005bb3',
          700: '#004380',
          800: '#002b4d',
          900: '#00131a',
        },
        // Orange accent colors commented out - using only blue throughout
        /*
        accent: {
          50: '#fff5e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa31a',
          500: '#ff8f00',
          600: '#cc7200',
          700: '#995600',
          800: '#663900',
          900: '#331d00',
        }
        */
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}