import React, { createContext, useContext, ReactNode } from 'react';
import { darkTheme, Theme } from './theme';

const ThemeContext = createContext<Theme>(darkTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={darkTheme}>
      {children}
    </ThemeContext.Provider>
  );
}; 