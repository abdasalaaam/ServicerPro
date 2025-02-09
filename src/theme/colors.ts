// Base palette - raw color values
const palette = {
  navy: '#0A2540',
  lightGray: '#F5F5F5',
  darkGray: '#2B2B2B',
  orange: '#FF6F3C',
  white: '#FFFFFF',
  black: '#000000',
  darkNavy: '#040D21',
  charcoal: '#444444',
  silver: '#CCCCCC',
} as const;

// Define the theme structure type
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
};

// Semantic color roles for light theme
export const lightTheme: ThemeColors = {
  primary: palette.navy,
  secondary: palette.lightGray,
  accent: palette.orange,
  background: palette.white,
  text: palette.black,
  textSecondary: palette.charcoal,
};

// Semantic color roles for dark theme
export const darkTheme: ThemeColors = {
  primary: palette.navy,
  secondary: palette.darkGray,
  accent: palette.orange,
  background: palette.darkNavy,
  text: palette.white,
  textSecondary: palette.silver,
};

// Export both themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

// We'll expand this in the next step 