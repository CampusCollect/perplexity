import tokens from './src/styles/tokens.json' with { type: 'json' };

const spacingScale = tokens.spacing.reduce((acc, value) => {
  acc[value] = `${value}px`;
  return acc;
}, /** @type {Record<string, string>} */ ({}));

const [radiusSm, radiusMd, radiusLg, radiusXl] = tokens.radii;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: tokens.colors.bg,
        surface: tokens.colors.surface,
        overlay: tokens.colors.overlay,
        primary: tokens.colors.primary,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        danger: tokens.colors.danger,
        text: {
          primary: tokens.colors.textPrimary,
          secondary: tokens.colors.textSecondary,
        },
        border: tokens.colors.border,
      },
      fontFamily: {
        heading: [`${tokens.fonts.heading}`, 'sans-serif'],
        body: [`${tokens.fonts.body}`, 'sans-serif'],
      },
      spacing: spacingScale,
      borderRadius: {
        sm: `${radiusSm}px`,
        md: `${radiusMd}px`,
        lg: `${radiusLg}px`,
        xl: `${radiusXl}px`,
        full: '9999px',
      },
    },
  },
  plugins: [],
};
