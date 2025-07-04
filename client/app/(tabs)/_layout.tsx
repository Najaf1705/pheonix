import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColors } from '@/constants/Colors';
import { Box, Home, Settings } from 'lucide-react-native';
import Header from '@/components/Header';

const headTitles: Record<string, string> = {
  index: 'Dashboard',
  shipment: 'Shipment History',
  settings: 'Settings',
}

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        // headerShown: false,
        header: ({ route }) => (
          <Header title={headTitles[route.name] || route.name.charAt(0).toUpperCase() + route.name.slice(1)} />
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            paddingTop: 4,
            marginBottom: -45,
            backgroundColor: colors.safeAreaBg,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Home size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shipment"
        options={{
          title: 'Shipment',
          tabBarIcon: ({ color }) => (
            <Box size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Settings size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
