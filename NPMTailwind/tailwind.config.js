/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#000000',
        tahiti: {
          DEFAULT: '#3ab7bf',
          50: '#f0fdff',
          100: '#ccfbf1',
          500: '#3ab7bf',
          900: '#134e4a',
        },
      },
    },
  },
  plugins: [],
};
