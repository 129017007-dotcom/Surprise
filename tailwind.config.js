/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#06050e',
          900: '#0c0a1a',
          850: '#120f27',
          800: '#181434',
          700: '#231d4b',
        },
        romantic: {
          blush: '#fff1f2',
          pink: '#f472b6',
          rose: '#fb7185',
          deepRose: '#f43f5e',
          purple: '#c084fc',
          violet: '#a855f7',
          gold: '#fbbf24',
          goldLight: '#fef08a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatSlow 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(244, 114, 182, 0.45)',
        'glow-rose': '0 0 35px -5px rgba(251, 113, 133, 0.5)',
        'glow-purple': '0 0 30px -5px rgba(192, 132, 252, 0.4)',
        'glow-gold': '0 0 30px -5px rgba(251, 191, 36, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
