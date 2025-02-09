import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen 
        name="phone" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="verify" 
        options={{
          headerTitle: "Verification",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
} 