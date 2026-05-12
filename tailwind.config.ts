import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#005FA3',
          'blue-dark': '#003D6B',
          'blue-mid': '#0077CC',
          'blue-light': '#E8F4FE',
          green: '#00875A',
          'green-mid': '#00A36C',
          'green-light': '#E3F9EE',
          navy: '#0A1628',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A1628 0%, #003D6B 50%, #005FA3 100%)',
        'cta-gradient': 'linear-gradient(135deg, #003D6B 0%, #005FA3 50%, #0077CC 100%)',
        'green-gradient': 'linear-gradient(135deg, #00875A 0%, #00A36C 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
