/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        default: '#FFFFFF',
        F1: '#F1F1F1',
      },
      green: {
        dark: '#A0C334',
      },
      blue: {
        fb: '#4267B2',
      },
    },
    fontFamily: {
      'permanent-marker': ['Permanent Marker', 'cursive'],
      'oleo-script': ['Oleo Script Swash Caps', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
};
