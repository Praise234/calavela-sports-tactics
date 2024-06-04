/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      spacing: {
        
      }
    },
  },
  plugins: [],
}

