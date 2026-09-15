/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nishat: {
          navy: '#0f172a',
          darkNavy: '#080d19',
          gold: '#b48c48',
          goldLight: '#c5a059',
          goldAccent: '#d4af37',
          ivory: '#faf9f6',
          ivoryDark: '#f4f1ea',
          slate: '#334155',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pan-slow': 'panSlow 35s linear infinite alternate',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        panSlow: {
          '0%': { transform: 'scale(1.1) translateX(0%)' },
          '100%': { transform: 'scale(1.1) translateX(-25%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(180, 140, 72, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(180, 140, 72, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
