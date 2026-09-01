/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          navyDarker: '#090D15',
          navyDeep: '#0F1422',
          navy: '#161C2E',
          navyCard: '#1C2338',
          navyBorder: '#27314C',
          teal: '#2F6973',
          tealDeep: '#225058',
          tealGlow: '#3B7E8B',
          tealLight: '#85BAC2',
          tealSoft: '#EDF6F7',
          tealSubtle: 'rgba(47, 105, 115, 0.08)',
          ink: '#0F172A',
          inkSecondary: '#334155',
          muted: '#64748B',
          line: '#E2E8F0',
          lineDark: '#263047',
          canvas: '#F4F7F8',
          surface: '#FFFFFF',
        },
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)',
        card: '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(15, 23, 42, 0.1), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        cta: '0 10px 24px -6px rgba(22, 28, 46, 0.45)',
        'cta-teal': '0 10px 24px -6px rgba(47, 105, 115, 0.45)',
        panel: '0 20px 40px -15px rgba(15, 20, 34, 0.55)',
        logo: '0 12px 32px -8px rgba(0, 0, 0, 0.35)',
        modal: '0 25px 60px -15px rgba(15, 23, 42, 0.6)',
      },
    },
  },
  plugins: [],
}

