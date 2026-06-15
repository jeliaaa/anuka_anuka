/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50:  '#fff0f5',
          100: '#ffe0ec',
          200: '#ffc2d8',
          300: '#ff9bbd',
          400: '#ff6699',
          500: '#ff3d7f',
          600: '#f01a64',
          700: '#cc0f52',
          800: '#a80f47',
          900: '#8c1040',
        },
        rose: {
          soft: '#ffe4ec',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        accent: ['Pacifico', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'heart-beat': 'heart-beat 1.4s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
        'petal-fall': 'petal-fall 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.2)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #fff0f5 0%, #ffe4ec 50%, #ffd6e7 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,182,193,0.4) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
