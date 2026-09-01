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
        finrev: {
          deepNavy: '#102A43',
          navy: '#163A5F',
          darkNavy: '#0B1B2B',
          teal: '#1B5B63',
          accentTeal: '#247B85',
          gold: '#F2B705',
          goldDark: '#D49E00',
          goldLight: '#FEF3C7',
          softBg: '#F5F7F8',
          cardWhite: '#FFFFFF',
          border: '#D9E2EC',
          borderLight: '#E8EFF5',
          textPrimary: '#102A43',
          textSecondary: '#526777',
          textMuted: '#829AB1',
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

