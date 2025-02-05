/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'foundations-primary': '#3D52A0',
        'foundations-secondary': '#7091E6',
        'foundations-tertiary': '#8697C4',
        'foundations-hover': '#ADBBDA',
        'foundations-light': '#EDE8F5',
        'foundations-dark': '#1E2838',
        primary: '#4F46E5', // Indigo-600
        secondary: '#10B981', // Emerald-500
        accent: '#F59E0B', // Amber-500
      },
    },
  },
  plugins: [],
}

// 'foundations-primary': '#8B2BC8',      /* Purple - primary color */
// 'foundations-secondary': '#FF8A2B',    /* Orange - accent color */
// 'foundations-tertiary': '#A5B6FF',     /* Light blue tint */
// 'foundations-hover': '#E8F0FF',        /* Light sky blue */
// 'foundations-light': '#F5F9FF',        /* Clean white/light gray */
// 'foundations-dark': '#1A1D45',  