/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
      },
      colors: {
        background: '#F5F9FA',
        foreground: '#0C1A20',
        primary: {
          DEFAULT: '#0E7490',
          hover: '#0C637B',
          foreground: '#FFFFFF',
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
        device: {
          surface: '#1A1B22',
          edge: '#343640',
          inset: '#101116',
        },
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
        device: '0 28px 64px -24px rgba(14, 116, 144, 0.28)',
        'hero-cta': '0 12px 28px -12px rgba(14, 116, 144, 0.48)',
        'journey-dot': '0 0 0 6px rgba(6, 182, 212, 0.10)',
      },
      backgroundImage: {
        'hero-wash': 'radial-gradient(circle at 78% 38%, rgba(6, 182, 212, 0.09) 0%, transparent 38%), linear-gradient(180deg, #F5F9FA 0%, #F8FBFC 100%)',
        'hero-journey-halo': 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.13) 0%, rgba(14, 116, 144, 0.05) 42%, transparent 72%)',
        'hero-showcase-stage': "url('/images/hero-showcase-stage.webp')",
        'hero-stage-halo': 'linear-gradient(180deg, #F5F9FA 0%, #F5F9FA 9%, rgba(245, 249, 250, 0.86) 16%, rgba(245, 249, 250, 0.18) 29%, transparent 40%), linear-gradient(rgba(245, 249, 250, 0.16), rgba(245, 249, 250, 0.16))',
      },
      aspectRatio: {
        phone: '9 / 19.5',
      },
      minHeight: {
        'hero-visual': '22rem',
        'device-stage': '15rem',
      },
    },
  },
  plugins: [],
}
