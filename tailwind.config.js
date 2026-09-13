/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          bg: '#14111A',
          card: 'rgba(38, 30, 46, 0.65)',
          mahogany: '#2E2236',
          wine: '#4D3352',
          rose: '#F4C2C2',
          blush: '#F9D5D6',
          lavender: '#D8BBFF',
          peach: '#FDE2E4',
          cream: '#FFF1E6',
          sage: '#D8E2DC',
          champagne: '#F0E6D2',
          gold: '#E8D5B7',
          darkBg: '#0F0D14',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'Georgia', 'serif']
      },
      boxShadow: {
        'soft-glow': '0 10px 40px -10px rgba(244, 194, 194, 0.2)',
        'pastel-glow': '0 0 30px rgba(244, 194, 194, 0.25)',
        'warm-shadow': '0 25px 60px -15px rgba(0, 0, 0, 0.85)',
        'polaroid': '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 2px rgba(244, 194, 194, 0.2)'
      },
      animation: {
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
