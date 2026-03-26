// app/_layout.tsx
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { defaultConfig } from '@tamagui/config/v5';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui'; // ✅ Ajouter
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createTamagui, TamaguiProvider, View } from 'tamagui';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

// ✅ Set le background au niveau système immédiatement
SystemUI.setBackgroundColorAsync(Colors.light.background);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.light.background }} />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // ✅ Créer un thème personnalisé avec ton background
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: Colors.light.background, // Ta couleur de fond
      card: Colors.light.background,
    },
  };

  const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.light.background,
      card: Colors.light.background,
    },
  };
  const queryClient = useQueryClient()
  const config = createTamagui(defaultConfig)
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
        <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
          <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <Stack
              screenOptions={{
                headerShown: false,
                // ✅ Fond de tous les écrans
                contentStyle: {
                  backgroundColor: Colors.light.background
                },
              }}
            >
              <Stack.Screen name="(public)/index" />
              <Stack.Screen name="(public)/case/[id]" />
            </Stack>
          </View>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
