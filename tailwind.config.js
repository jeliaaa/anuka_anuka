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
        midnight: {
          DEFAULT: '#161a2c',
          2: '#1f2438',
          3: '#2c3252',
        },
        parchment: {
          DEFAULT: '#f4ecdb',
          dim: '#e6d9bf',
        },
        ember: {
          DEFAULT: '#e8a857',
          dim: '#b9854a',
        },
        quartz: '#d98d98',
        mist: '#ece8df',
        ink: '#2b2530',
        muted: '#8d93b0',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'drift': 'drift 10s ease-in-out infinite',
        'orbit-a': 'orbit-a 22s linear infinite',
        'orbit-b': 'orbit-b 22s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.85' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-22px,0)' },
        },
      },
    },
  },
  plugins: [],
}
