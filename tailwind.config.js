// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      colors: {
        cloud: '#94a3b8',         // steel gray-blue
        paleLavender: '#a093d6',  // soft violet
        mintWash: '#7fb8a6',      // deep mint
        graySlate: '#1e293b',     // strong contrast for text
      },
    },
  },
  plugins: [],
}
