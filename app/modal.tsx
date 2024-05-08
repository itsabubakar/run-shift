import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
// import { AuthProvider, useAuth } from '@/context';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const segments = useSegments()
  const router = useRouter()
  // const { authState } = useAuth()


  useEffect(() => {
    // console.log('authState', authState);
    console.log('fuck');

  }, [])

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="index" />
        <Stack.Screen options={{ headerShown: false }} name="(shifts)" />
        <Stack.Screen name="offline" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="login" />
        <Stack.Screen name="options" />
      </Stack>
    </>
  );
}
