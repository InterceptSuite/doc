/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0A',
        card: {
          DEFAULT: '#0D0D0D',
          hover: '#121212',
        },
        line: {
          DEFAULT: '#1A1A1A',
          hover: '#2A2A2A',
        },
        accent: {
          DEFAULT: '#7C3AED',
          light: '#9F6FFF',
          dim: '#4F46E5',
          glow: 'rgba(124,58,237,0.15)',
        },
        content: {
          DEFAULT: '#F0F0F0',
          muted: '#888888',
          dim: '#444444',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 65%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#888888',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}
