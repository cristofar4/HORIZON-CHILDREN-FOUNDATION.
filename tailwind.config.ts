import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm white foundations
        cream: {
          DEFAULT: '#FBF8F2',
          50: '#FFFFFF',
          100: '#FBF8F2',
          200: '#F4EEE3',
          300: '#EBE2D2',
        },
        // Deep ink for elegant typography
        ink: {
          DEFAULT: '#16293A',
          soft: '#3C4F60',
          muted: '#6B7A88',
        },
        // Soft blue accents (primary brand)
        horizon: {
          50: '#EFF6FC',
          100: '#DAEAF7',
          200: '#B6D5EE',
          300: '#88BBE1',
          400: '#579CD0',
          500: '#3580BE',
          600: '#2766A1',
          700: '#1F5184',
          800: '#1C446C',
          900: '#1A3A5B',
          950: '#11253B',
        },
        // Warm amber for sunrise, hope and accents
        dawn: {
          50: '#FEF8EE',
          100: '#FCEDD3',
          200: '#F8D7A6',
          300: '#F3BC6E',
          400: '#EE9F42',
          500: '#E8862A',
          600: '#D26A1F',
          700: '#AF501C',
          800: '#8C401E',
          900: '#72361B',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 6vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'hero': ['clamp(3rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 20px -8px rgba(22, 41, 58, 0.12)',
        'lift': '0 24px 60px -24px rgba(22, 41, 58, 0.28)',
        'glow': '0 0 80px -20px rgba(244, 188, 110, 0.55)',
      },
      transitionTimingFunction: {
        'horizon': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
