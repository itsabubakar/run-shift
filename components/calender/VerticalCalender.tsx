import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { format, addDays, subDays, isToday } from "date-fns";
import { useAppContext } from "@/context/AppContext";
import ProfilePicture from "@/assets/icons/ProfilePicture";
import { FlashList } from "@shopify/flash-list";
import { useAuth } from "@/context/AuthContext";

interface Shift {
  id: string;
  date: string;
  time?: string;
  description: string[];
  staffId: string;
  staff: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface Props {
  shifts: Shift[];
}

const VerticalDatePicker: React.FC<Props> = ({ shifts }) => {
  const { emailFilter } = useAppContext();
  const [dates, setDates] = useState<Date[]>([]);
  const flatListRef = useRef<FlashList<Date>>(null);
  const today = new Date();
  const { authState } = useAuth();

  useEffect(() => {
    if (shifts) {
      const pastDates = Array.from({ length: 10000 }).map((_, index) =>
        subDays(today, 10000 - index)
      );
      const futureDates = Array.from({ length: 10000 }).map((_, index) =>
        addDays(today, index + 1)
      );
      const initialDates = [...pastDates, today, ...futureDates];
      setDates(initialDates);

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 10000, animated: false });
      }, 10);
    }
  }, [shifts]);

  const renderShiftInfo = useCallback(
    (date: Date) => {
      const formattedCurrentDate = format(date, "MM-dd-yyyy");

      const normalShifts = authState?.shift?.filter(
        (shift) =>
          shift.date === formattedCurrentDate &&
          (!emailFilter || shift.staff?.email === emailFilter)
      );

      const acceptedShifts = authState?.acceptedShifts?.filter(
        (shift) => shift.date === formattedCurrentDate
      );

      const hasAnyShifts =
        (normalShifts?.length || 0) + (acceptedShifts?.length || 0) > 0;

      if (!hasAnyShifts) {
        return <Text style={styles.shiftText}>No Shifts</Text>;
      }

      return (
        <>
          {normalShifts?.map((shift, index) => (
            <View
              key={`normal-${shift.id}-${index}`}
              style={styles.shiftContainer}
            >
              <View style={styles.shiftRow}>
                <View style={styles.shiftColumn}>
                  <ProfilePicture width={20} />
                  <Text style={[styles.shiftHeader, styles.mtNegative]}>
                    {authState?.firstName} {authState?.lastName}
                  </Text>
                </View>
                <View style={styles.shiftDescription}>
                  <TouchableOpacity style={styles.fullWidth}>
                    <Text style={styles.shiftText}>
                      {shift.description?.join(", ") || "No description"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {acceptedShifts?.map((shift, index) => (
            <View
              key={`accepted-${shift.id}-${index}`}
              style={[styles.shiftContainer, styles.acceptedShift]}
            >
              <View style={styles.shiftRow}>
                <View style={styles.shiftColumn}>
                  <ProfilePicture width={20} />
                  <Text style={[styles.shiftHeader, styles.mtNegative]}>
                    {authState?.firstName} {authState?.lastName}
                  </Text>
                </View>
                <View style={styles.shiftDescription}>
                  <TouchableOpacity style={styles.fullWidth}>
                    <Text style={styles.acceptedShiftText}>
                      Accepted Shift at {shift.time}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </>
      );
    },
    [authState, emailFilter]
  );

  const renderItem = useCallback(
    ({ item }: { item: Date }) => (
      <View
        style={[styles.dateContainer, isToday(item) && styles.selectedDate]}
      >
        <View style={[styles.row, isToday(item) && styles.selectedDay]}>
          <Text style={[styles.dateText, styles.textPrimary]}>
            {format(item, "EEE")}
          </Text>
          <Text style={styles.textPrimary}>{format(item, "d")}</Text>
          <Text style={[styles.dateText, styles.textPrimary]}>
            {format(item, "MMM")}
          </Text>
        </View>
        {renderShiftInfo(item)}
      </View>
    ),
    [renderShiftInfo]
  );

  return (
    <View style={styles.container}>
      <FlashList
        ref={flatListRef}
        data={dates}
        keyExtractor={(item) => item.toISOString()}
        renderItem={renderItem}
        estimatedItemSize={160}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToIndex({ index: 10000, animated: false });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    borderRadius: 24,
    flex: 1,
  },
  dateContainer: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    minHeight: 160,
  },
  selectedDate: {
    borderRadius: 14,
  },
  selectedDay: {
    borderBottomColor: "#175B57",
    borderBottomWidth: 1,
  },
  dateText: {
    fontFamily: "PoppinsLight",
    fontSize: 18,
  },
  textPrimary: {
    color: "#0F766E",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  shiftContainer: {
    marginTop: 4,
  },
  shiftRow: {
    flexDirection: "row",
    gap: 16,
  },
  shiftColumn: {
    flexDirection: "column",
  },
  shiftHeader: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    width: 80,
  },
  mtNegative: {
    marginTop: -8,
  },
  shiftDescription: {
    flex: 1,
  },
  fullWidth: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 8,
  },
  shiftText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    marginLeft: 8,
  },
  acceptedShift: {
    marginTop: 8,
  },
  acceptedShiftText: {
    fontFamily: "PoppinsSemiBold",
    color: "#333333",
    fontSize: 14,
  },
});

export default VerticalDatePicker;
