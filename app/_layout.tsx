import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { View, StyleSheet } from 'react-native';

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

const StackLayout = () => {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <AppProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: styles.container,  // Apply background color to all screens
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(shifts)" />
            <Stack.Screen name="offline" />
            <Stack.Screen name="signUp" />
            <Stack.Screen name="login" />
            <Stack.Screen name="options" />
          </Stack>
        </View>
      </AppProvider>
    </AuthProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
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

  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#175B57',  // Set your desired background color here
  },
});
