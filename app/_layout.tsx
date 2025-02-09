import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after our app is ready.
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

// Separate out the actual stack into its own component so we can use our theme
function RootStack() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar 
        style={isDarkMode ? 'light' : 'dark'} 
        backgroundColor={theme.background} 
        translucent={false}
      />

      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        {/* If your expo-router structure is correct, these represent nested routes */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </>
  );
}
