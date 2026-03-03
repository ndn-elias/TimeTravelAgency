/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Chronos Luxe"
        cosmos:  { 900: '#07090f', 800: '#0d1220', 700: '#111827' },
        gold:    { DEFAULT: '#c9a227', light: '#e4c053', dark: '#8f7119' },
        quantum: { DEFAULT: '#7c3aed', light: '#a855f7', dark: '#4c1d95' },
        azure:   { DEFAULT: '#1e40af', light: '#3b82f6',  dark: '#1e3a5f' },
        cream:   { DEFAULT: '#f0e6d0', muted: '#9ca3af' },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'vortex': 'radial-gradient(ellipse at center, #1e3a5f 0%, #0d1220 40%, #07090f 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #c9a227 0%, #e4c053 50%, #c9a227 100%)',
        'card-rome':   'linear-gradient(160deg, #1a0a00 0%, #5c1a00 50%, #b8460a 100%)',
        'card-paris':  'linear-gradient(160deg, #0a0a1a 0%, #1a1a3e 50%, #3b2a72 100%)',
        'card-tokyo':  'linear-gradient(160deg, #001a0a 0%, #003b2a 50%, #00704f 100%)',
      },
      animation: {
        'pulse-gold':  'pulseGold 2.5s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 25s linear infinite',
        'float':       'float 8s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.6)' },
          '50%':      { boxShadow: '0 0 0 16px rgba(201,162,39,0)' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'gold':    '0 0 40px rgba(201,162,39,0.35)',
        'gold-sm': '0 0 16px rgba(201,162,39,0.25)',
        'card':    '0 25px 60px rgba(0,0,0,0.6)',
        'card-hover': '0 35px 80px rgba(0,0,0,0.8), 0 0 40px rgba(201,162,39,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};
