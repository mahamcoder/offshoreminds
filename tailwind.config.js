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
        primary: '#123972',    // Deep Navy
        secondary: '#4175FC',  // Bright Blue
        accent: '#F2ACEC',     // Soft Pink
        'bg-light': '#F4F6F9',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        // Dynamic Bloom Theme Colors (Light & Dark)
        'bloom-dark': 'rgb(var(--color-bloom-dark) / <alpha-value>)',
        'bloom-primary': 'rgb(var(--color-bloom-primary) / <alpha-value>)',
        'bloom-secondary': 'rgb(var(--color-bloom-secondary) / <alpha-value>)',
        'bloom-blue': 'rgb(var(--color-bloom-blue) / <alpha-value>)',
        'bloom-text': 'rgb(var(--color-bloom-text) / <alpha-value>)',
        'bloom-text-muted': 'rgb(var(--color-bloom-text-muted) / <alpha-value>)',
        'bloom-card': 'rgb(var(--color-bloom-card) / <alpha-value>)',
        'bloom-card-border': 'rgb(var(--color-bloom-card-border) / <alpha-value>)',
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
