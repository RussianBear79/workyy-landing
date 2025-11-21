/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#020617',
        'brand-green': '#22c55e',
        'brand-red': '#ef4444',
      },
    },
  },
  plugins: [],
}

