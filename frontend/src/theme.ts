export const darkTheme = {
  colors: {
    background: '#181A20',
    card: '#23243A',
    surface: '#23243A',
    primary: '#FFD600', // Neon yellow
    secondary: '#7C3AED', // Purple
    accent: '#00E6FE', // Cyan
    text: '#FFFFFF',
    textSecondary: '#B0B3C7',
    border: '#292B3E',
    error: '#FF5370',
    success: '#00E676',
    warning: '#FFD600',
    info: '#00E6FE',
    muted: '#23243A',
    inputBackground: '#23243A',
    inputBorder: '#292B3E',
    placeholder: '#B0B3C7',
    icon: '#FFD600',
    tabInactive: '#B0B3C7',
    tabActive: '#FFD600',
    glass: 'rgba(35,36,58,0.7)',
    glassBorder: 'rgba(255,255,255,0.08)',
    glassGradient: ['rgba(35,36,58,0.7)', 'rgba(35,36,58,0.4)'],
    gradientPrimary: ['#FFD600', '#7C3AED'],
    gradientAccent: ['#00E6FE', '#7C3AED'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: 16,
  font: {
    regular: 'System',
    bold: 'System',
  },
};

export type Theme = typeof darkTheme; 