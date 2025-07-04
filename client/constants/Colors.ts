import { useColorScheme } from '@/hooks/useColorScheme';
import { Background } from '@react-navigation/elements';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    safeAreaBg: '#fff',
    background: 'rgb(250,250,250)',
    // background: '#fff',
    // safeAreaBg:'rgb(214, 214, 214)',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    safeAreaBg: '#000',
    background: 'rgb(22, 22, 22)',
    // background: '#000',
    // safeAreaBg: 'rgb(22, 22, 22)',
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