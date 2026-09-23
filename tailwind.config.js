/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#c8834a',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e5eae6',
          200: '#cbd5ce',
          300: '#a6b8ab',
          400: '#7e9686',
          500: '#5e7968',
          600: '#485e51',
          700: '#3a4c42',
          800: '#303f37',
          900: '#28342e',
          950: '#151d19',
        },
        cream: {
          50: '#faf9f6',
          100: '#f5f3eb',
          200: '#ebe5d2',
          300: '#ddd2b3',
          400: '#cbb68d',
          500: '#bc9d6e',
          600: '#ad8457',
          700: '#916847',
          800: '#76543d',
          900: '#604535',
          950: '#342319',
        }
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
