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
          // Black, White and Gold Luxury Palette
          navy: '#000000',          // Deep pitch black
          darkNavy: '#0a0a0a',      // Rich onyx black
          card: '#121212',          // Subtle elevation black
          gold: '#d4af37',          // Imperial metallic gold
          goldLight: '#f3e5ab',     // Champagne highlight gold
          goldAccent: '#e6ca65',    // Radiant accent gold
          goldDark: '#997a15',      // Deep bronze gold
          ivory: '#ffffff',         // Crisp pure white
          ivoryDark: '#fafafa',     // Off-white surface
          slate: '#27272a',         // Charcoal border
          white: '#ffffff',
          black: '#000000'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pan-slow': 'panSlow 35s linear infinite alternate',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        panSlow: {
          '0%': { transform: 'scale(1.1) translateX(0%)' },
          '100%': { transform: 'scale(1.1) translateX(-25%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
