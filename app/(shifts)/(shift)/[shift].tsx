import HorizontalDatePicker from "@/components/calender/HorizontalCalender";
import Header from "@/components/header/Header";
import { useAppContext } from "@/context/AppContext";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { format, parseISO } from "date-fns";
import ProfilePicture from "@/assets/icons/ProfilePicture";
import { formatDate } from "@/utils";
// import formatDate from "@/utils/formatDate";

type Props = {};

type Shift = {
  date: string;
  staff: { email: string; firstName: string };
  description: string[];
};
const Shift = (props: Props) => {
  const { showHorizontalCalendar, refreshKey } = useAppContext();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const { authState } = useAuth();
  const { shift } = useLocalSearchParams<any>();
  const [loading, setLoading] = useState(false);

  const dateParams = formatDate(shift);
  // const dateParams = shift;

  const renderShiftInfo = () => {
    const shiftsForDate = shifts.filter(
      (shift) => format(parseISO(shift.date), "yyyy-MM-dd") === dateParams
    );

    if (shiftsForDate.length > 0) {
      const shiftsByStaff = shiftsForDate.reduce<
        Record<string, { staff: Shift["staff"]; shifts: string[][] }>
      >((acc, shift) => {
        if (!acc[shift.staff.email]) {
          acc[shift.staff.email] = {
            staff: shift.staff,
            shifts: [],
          };
        }
        acc[shift.staff.email].shifts.push(shift.description);
        return acc;
      }, {});

      return Object.keys(shiftsByStaff).map((email, index) => {
        const staffShift = shiftsByStaff[email];
        return (
          <View key={index} style={styles.shiftContainer}>
            <View style={styles.flexRow}>
              <View style={styles.flexColumn}>
                <ProfilePicture width={20} />
                <Text style={styles.shiftHeader}>
                  {staffShift.staff.firstName.charAt(0).toUpperCase() +
                    staffShift.staff.firstName.slice(1)}
                </Text>
              </View>

              <View style={styles.flex1}>
                {staffShift.shifts.map((shiftInfoArray, shiftIndex) => (
                  <View style={{ marginLeft: 10 }} key={shiftIndex}>
                    {shiftInfoArray.map((shiftInfo, descriptionIndex) => (
                      <TouchableOpacity
                        key={descriptionIndex}
                        style={styles.shiftTextContainer}
                        onPress={() => console.log(staffShift.staff)}
                      >
                        <Text style={styles.shiftText}>{shiftInfo}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      });
    }

    return (
      <Text style={styles.noShiftsText}>
        There are no shifts on this date that match your filter. {dateParams}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView className="bg-primary pb-10">
        <Header title="runshift" calendar={true} />
      </SafeAreaView>

      {showHorizontalCalendar && (
        <HorizontalDatePicker selectedDate={shift ? new Date(shift) : null} />
      )}

      {loading ? <LoadingSpinner /> : renderShiftInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    backgroundColor: "primary",
    paddingBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexColumn: {
    flexDirection: "column",
    width: "25%",
  },
  flex1: {
    flex: 1,
    borderColor: "#E9E9E9",
  },
  shiftContainer: {
    marginTop: 4,
    padding: 10,
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
  },
  shiftTextContainer: {
    paddingTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  shiftText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  shiftHeader: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  noShiftsText: {
    padding: 16,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
});

export default Shift;
