import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { format, addDays, subDays, isToday, parse } from "date-fns";
import { useAppContext } from "@/context/AppContext";
import ProfilePicture from "@/assets/icons/ProfilePicture";
import { FlashList } from "@shopify/flash-list";
import { useAuth } from "@/context/AuthContext";

interface Shift {
  date: string; // Date in 'yyyy-MM-dd' format
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

  console.log("Authstate:", authState?.acceptedShifts);

  // Initialize with a large set of dates (10,000 in the past and 10,000 in the future)
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

      // Scroll to today's date after the list is initialized
      setTimeout(() => {
        if (flatListRef.current) {
          const todayIndex = 10000; // Today is at the center of the initial dates
          flatListRef.current.scrollToIndex({
            index: todayIndex,
            animated: false,
          });
        }
      }, 10); // Add a small delay to ensure the list is ready
    }
  }, [shifts]); // Add `shifts` as a dependency

  // Render shift information for a specific date
  const renderShiftInfo = useCallback(
    (date: Date) => {
      const formattedCurrentDate = format(date, "MM-dd-yyyy");

      const normalShifts = authState?.shift?.filter((shift) => {
        return (
          shift.date === formattedCurrentDate &&
          (!emailFilter || shift.staff?.email === emailFilter)
        );
      });

      const acceptedShifts = authState?.acceptedShifts?.filter((shift) => {
        return shift.date === formattedCurrentDate;
      });

      const hasAnyShifts =
        (normalShifts?.length || 0) + (acceptedShifts?.length || 0) > 0;

      if (!hasAnyShifts) {
        return <Text style={styles.shiftText}>No Shifts</Text>;
      }

      return (
        <>
          {/* Normal Shifts */}
          {normalShifts?.map((shift, index) => (
            <View
              key={`normal-${shift.id}-${index}`}
              style={styles.shiftContainer}
            >
              <View className="flex-row space-x-4">
                <View className="flex-col">
                  <ProfilePicture width={20} />
                  <Text className="-mt-2 w-20" style={styles.shiftHeader}>
                    {authState?.firstName} {authState?.lastName}
                  </Text>
                </View>
                <View className="flex-1">
                  <TouchableOpacity className="pt-2 flex-row justify-between w-full">
                    <Text style={styles.shiftText}>
                      {shift.description?.join(", ") || "No description"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Accepted Shifts (with different style) */}
          {acceptedShifts?.map((shift, index) => (
            <View
              key={`accepted-${shift.id}-${index}`}
              style={[styles.shiftContainer, styles.acceptedShift]}
            >
              <View className="flex-row space-x-4">
                <View className="flex-col">
                  <ProfilePicture width={20} />
                  <Text className="-mt-2 w-20" style={styles.shiftHeader}>
                    {authState?.firstName} {authState?.lastName}
                  </Text>
                </View>
                <View className="flex-1">
                  <TouchableOpacity className="pt-2 flex-row justify-between w-full">
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

  // Render each date item
  const renderItem = useCallback(
    ({ item }: { item: Date }) => {
      return (
        <View
          style={[styles.dateContainer, isToday(item) && styles.selectedDate]}
        >
          <View style={[styles.row, isToday(item) && styles.selectedDay]}>
            <Text style={styles.dateText} className="text-primary">
              {format(item, "EEE")}
            </Text>
            <Text className="text-primary">{format(item, "d")}</Text>
            <Text className="text-primary" style={styles.dateText}>
              {format(item, "MMM")}
            </Text>
          </View>
          {renderShiftInfo(item)}
        </View>
      );
    },
    [renderShiftInfo]
  );

  return (
    <View style={styles.container}>
      <FlashList
        ref={flatListRef}
        data={dates}
        keyExtractor={(item) => item.toISOString()}
        renderItem={renderItem}
        estimatedItemSize={160} // Improve performance
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (flatListRef.current) {
            const todayIndex = 10000;
            flatListRef.current.scrollToIndex({
              index: todayIndex,
              animated: false,
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  acceptedShift: {
    marginTop: 8,
  },

  acceptedShiftText: {
    fontFamily: "PoppinsSemiBold",
    color: "#333333",
    fontSize: 14,
  },

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
  row: {
    flexDirection: "row",
    gap: 4,
  },
  shiftContainer: {
    marginTop: 4,
  },
  shiftText: {
    fontFamily: "PoppinsRegular",
    paddingTop: 4,
    fontSize: 16,
    marginLeft: 8,
  },
  shiftHeader: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});

export default VerticalDatePicker;
