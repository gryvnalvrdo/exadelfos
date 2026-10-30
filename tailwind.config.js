/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exa: {
          orange: {
            DEFAULT: '#FF5C00',
            50: '#FFF5EE',
            100: '#FFE8DA',
            200: '#FFD1B5',
            300: '#FFB385',
            400: '#FF8A47',
            500: '#FF5C00',
            600: '#E64D00',
            700: '#B83A00',
            800: '#8C2B00',
            900: '#5E1B00',
          },
          green: {
            DEFAULT: '#12382B',
            50: '#EBF4F0',
            100: '#D5E6DF',
            200: '#ADCBBF',
            300: '#7EAB99',
            400: '#46806C',
            500: '#1F5845',
            600: '#164536',
            700: '#12382B',
            800: '#0C271E',
            900: '#071712',
          },
          cream: {
            DEFAULT: '#FDFBF7',
            50: '#FFFFFF',
            100: '#FAF6EE',
            200: '#F5ECE0',
            300: '#EDE0CE',
            400: '#E0CCB2',
          },
          sand: '#EEDFCC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'card': '0 12px 35px -8px rgba(18, 56, 43, 0.08), 0 4px 12px -2px rgba(255, 92, 0, 0.04)',
        'floating': '0 20px 40px -10px rgba(255, 92, 0, 0.28)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
