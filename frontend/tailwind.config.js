/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system"],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          500: '#22d3ee',
          600: '#0891b2'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -5px rgba(99, 102, 241, 0.25), 0 8px 10px -6px rgba(99,102,241,0.2)',
        glass: '0 10px 30px rgba(2, 6, 23, 0.15)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeUp: 'fadeUp .4s ease-out both',
        shimmer: 'shimmer 2s linear infinite'
      }
    },
  },
  plugins: [],
}
