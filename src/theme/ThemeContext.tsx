import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeColors } from './colors';

type ThemeContextType = {
  theme: ThemeColors;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  // theme is a state that is initially determined by colorScheme. setTheme sets the theme
  const [theme, setTheme] = useState<ThemeColors>(colorScheme === 'dark' ? darkTheme : lightTheme);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  // useEffect is a hook that runs whenever colorScheme changes, as it is passed as a dependency
  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 