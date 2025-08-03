import Exclamination from "@/assets/icons/Exclamination";
import Letter from "@/assets/icons/Letter";
import Header from "@/components/header/Header";
import { useAppContext } from "@/context/AppContext";
import { usePushNotifications } from "@/hooks";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Screen = (props: Props) => {
  const { fontSize } = useAppContext();

  const openEmailApp = () => {
    const email = "info@pedagogichub.com";
    const subject = "Bug Report";
    const body = "Please describe the bug you encountered:";
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch((err) =>
      console.error("Error opening email app:", err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="report a bug" />

      <View style={styles.messageBox}>
        <Text
          style={[
            styles.poppinsRegular,
            styles.messageText,
            { fontSize: fontSize! + 2 },
          ]}
        >
          Please email us at info@pedagogic.com with the error details and we
          will get back to you as soon as possible
        </Text>
        <View style={styles.exclamationIcon}>
          <Exclamination />
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text
          style={[
            styles.poppinsRegular,
            styles.infoText,
            { fontSize: fontSize! + 2 },
          ]}
        >
          Have questions about this app? Feel free to reach out to our support
          team, available online from 12 am to 10 pm (GMT), Monday through
          Friday. If it's outside these hours, you can still leave them a
          message at any time.
        </Text>
      </View>

      <TouchableOpacity onPress={openEmailApp} style={styles.emailButton}>
        <Letter />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175B57", // Tailwind "bg-primary" approximation
  },
  messageBox: {
    marginHorizontal: 24,
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  messageText: {
    color: "black",
  },
  exclamationIcon: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  infoBox: {
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  infoText: {
    color: "white",
  },
  emailButton: {
    marginTop: "auto",
    backgroundColor: "#27736E",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 24,
    marginBottom: 40,
    padding: 16,
    borderRadius: 12,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
    lineHeight: 24,
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default Screen;
