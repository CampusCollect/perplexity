/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F1113',
        surface: '#15191D',
        muted: '#1E2328',
        accent: '#3EB0F1',
        success: '#3FD2A9',
        warning: '#F7C948',
        danger: '#F0616D',
        textPrimary: '#E6EDF3',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 45px rgba(62, 176, 241, 0.2)',
      },
    },
  },
  plugins: [],
};
