/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#070d1e',
          850: '#0b132b',
          800: '#111d40',
          700: '#1c2d5a',
          600: '#2c437d',
        },
        cosmic: {
          cyan: '#38bdf8',
          gold: '#fbbf24',
          orange: '#f97316',
          violet: '#a855f7',
          rose: '#f43f5e',
          neon: '#06b6d4',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'Consolas', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
