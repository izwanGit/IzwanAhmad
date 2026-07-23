/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F9FA',
        foreground: '#0C1A20',
        primary: {
          DEFAULT: '#0E7490',
          hover: '#0C637B',
        },
        accent: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
        },
        muted: {
          DEFAULT: '#64748B',
          foreground: '#64748B',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0C1A20',
        },
        tint: '#EBF6F8',
        border: '#E2EEF1',
        borderStrong: '#CBD5E1',
        statusGreen: '#22C55E',
        petronas: {
          green: '#00B1A9',
          purple: '#763F98',
          blue: '#20419A',
          yellow: '#FDB924',
          lime: '#BFD730',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(14, 116, 144, 0.07)',
        hover: '0 12px 32px rgba(14, 116, 144, 0.14)',
      },
    },
  },
  plugins: [],
}
