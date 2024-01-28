const { theme } = require('@sanity/demo/tailwind')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './util/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    screens: {
      xxs: '375px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    // Overriding fontFamily to use @next/font loaded families
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['classico-urw', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.5rem',
      },
      colors: {
        fuschia: '#fcdffc',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
