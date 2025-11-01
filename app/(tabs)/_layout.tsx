import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="map" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="report" />
      <Stack.Screen name="laporan" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}