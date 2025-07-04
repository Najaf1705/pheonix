import React from 'react';
import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text as DefaultText, TextProps, View } from 'react-native';
import { userStore } from '@/store/store';

const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <DefaultText style={[{ fontFamily: 'SpaceMono' }, style]} {...props} />;
};

const StartPage = () => {
  const { isLoggedIn } = userStore();

  console.log(isLoggedIn);

  // Load the Kanchenjunga font
  const [fontsLoaded] = useFonts({
    'Kanchenjunga-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    // 'Kanchenjunga-SemiBold': require('../assets/fonts/SpaceMono-SemiBold.ttf'),
    // 'Kanchenjunga-Bold': require('../assets/fonts/SpaceMono-Bold.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  }

    return isLoggedIn ? <Redirect href="/(tabs)"/> : <Redirect href="/login" />;


};

export default StartPage;