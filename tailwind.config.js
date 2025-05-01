/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%) rotate(-5deg)' },
          '100%': { transform: 'translateX(0) rotate(0)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3) rotate(-10deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(5deg)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9) rotate(-2deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        'float-in': {
          '0%': { transform: 'translateY(50px) scale(0.8)', opacity: '0' },
          '50%': { transform: 'translateY(-10px) scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-in': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float-in': 'float-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
} 