import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '@/global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/constants/Colors';
import { userStore } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import storage from '@/storage/storage';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const {setUser}=userStore();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loggedIn = await storage.load({ key: 'isLoggedIn' });
        if (loggedIn) {
          setIsLoggedIn(true);
          const userData = await storage.load({ key: 'user' });
          setUser(userData); // store it in Zustand or Context
          try {
            const response=await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/me/?email=${userData.email}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const json=await response.json();
            setUser(json.data);
          } catch (error) {
            
          }
          // optionally fetch fresh user data from backend and update
          // const response = await axios.get('/user/me')
          // setUser(response.data)
        }
      } catch (err) {
        console.log('User not logged in or storage error:', err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) return null; // or splash screen while checking

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.safeAreaBg }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="login" />
            ) : (
              <Stack.Screen name="(tabs)" />
            )}
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
