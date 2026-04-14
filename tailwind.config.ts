import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A4D4E',
          light: '#1A7A7A',
          lighter: '#2A9D9D',
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#EA580C',
        },
        neutral: {
          charcoal: '#1F2937',
          slate: '#475569',
          'light-gray': '#E2E8F0',
          'off-white': '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(10,77,78,0.08), 0 1px 2px 0 rgba(10,77,78,0.04)',
        'card-hover': '0 8px 24px 0 rgba(10,77,78,0.14)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-glow': {
          '0%, 100%': { boxShadow: '0 4px 14px 0 rgba(10, 77, 78, 0.25)' },
          '50%': { boxShadow: '0 4px 20px 0 rgba(10, 77, 78, 0.4)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'soft-glow': 'soft-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
