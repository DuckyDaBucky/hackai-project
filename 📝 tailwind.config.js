/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        cloud: '#f5f7fa',
        paleLavender: '#F0EEF9',
        mintWash: '#EEF7F2',
        graySlate: '#4B5563',
      },
    },
  },
  plugins: [],
}
