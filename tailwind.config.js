/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          navy: '#191C2A',
          navyDeep: '#11141F',
          navySoft: '#222A3A',
          teal: '#3B656A',
          tealDeep: '#2E5357',
          tealLight: '#9FC2C2',
          tealMist: '#EDF2F2',
          ink: '#1E2530',
          muted: '#5C6773',
          line: '#E5E9EB',
          mist: '#F4F6F7',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,20,31,0.04), 0 4px 12px rgba(17,20,31,0.05)',
        'card-hover': '0 2px 4px rgba(17,20,31,0.05), 0 12px 28px rgba(17,20,31,0.1)',
        cta: '0 12px 26px -10px rgba(25,28,42,0.5)',
        panel: '0 18px 44px -20px rgba(17,20,31,0.6)',
        logo: '0 16px 40px -12px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}
