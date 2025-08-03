import Header from "@/components/header/Header";
import { useAppContext } from "@/context/AppContext";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { fontSize } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="privacy policy" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={styles.section}>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            This Privacy Policy describes how Logos360 ("we," "us," or "our")
            collects, uses, and discloses your information through our Run Shift
            app (the "App").
          </Text>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            Please read these carefully before using our Run Shift app.
          </Text>
        </View>

        {/* Policy Sections */}
        {privacySections.map(({ title, content }, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.heading, { fontSize: fontSize! + 4 }]}>
              {title}
            </Text>
            {content.map((line, i) => (
              <Text
                key={i}
                style={[styles.paragraphIndented, { fontSize: fontSize! + 2 }]}
              >
                {line}
              </Text>
            ))}
          </View>
        ))}

        {/* Footer */}
        <View style={styles.section}>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            This Privacy Policy is effective as of June 18, 2024.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const privacySections = [
  {
    title: "1. Information We Collect",
    content: [
      "User Information: We collect user information such as your name, email address, and phone number (optional) when you register for an account.",
      "Usage Data: We collect usage data such as how you use the App, including the features you access, the frequency of your use, and the device you use to access the App.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We collect and use your information to operate the Run Shift app, manage your account, send you updates, improve our services, and comply with legal obligations.",
    ],
  },
  {
    title: "3. Sharing Your Information",
    content: [
      "We may share your information with third-party service providers who help us operate the App, such as data storage providers and analytics providers. We will only share your information with these providers to the extent necessary to perform their services.",
      "We will not share your information with any third-party for marketing purposes without your consent.",
    ],
  },
  {
    title: "4. Data Security",
    content: [
      "We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage is ever completely secure. We cannot guarantee the security of your information.",
    ],
  },
  {
    title: "5. Your Choices",
    content: [
      "You can access and update your information in the App settings.",
    ],
  },
  {
    title: "6. Children's Privacy",
    content: [
      "Our App is not directed to children under the age of 13. We do not knowingly collect information from children under 13. If you are a parent or guardian and you believe your child has provided us with information, please contact us. We will take steps to remove the information from our servers.",
    ],
  },
  {
    title: "7. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the App.",
    ],
  },
  {
    title: "8. Contact Us",
    content: [
      "If you have any questions about these Terms, please contact us at info@pedagogichub.com.",
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175B57", // assuming this is your primary color
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  section: {
    paddingTop: 16,
  },
  heading: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    paddingBottom: 8,
  },
  paragraph: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    marginBottom: 12,
    lineHeight: 24,
  },
  paragraphIndented: {
    color: "#ffffff",
    fontFamily: "PoppinsRegular",
    paddingLeft: 8,
    marginBottom: 8,
    lineHeight: 24,
  },
});

export default Screen;
