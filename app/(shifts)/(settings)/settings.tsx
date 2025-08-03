import Header from "@/components/header/Header";
import CheckBox from "@/components/settings/CheckBox";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { Link, useRouter } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/context/AuthContext";

const Screen = () => {
  const { fontSize, setFontSize, setShowProfilePicture, showProfilePicture } =
    useAppContext();
  const [cameraSetup, setCameraSetup] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState(false);
  const [version] = useState("1.1.1");

  const { onLogout } = useAuth();
  const router = useRouter();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(version);
  };

  const handleReset = () => {
    Alert.alert(
      "Confirm Reset",
      "Are you sure you want to log out and reset the app?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            onLogout?.();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header title="settings" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Font Size Slider */}
        {/* <View style={styles.section}>
          <View style={styles.textWrapper}>
            <Text style={[styles.heading, { fontSize: fontSize! + 10 }]}>
              Font size
            </Text>
            <Text style={[styles.subText, { fontSize: fontSize! + 2 }]}>
              Enhance the text size across the entire app for improved
              visibility.
            </Text>
          </View>

          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={20}
            value={fontSize}
            thumbTintColor="#fefefe"
            minimumTrackTintColor="#21D0C6"
            maximumTrackTintColor="#fefefe"
            onValueChange={(value) => setFontSize!(value)}
          />
        </View> */}

        {/* Camera */}
        <View style={styles.miniSection}>
          <View style={styles.textWrapper}>
            <Text style={[styles.heading, { fontSize: fontSize! + 10 }]}>
              Camera
            </Text>
            <Text style={[styles.subText, { fontSize: fontSize! + 2 }]}>
              Use the Android camera application for taking photos.
            </Text>
          </View>
          <CheckBox
            color="#FFFFFF40"
            isCheck={cameraSetup}
            onChecked={() => setCameraSetup(!cameraSetup)}
          />
        </View>

        {/* Show Profile Picture */}
        <View style={styles.miniSection}>
          <View style={styles.textWrapper}>
            <Text style={[styles.heading, { fontSize: fontSize! + 10 }]}>
              Show profile pictures
            </Text>
            <Text style={[styles.subText, { fontSize: fontSize! + 2 }]}>
              Utilize the Android camera application to capture photos.
            </Text>
          </View>
          <CheckBox
            color="#FFFFFF40"
            isCheck={showProfilePicture}
            onChecked={() => setShowProfilePicture!(!showProfilePicture)}
          />
        </View>

        {/* Reset the App */}
        <View style={styles.section}>
          <View style={styles.textWrapper}>
            <Text style={[styles.heading, { fontSize: fontSize! + 10 }]}>
              Reset the app
            </Text>
            <Text style={[styles.subText, { fontSize: fontSize! + 2 }]}>
              Erase your data from this device and log out.
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={[styles.buttonText, { fontSize: fontSize! + 2 }]}>
              RESET
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={[styles.section, { paddingBottom: 40 }]}>
          <Text style={[styles.heading, { fontSize: fontSize! + 10 }]}>
            Version
          </Text>
          <View style={styles.textWrapper}>
            <Text style={[styles.subText, { fontSize: fontSize! + 2 }]}>
              {version}
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
            <Text style={[styles.buttonText, { fontSize: fontSize! + 2 }]}>
              COPY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175B57", // bg-primary
  },
  headerWrapper: {
    paddingTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  section: {
    marginTop: 40,
    alignItems: "flex-start",
  },
  miniSection: {
    marginTop: 40,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  textWrapper: {
    width: "90%",
  },
  heading: {
    fontFamily: "PoppinsRegular",
    color: "#21D0C6",
    marginBottom: 8,
  },
  subText: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
    lineHeight: 24,
  },
  slider: {
    width: 340,
    height: 80,
  },
  button: {
    marginTop: 20,
    borderColor: "#21D0C6",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "PoppinsRegular",
  },
});
