import { useFonts } from "expo-font";
import { Slot } from "expo-router"; // Import Slot
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { View, StyleSheet } from "react-native";
import * as SystemUI from "expo-system-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#175B57");

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
  });

  const [isLayoutReady, setIsLayoutReady] = useState(false); // Track if layout is ready

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setIsLayoutReady(true); // Mark layout as ready after fonts are loaded
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <View style={styles.container}>
            {/* Render a Slot to initialize the navigation system */}
            <Slot />
          </View>
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175B57", // Set your desired background color here
  },
});
