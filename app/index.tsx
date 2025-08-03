import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import EyeOpen from "@/assets/icons/EyeOpen";
import EyeClose from "@/assets/icons/EyeClose";
import { useAuth } from "@/context/AuthContext";
import { logoSm, offline, tick } from "@/assets/images";
import axiosInstance from "@/services";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import CheckBox from "@/components/settings/CheckBox";
import React from "react";
import * as LocalAuthentication from "expo-local-authentication";

import { usePushNotifications } from "@/hooks";
import { sendToken } from "@/api/notifications";

type Props = {};

export enum Role {
  STAFF = "staff",
  ADMIN = "admin",
}

const Index = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorField, setErrorField] = useState("");
  const [loading, setLoading] = useState(false);

  const { expoPushToken } = usePushNotifications();
  const { setAuthState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  useEffect(() => {
    const checkStoredLogin = async () => {
      const storedEmail = await SecureStore.getItemAsync("email");
      const storedPassword = await SecureStore.getItemAsync("password");
      if (storedEmail && storedPassword) {
        await Login(storedEmail, storedPassword, true);
      }
    };

    checkStoredLogin();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!(state.isConnected && state.isInternetReachable));
    });

    return () => unsubscribe();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with your finger print",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });

      if (biometricAuth.success) {
        console.log("Authenticated successfully!");
        await SecureStore.setItemAsync("email", email);
        await SecureStore.setItemAsync("password", password);
        router.replace("/(shifts)/(shift)/shift");
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error during biometric authentication:", error);
    }
  };

  const handleNotification = async (staffId: any, token: any) => {
    try {
      await sendToken(staffId, token);
    } catch (error) {
      console.error(error);
    }
  };

  const Login = async (email: string, password: string, autoLogin = false) => {
    if (!email || !password) {
      setErrorField(
        !email ? "Please enter an email address" : "Please enter your password"
      );
      setShowError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/staff/login`, { email, password });

      if (setAuthState) {
        setAuthState({
          authenticated: true,
          role: res.data.role,
          email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          token: res.data.token,
          companyId: res.data.company.id,
          shift: res.data.shift,
          staffId: res.data.shift[0].staffId,
          acceptedShifts: res.data.acceptedShifts,
        });
      }

      handleNotification(res.data.shift[0].staffId, expoPushToken?.data);

      if (isChecked && !autoLogin) {
        await SecureStore.setItemAsync("email", email);
        await SecureStore.setItemAsync("password", password);
      }

      router.replace("/(shifts)/(shift)/shift");
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorField("Invalid email or password");
        } else {
          setErrorField("An error occurred. Please try again later.");
        }
      } else {
        setErrorField("An error occurred. Please try again later.");
      }
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const resetError = () => {
    setShowError(false);
    setErrorField("");
  };

  return (
    <>
      {!isOffline ? (
        <KeyboardAwareScrollView contentContainerStyle={styles.flexContainer}>
          <SafeAreaView style={styles.flexContainer}>
            <View style={styles.centeredContainer}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logoSm} />
              </View>

              <TextInput
                style={[styles.input, styles.poppinsRegular]}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                placeholderTextColor="#c2c2c2"
                placeholder="Email address"
              />

              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.passwordInput, styles.poppinsRegular]}
                  placeholderTextColor="#c2c2c2"
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  selectionColor="white"
                  maxLength={32}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {passwordVisible ? <EyeClose /> : <EyeOpen />}
                </TouchableOpacity>
              </View>

              <View style={styles.checkboxRow}>
                <Text style={[styles.poppinsRegular, styles.checkboxLabel]}>
                  Keep me logged in
                </Text>
                <CheckBox
                  color="#FFFFFF40"
                  isCheck={isChecked}
                  onChecked={() => setChecked(!isChecked)}
                />
              </View>

              <TouchableOpacity onPress={() => Login(email, password)}>
                <Text style={[styles.loginButton, styles.poppinsRegular]}>
                  Log in
                </Text>
              </TouchableOpacity>

              {/* <View style={styles.resetLinkContainer}>
                <Link href={"/reset"} style={styles.poppinsRegular}>
                  <Text style={styles.resetLink}>Forgotten your password?</Text>
                </Link>
              </View> */}
            </View>

            <View style={styles.optionsIconContainer}>
              <Link href={"/options"} asChild>
                <TouchableOpacity>
                  <Image source={require("../assets/images/LoginMenu.png")} />
                </TouchableOpacity>
              </Link>
            </View>

            {showError && (
              <View style={styles.errorOverlay}>
                <View style={styles.errorContent}>
                  <Text style={[styles.errorText, styles.poppinsRegular]}>
                    {errorField}
                  </Text>
                  <TouchableOpacity onPress={resetError}>
                    <Image style={styles.tickIcon} source={tick} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <StatusBar style="auto" />
          </SafeAreaView>
        </KeyboardAwareScrollView>
      ) : (
        <SafeAreaView style={styles.offlineContainer}>
          <View style={styles.offlineImageContainer}>
            <Image style={styles.offlineImage} source={offline} />
          </View>

          <View style={styles.offlineTextContainer}>
            <Text style={[styles.poppinsSemiBold, styles.offlineTitle]}>
              You are offline
            </Text>
            <Text style={[styles.poppinsRegular, styles.offlineMessage]}>
              We are not able to connect to the internet from your device.
              Please check your settings and try again.
            </Text>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      )}

      {loading && <LoadingSpinner />}
    </>
  );
};

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
  flexContainer: {
    flex: 1,
    backgroundColor: "#175B57",
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "35%",
  },
  logoContainer: {
    paddingBottom: 32,
    width: "100%",
    maxWidth: 308,
    alignSelf: "center",
  },
  logo: {
    width: 83,
    resizeMode: "contain",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#FFFFFF",
    width: 308,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 12,
    width: 308,
    marginTop: 20,
  },
  passwordInput: {
    width: "80%",
    fontSize: 16,
    color: "white",
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 308,
    paddingVertical: 24,
  },
  checkboxLabel: {
    color: "white",
    fontSize: 18,
  },
  loginButton: {
    textAlign: "center",
    backgroundColor: "#A4A705",
    paddingVertical: 16,
    fontSize: 18,
    borderRadius: 16,
    color: "white",
    width: 308,
  },
  resetLinkContainer: {
    paddingVertical: 24,
    width: 308,
  },
  resetLink: {
    color: "white",
    fontSize: 18,
  },
  optionsIconContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingRight: 32,
    paddingBottom: 32,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorContent: {
    backgroundColor: "#175B57",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    padding: 32,
    width: "100%",
    // height: 200,
    marginTop: "auto",
  },
  errorText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    maxWidth: 208,
    marginBottom: 16,
  },
  tickIcon: {
    width: 51,
    resizeMode: "contain",
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: "#A4A705",
  },
  offlineImageContainer: {
    paddingBottom: 32,
    paddingTop: 96,
    alignItems: "center",
  },
  offlineImage: {
    width: 213,
    resizeMode: "contain",
  },
  offlineTextContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  offlineTitle: {
    fontSize: 32,
    color: "white",
    paddingBottom: 16,
  },
  offlineMessage: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default Index;
