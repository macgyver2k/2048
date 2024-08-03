import { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Clear Sans"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#776e65',
        secondary: '#bbada0',
      },
    },
  },
  plugins: [],
} satisfies Config;
