import { View, Text, StyleSheet } from "react-native";

type Props = {};

const Calender = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.poppinsRegular, styles.monthTitle]}>
          FEBRUARY 2024
        </Text>
        <View style={styles.daysRow}>
          <View style={styles.activeDayBox}>
            <Text style={[styles.poppinsRegular, styles.dayOfWeek]}>FR</Text>
            <Text style={[styles.poppinsRegular, styles.activeDayNumber]}>
              23
            </Text>
          </View>
          {["SA", "SU", "SU", "MO"].map((day, index) => (
            <View key={index} style={styles.dayBox}>
              <Text style={[styles.poppinsRegular, styles.dayOfWeek]}>
                {day}
              </Text>
              <Text style={[styles.poppinsRegular, styles.dayNumber]}>23</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.dividerSection}>
        <Text style={[styles.poppinsRegular, styles.monthTitle]}>
          MARCH 2024
        </Text>
        <View style={styles.daysRow}>
          {["FR", "SA", "SU"].map((day, index) => (
            <View key={index} style={styles.dayBox}>
              <Text style={[styles.poppinsRegular, styles.dayOfWeek]}>
                {day}
              </Text>
              <Text style={[styles.poppinsRegular, styles.dayNumber]}>23</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
  container: {
    backgroundColor: "#1D504D",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: -48,
  },
  monthTitle: {
    color: "white",
    paddingBottom: 12,
  },
  daysRow: {
    flexDirection: "row",
    gap: 8,
  },
  dayBox: {
    borderRadius: 12,
    alignItems: "center",
  },
  activeDayBox: {
    backgroundColor: "#FFFFFF40",
    borderRadius: 12,
    alignItems: "center",
  },
  dayOfWeek: {
    color: "#FFFFFF99",
    padding: 8,
  },
  dayNumber: {
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeDayNumber: {
    backgroundColor: "#FF9F1C", // Assuming this is your "secondary" color
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dividerSection: {
    borderLeftWidth: 1,
    borderLeftColor: "#6B7280", // Tailwind's gray-500
    paddingLeft: 16,
  },
});
