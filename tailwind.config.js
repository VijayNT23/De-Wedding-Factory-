  /** @type {import('tailwindcss').Config} */
  export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          'serif': ['Gallant', 'Playfair Display', 'serif'],
          'sans': ['Montserrat', 'sans-serif'],
        },
        colors: {
          gold: {
            400: '#D4AF37',
            500: '#B8941F',
            600: '#9C7A07',
          }
        },


        
        animation: {
          'fade-in': 'fadeIn 1s ease-in-out',
          'slide-up': 'slideUp 1s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(50px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  };