
import React from 'react';
import { ThemeProvider as CustomThemeProvider } from '../contexts/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({ 
  children, 
  attribute = "class", 
  defaultTheme = "system", 
  enableSystem = true 
}: ThemeProviderProps) {
  return (
    <CustomThemeProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </CustomThemeProvider>
  );
}
