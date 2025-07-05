import React, { createContext, useContext, useState } from 'react';

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  success: string;
  warning: string;
  error: string;
  tabInactive: string;
  glassGradient: string[];
  // Legacy properties for compatibility
  text: string;
  textSecondary: string;
  inputBorder: string;
  inputBackground: string;
  placeholder: string;
}

interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: number;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#ffffff',
  cardForeground: '#0f172a',
  popover: '#ffffff',
  popoverForeground: '#0f172a',
  primary: '#dc2626',
  primaryForeground: '#fef2f2',
  secondary: '#f7f7f7',
  secondaryForeground: '#374151',
  muted: '#f7f7f7',
  mutedForeground: '#6b7280',
  accent: '#f7f7f7',
  accentForeground: '#374151',
  destructive: '#ef4444',
  border: '#e5e7eb',
  input: '#e5e7eb',
  ring: '#dc2626',
  chart1: '#dc2626',
  chart2: '#059669',
  chart3: '#2563eb',
  chart4: '#d97706',
  chart5: '#c2410c',
  sidebar: '#fcfcfc',
  sidebarForeground: '#0f172a',
  sidebarPrimary: '#dc2626',
  sidebarPrimaryForeground: '#fef2f2',
  sidebarAccent: '#f7f7f7',
  sidebarAccentForeground: '#374151',
  sidebarBorder: '#e5e7eb',
  sidebarRing: '#dc2626',
  success: '#059669',
  warning: '#d97706',
  error: '#ef4444',
  tabInactive: '#6b7280',
  glassGradient: ['rgba(255, 255, 255, 0.8)', 'rgba(247, 247, 247, 0.6)'],
  // Legacy properties
  text: '#0f172a',
  textSecondary: '#6b7280',
  inputBorder: '#e5e7eb',
  inputBackground: '#ffffff',
  placeholder: '#6b7280',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  card: '#1e293b',
  cardForeground: '#f8fafc',
  popover: '#1e293b',
  popoverForeground: '#f8fafc',
  primary: '#dc2626',
  primaryForeground: '#fef2f2',
  secondary: '#334155',
  secondaryForeground: '#f8fafc',
  muted: '#334155',
  mutedForeground: '#94a3b8',
  accent: '#334155',
  accentForeground: '#f8fafc',
  destructive: '#f87171',
  border: 'rgba(255, 255, 255, 0.1)',
  input: 'rgba(255, 255, 255, 0.15)',
  ring: '#dc2626',
  chart1: '#7c3aed',
  chart2: '#10b981',
  chart3: '#c2410c',
  chart4: '#be185d',
  chart5: '#dc2626',
  sidebar: '#1e293b',
  sidebarForeground: '#f8fafc',
  sidebarPrimary: '#dc2626',
  sidebarPrimaryForeground: '#fef2f2',
  sidebarAccent: '#334155',
  sidebarAccentForeground: '#f8fafc',
  sidebarBorder: 'rgba(255, 255, 255, 0.1)',
  sidebarRing: '#dc2626',
  success: '#10b981',
  warning: '#c2410c',
  error: '#f87171',
  tabInactive: '#94a3b8',
  glassGradient: ['rgba(30, 41, 59, 0.8)', 'rgba(51, 65, 85, 0.6)'],
  // Legacy properties
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  inputBackground: '#1e293b',
  placeholder: '#94a3b8',
};

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    spacing,
    borderRadius: 12,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 