import Header from "@/components/header/Header";
import { useAppContext } from "@/context/AppContext";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const { fontSize } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="terms and conditions" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            Welcome to Run Shift. These Terms and Conditions ("Terms", "Terms
            and Conditions") govern your relationship with the Run Shift mobile
            application (the "Service") operated by Logos360 ("us", "we", or
            "our").
          </Text>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            Please read these Terms and Conditions carefully before using our
            Run Shift app.
          </Text>
        </View>

        {/* Terms Sections */}
        {terms.map(({ title, content }, index) => (
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

        {/* Final Acknowledgement */}
        <View style={styles.section}>
          <Text style={[styles.paragraph, { fontSize: fontSize! + 2 }]}>
            By using Run Shift, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and Conditions.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const terms = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By downloading, accessing, or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.",
    ],
  },
  {
    title: "2. User Accounts",
    content: [
      "To use certain features of the Service, you may be required to create an account. You must provide accurate, current, and complete information during the registration process and keep your account information updated. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.",
    ],
  },
  {
    title: "3. Use of the Service",
    content: [
      "You agree not to use the Service for any illegal or unauthorized purpose.",
      "You must not, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).",
      "You agree to use the Service only for lawful purposes.",
    ],
  },
  {
    title: "4. Content",
    content: [
      "You are responsible for the content you post on the Service, including its legality, reliability, and appropriateness. By posting content on the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service.",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "The Service and its original content, features, and functionality are and will remain the exclusive property of Logos360 and its licensors. The Service is protected by copyright, trademark, and other laws of both your country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Logos360.",
    ],
  },
  {
    title: "6. Termination",
    content: [
      "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "In no event shall Logos360, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Service; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.",
    ],
  },
  {
    title: "8. Changes",
    content: [
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
    ],
  },
  {
    title: "9. Contact Us",
    content: [
      "If you have any questions about these Terms, please contact us at info@pedagogichub.com.",
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#175B57", // bg-primary
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
