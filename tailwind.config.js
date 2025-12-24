/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#123972',    // Deep Navy
        secondary: '#4175FC',  // Bright Blue
        accent: '#F2ACEC',     // Soft Pink
        'bg-light': '#F4F6F9',
        border: '#E5E7EB',
        // New BloomFi Inspired Dark Theme Colors
        'bloom-dark': '#0D0B21',     // Deepest purple/black background
        'bloom-primary': '#5D5CDE',  // Primary purple
        'bloom-secondary': '#C0B7E8',// Light lavender/white
        'bloom-blue': '#005de4',     // New Blue for headings
        'bloom-text': '#EAEAEA',     // Light text
        'bloom-text-muted': '#9CA3AF', // Muted text
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}
