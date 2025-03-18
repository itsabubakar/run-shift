import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  Platform,
  Pressable,
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
import ErrorModal from "@/components/login/ErrorModal";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import CheckBox from "@/components/settings/CheckBox";
import React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";
import { usePushNotifications } from "@/hooks";

const BACKEND_URL = "https://your-backend.com/api/save-token"; //

type Props = {};

export enum Role {
  STAFF = "staff",
  ADMIN = "admin",
}

const Index = (props: Props) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorField, setErrorField] = useState("");

  const [loading, setLoading] = useState(false);

  const { setAuthState, authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      setIsBiometricSupported(compatible);
    })();
  });

  const handleNoBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (savedBiometrics)
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password"
      );
  };
  const handleBiometricAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with your finger print",
        cancelLabel: "Cancel", // Optional: custom cancel label
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

  useEffect(() => {
    const checkStoredLogin = async () => {
      const storedEmail = await SecureStore.getItemAsync("email");
      const storedPassword = await SecureStore.getItemAsync("password");

      if (storedEmail && storedPassword) {
        await Login(storedEmail, storedPassword, true); // auto-login
      }
    };

    checkStoredLogin();

    const unsubscribe = NetInfo.addEventListener(
      (state: { isConnected: any; isInternetReachable: any }) => {
        setIsOffline(!(state.isConnected && state.isInternetReachable));
      }
    );

    return () => unsubscribe();
  }, []);

  const Login = async (email: string, password: string, autoLogin = false) => {
    // router.replace("/(shifts)/(shift)/shift");

    if (!email || !password) {
      setErrorField(
        !email ? "Please enter an email address" : "Please enter your password"
      );
      setShowError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/staff/login`, {
        email,
        password,
      });
      console.log(res.data, "shift data");

      if (setAuthState) {
        setAuthState({
          authenticated: true,
          role: res.data.role,
          email: email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          token: res.data.token,
          companyId: res.data.company.id,
          shift: res.data.shift,
          staffId: res.data.shift[0].staffId,
        });
      }

      if (isChecked && !autoLogin) {
        await SecureStore.setItemAsync("email", email);
        await SecureStore.setItemAsync("password", password);
      }

      router.replace("/(shifts)/(shift)/shift");
    } catch (error) {
      console.error(error, " erroring here");
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorField("Invalid email or password");
          setShowError(true);
        } else {
          setErrorField("An error occurred. Please try again later.");
          setShowError(true);
        }
      } else {
        setErrorField("An error occurred. Please try again later.");
        setShowError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const resetError = () => {
    setShowError(false);
    setErrorField("");
  };

  const { expoPushToken, notification } = usePushNotifications();

  console.log(expoPushToken, "expoPushToken");

  async function sendTokenToBackend(token: any) {
    try {
      const response = await fetch("http://192.168.188.163:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      console.log("Backend response:", result);
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  }

  return (
    <>
      {!isOffline ? (
        <KeyboardAwareScrollView
          className={`${showError ? "bg-primary" : "bg-primary"}`}
          style={styles.flexContainer}
          resetScrollToCoords={{ x: 0, y: 0 }}
          // scrollEnabled={false}
        >
          <SafeAreaView
            style={styles.flexContainer}
            className={`flex-1   justify-between `}
          >
            <View className="flex-col flex-1 justify-center items-center pt-[35%]">
              <View className="pb-8  w-full max-w-[308px] mx-auto">
                <Image className="w-[83px] object-cover" source={logoSm} />
              </View>
              <TextInput
                style={styles.poppinsRegular}
                onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
                placeholderTextColor="#c2c2c2"
                className="border border-[#FFF]/25 rounded-2xl py-3 px-3 placeholder:text-lg text-white max-w-[308px] min-w-[308px]"
                placeholder="Email address"
              />

              <View className=" border border-[#ffffff]/25 rounded-2xl flex flex-row items-center justify-between w-full mt-5 py-3 px-3 max-w-[308px] min-w-[308px]">
                <TextInput
                  style={styles.poppinsRegular}
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
                  className="  w-[80%] placeholder:text-lg  text-white "
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {passwordVisible ? <EyeClose /> : <EyeOpen />}
                </TouchableOpacity>
              </View>

              {/* <Pressable
                onPress={handleBiometricAuth}
                className="pt-4 max-w-[308px] w-full  px-2"
              >
                <Text
                  style={styles.poppinsRegular}
                  className="text-white text-left"
                >
                  Log in with fingerprint?
                </Text>
              </Pressable> */}

              <View className="pt-8 pb-10 max-w-[308px] w-full flex-row items-center justify-between px-2">
                <Text
                  style={styles.poppinsRegular}
                  className="text-white text-left text-lg"
                >
                  Keep me logged in
                </Text>
                <CheckBox
                  color={"#FFFFFF40"}
                  isCheck={isChecked}
                  onChecked={() => setChecked(!isChecked)}
                />
              </View>

              <View>
                <TouchableOpacity onPress={() => Login(email, password)}>
                  <Text
                    style={styles.poppinsRegular}
                    className="text-center bg-secondary py-4  text-lg rounded-2xl max-w-[308px] min-w-[308px] text-white"
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="pt-8 pb-10 max-w-[308px] w-full">
                <Link
                  href={"/reset"}
                  style={styles.poppinsRegular}
                  className="text-white text-lg"
                >
                  Forgotten your password?
                </Link>
              </View>
            </View>

            <View className="flex justify-end items-end pr-8 pb-8">
              <Link href={"/options"} asChild>
                <TouchableOpacity>
                  {/* Change to an icon */}
                  <Image source={require("../assets/images/LoginMenu.png")} />
                </TouchableOpacity>
              </Link>
            </View>

            {/* Shows error if any */}

            {showError && (
              <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                <View className=" h-[67%]  bottom-0 w-full rounded-t-[20px] justify-center items-center"></View>
                <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center items-center">
                  <Text
                    style={styles.poppinsRegular}
                    className="text-white text-2xl pb-8 text-center -mt-[500px] max-w-[208px]"
                  >
                    {errorField}
                  </Text>
                  <TouchableOpacity onPress={resetError}>
                    {/* Change to an icon */}
                    <Image className="w-[51px] object-cover" source={tick} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <StatusBar style="auto" />
          </SafeAreaView>
          {/* Loading spinner */}
        </KeyboardAwareScrollView>
      ) : (
        <>
          <SafeAreaView className="flex-1  bg-primary">
            <View className="pb-8 pt-24  w-full max-w-[308px] mx-auto">
              <Image className="w-[213px] object-cover" source={offline} />
            </View>

            <View className="flex-1 max-w-[308px] mx-auto">
              <View>
                <Text
                  style={styles.poppinsSemiBold}
                  className="text-white  text-4xl pb-8"
                >
                  You are offline
                </Text>
                <Text
                  style={styles.poppinsRegular}
                  className="text-white text-lg"
                >
                  We are not able to connect to the internet from your device.
                  Please check your settings and try again.
                </Text>
              </View>
            </View>
            <StatusBar style="auto" />
          </SafeAreaView>
        </>
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
  },
});

export default Index;
