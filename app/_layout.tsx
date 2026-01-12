import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NavigationShell from "@/shared/navigation/NavigationShell";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { useFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationShell>
          </NavigationShell>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
