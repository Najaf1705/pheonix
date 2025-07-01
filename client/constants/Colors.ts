import { useColorScheme } from '@/hooks/useColorScheme';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    safeAreaBg:'rgb(214, 214, 214)',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    safeAreaBg: 'rgb(22, 22, 22)',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Add this hook:
export function useColors() {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}