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
          teal: '#1B4F57',
          navy: '#163744',
          deepestNavy: '#0C1928',
          secondaryTeal: '#3C6B73',
          accentTeal: '#2B7A80',
          white: '#FBFCFD',
          offWhite: '#EEF2F3',
          softBorder: '#C3CFD2',
          textPrimary: '#162B3A',
          textSecondary: '#6C8085',
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

