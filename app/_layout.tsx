import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AppProvider } from '@/context/AppContext';
import { View, StyleSheet } from 'react-native';
import * as SystemUI from 'expo-system-ui';

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync('#175B57')


export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
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
    return null;
  }

  return (
    <AuthProvider>
      
        <AppProvider>
          <View style={styles.container}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: 'green'
                },  // Apply background color to all screens
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(shifts)" />

            </Stack>
          </View>
        </AppProvider>
      
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#175B57',  // Set your desired background color here
  },
});
