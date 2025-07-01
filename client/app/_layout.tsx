import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '@/global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { useCounterStore } from '@/store/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const { isLoggedIn } = useCounterStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.safeAreaBg }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown: false}}>
          {!isLoggedIn ? (
            <Stack.Screen name="login" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaView>
  );
}
