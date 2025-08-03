import Header from "@/components/header/Header";
import CheckBox from "@/components/settings/CheckBox";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header title="weather settings" moreOptions />
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Weather forecast */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionText}>
            <Text style={[styles.poppinsRegular, styles.sectionTitle]}>
              Weather forecast
            </Text>
            <Text style={[styles.poppinsRegular, styles.sectionDesc]}>
              Display the predicted temperature and weather conditions on the
              schedule when the forecast information is accessible.
            </Text>
          </View>

          <CheckBox
            color="#FFFFFF40"
            isCheck={isChecked}
            onChecked={() => setChecked(!isChecked)}
          />
        </View>

        {/* Weather dependent sections */}
        <View style={[styles.forecastDetails, !isChecked && styles.disabled]}>
          {/* Location */}
          <View style={styles.section}>
            <Text style={[styles.poppinsRegular, styles.sectionTitle]}>
              Weather forecast location
            </Text>
            <Text style={[styles.poppinsRegular, styles.sectionDesc]}>
              If you do not provide a valid location below we will try to detect
              your location using GPS and your IP address.
            </Text>
            <Text style={[styles.poppinsRegular, styles.inputPlaceholder]}>
              City, country
            </Text>
          </View>

          {/* Wind info */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionText}>
              <Text style={[styles.poppinsRegular, styles.sectionTitle]}>
                Wind information
              </Text>
              <Text style={[styles.poppinsRegular, styles.sectionDesc]}>
                Show forecasted wind speeds and directions where possible.
              </Text>
            </View>
            <CheckBox
              color="#FFFFFF40"
              isCheck={isChecked}
              onChecked={() => setChecked(!isChecked)}
            />
          </View>

          {/* Temperatures */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionText}>
              <Text style={[styles.poppinsRegular, styles.sectionTitle]}>
                Temperatures
              </Text>
              <Text style={[styles.poppinsRegular, styles.sectionDesc]}>
                Show forecasted day and night temperatures where possible.
              </Text>
            </View>
            <CheckBox
              color="#FFFFFF40"
              isCheck={isChecked}
              onChecked={() => setChecked(!isChecked)}
            />
          </View>

          {/* Metric units */}
          <View style={styles.sectionRowLast}>
            <View style={styles.sectionText}>
              <Text style={[styles.poppinsRegular, styles.sectionTitle]}>
                Display the weather using metric units
              </Text>
              <Text style={[styles.poppinsRegular, styles.sectionDesc]}>
                To display the weather in degrees celsius, tick this option. To
                display the weather using fahrenheit, untick this option.
              </Text>
            </View>
            <CheckBox
              color="#FFFFFF40"
              isCheck={isChecked}
              onChecked={() => setChecked(!isChecked)}
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F766E",
  },
  headerWrapper: {
    paddingTop: 16,
  },
  scrollView: {
    paddingHorizontal: 24,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 32,
  },
  sectionRowLast: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 32,
  },
  section: {
    paddingTop: 32,
  },
  sectionText: {
    width: "90%",
  },
  sectionTitle: {
    color: "#21D0C6",
    fontSize: 24,
    paddingBottom: 8,
    lineHeight: 32,
  },
  sectionDesc: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  inputPlaceholder: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF9F1C",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: "white",
  },
  forecastDetails: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default Screen;
