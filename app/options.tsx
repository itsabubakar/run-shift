import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHandler } from "react-native";
import { Platform } from "react-native";

type Props = {};

const options = (props: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={[styles.button, styles.filledButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
          <Image
            style={styles.icon}
            source={require("../assets/images/arrow.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.runshift360.com").catch((err) =>
              console.error("An error occurred", err)
            );
          }}
          style={[styles.button, styles.outlinedButton]}
        >
          <Text style={styles.buttonText}>Desktop Site</Text>
          <Image
            style={styles.icon}
            source={require("../assets/images/desktop.png")}
          />
        </TouchableOpacity>

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={[styles.button, styles.outlinedButton]}
            onPress={() => BackHandler.exitApp()}
          >
            <Text style={styles.buttonText}>Exit</Text>
            <Image
              style={styles.icon}
              source={require("../assets/images/arrow.png")}
            />
          </TouchableOpacity>
        )}
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#175B57", // primary
  },
  container: {
    paddingHorizontal: 20,
  },
  button: {
    width: 220,
    height: 90,
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
  filledButton: {
    backgroundColor: "#A4A705", // secondary
    borderColor: "#A4A705",
  },
  outlinedButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.25)",
  },
  buttonText: {
    fontFamily: "PoppinsRegular",
    color: "#FFFFFF",
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default options;
