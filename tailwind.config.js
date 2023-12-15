/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '.625rem',
        '3.25xs': '13px',
        15: '15px',
        8: '2rem',
      },
      spacing: {
        0.75: '0.1875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      screens: {
        xxs: '320px',
        xs: '390px',
        xsm: '480px',
        mobile: '576px',
        sm: '640px',
        md: '768px',
        '2md': '840px',
        tablet: '960px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
        'spin-fast': 'spin 0.75s linear infinite',
      },
    },
  },
  plugins: [],
};
