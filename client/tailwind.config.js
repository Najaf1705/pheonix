/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgba(var(--color-bg))',
        text: 'rgba(var(--color-text))',
        primary: 'rgba(var(--color-primary))',
        secondary: 'rgba(var(--color-secondary))',
        error: 'rgba(var(--color-error))',
        success: 'rgba(var(--color-success))',
        warning: 'rgba(var(--color-warning))',
        card: 'rgba(var(--color-card))',
      },
    },
  },
  darkMode: 'class',
};