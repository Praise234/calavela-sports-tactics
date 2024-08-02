/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'custom-width': '320px' // custom width
      },
      height: {
        'custom-height': '863px' // custom height
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        'custom-primary': "#3B7D23",
        'custom-white': "#FFFFFF",
        'custom-black': "#000000",
        'custom-gray': "#828282"
      },
      rotate: {
        '90': '270deg',
        '0': '0deg',
      }
    },
  },
  plugins: [],
}

