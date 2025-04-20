/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif'],
        body: ['Open Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        cloud: '#f5f7fa',
        paleLavender: '#F0EEF9',
        mintWash: '#EEF7F2',
        graySlate: '#4B5563',
        plum: '#7f5af0', // for buttons & accents
      },
      animation: {
        gradient: "gradientBG 6s ease-in-out infinite",
      },
      keyframes: {
        gradientBG: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
    },
  },
  plugins: [],
}
