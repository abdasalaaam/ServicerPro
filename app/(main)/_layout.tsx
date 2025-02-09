import { Stack } from 'expo-router';
import { useTheme } from '../../src/theme/ThemeContext';

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background }
      }}
    >
      <Stack.Screen 
        name="schedule" 
        options={{ 
          headerBackVisible: false,
        }} 
      />
    </Stack>
  );
}
