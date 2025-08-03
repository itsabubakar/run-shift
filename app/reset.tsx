import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {};

const Reset = (props: Props) => {
  const [passwordReset, setPasswordReset] = useState(false);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: passwordReset ? "#175b57" : "#0F766E" },
      ]}
    >
      <View style={styles.centeredView}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/logo-sm.png")}
          />
        </View>

        {/* Password Inputs */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.poppinsRegular, styles.textInput]}
            placeholderTextColor="#FFF"
            placeholder="Input new password"
          />
          <TouchableOpacity>
            <Image
              style={styles.eyeIcon}
              resizeMode="contain"
              source={require("../assets/images/eye.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.poppinsRegular, styles.textInput]}
            placeholderTextColor="#FFF"
            placeholder="Input new password"
          />
          <TouchableOpacity>
            <Image
              style={styles.eyeIcon}
              resizeMode="contain"
              source={require("../assets/images/eye.png")}
            />
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <Link href={"/"} asChild>
          <TouchableOpacity
            onPress={() => setPasswordReset(true)}
            style={styles.resetButton}
          >
            <Text style={[styles.poppinsRegular, styles.resetText]}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Overlay after password reset */}
      {passwordReset && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={[styles.poppinsRegular, styles.successText]}>
              Password reset successful
            </Text>
            <TouchableOpacity onPress={() => setPasswordReset(false)}>
              <Image
                style={styles.tickIcon}
                resizeMode="contain"
                source={require("../assets/images/Tick.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    paddingBottom: 32,
    width: 308,
    alignSelf: "center",
  },
  logo: {
    width: 83,
    height: 40,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 308,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 20,
  },
  textInput: {
    width: "80%",
    fontSize: 18,
    color: "#FFF",
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  resetButton: {
    marginTop: 96,
    backgroundColor: "#FF9F1C", // secondary
    paddingVertical: 16,
    borderRadius: 16,
    width: 308,
    alignItems: "center",
  },
  resetText: {
    color: "white",
    fontSize: 18,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#000000b0",
    justifyContent: "flex-end",
  },
  overlayContent: {
    backgroundColor: "#0F766E", // primary
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  successText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
    maxWidth: 208,
  },
  tickIcon: {
    width: 51,
    height: 51,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default Reset;
