import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
} from "react-native";
import { format, addDays } from "date-fns";
import { Link } from "expo-router";

type HorizontalDatePickerProps = {
  selectedDate?: Date | null;
  shifts?: any;
};

const HorizontalDatePicker: React.FC<HorizontalDatePickerProps> = ({
  selectedDate,
  shifts,
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    selectedDate || null
  );
  const [dates, setDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(new Date(), "MMMM yyyy")
  );
  const flatListRef = useRef<FlatList>(null);
  const today = new Date();
  const [initialScrollDone, setInitialScrollDone] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);

  useEffect(() => {
    loadMoreDates();
  }, []);

  // Function to check if a date exists in the shifts array
  const hasShiftOnDate = (date: Date) => {
    const formattedDate = format(date, "MM-dd-yyyy");
    return shifts?.some((shift: any) => shift.date === formattedDate);
  };

  // Function to get shift details for a specific date
  const getShiftDetails = (date: Date) => {
    const formattedDate = format(date, "MM-dd-yyyy");
    return shifts?.find((shift: any) => shift.date === formattedDate);
  };

  const loadMoreDates = () => {
    const newDates = Array.from({ length: 30 }).map((_, index) =>
      addDays(startDate, index)
    );
    setDates((prevDates) => [...prevDates, ...newDates]);
    setStartDate(addDays(startDate, 30));
  };

  const handleDatePress = (date: Date) => {
    setInternalSelectedDate(date);

    // Check if the date has a shift
    if (hasShiftOnDate(date)) {
      const shiftDetails = getShiftDetails(date);
      setSelectedShift(shiftDetails); // Set the selected shift details
    } else {
      setSelectedShift(null); // No shift for this date
    }

    // Always open the modal
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedShift(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.monthHeader}>{currentMonth}</Text>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => {
          const isToday = item.toDateString() === today.toDateString();
          const isSelected =
            internalSelectedDate &&
            item.toDateString() === internalSelectedDate.toDateString();

          return (
            <TouchableOpacity onPress={() => handleDatePress(item)}>
              <View
                style={[
                  styles.dateContainer,
                  isToday && styles.activeDate, // Always apply yellow-green background to today's date
                  isSelected && !isToday && styles.selectedDate, // Apply gray background only if selected and not today
                ]}
              >
                <Text style={styles.dateText}>{format(item, "EEEEEE")}</Text>
                <Text style={styles.dateText}>{format(item, "d")}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={loadMoreDates}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
      />

      {/* Modal to display shift details */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedShift ? (
              <>
                <Text style={styles.modalTitle}>Shift Details</Text>
                <Text style={styles.modalText}>
                  Date: {selectedShift.date || "N/A"}
                </Text>
                <Text style={styles.modalText}>
                  Time:{" "}
                  {selectedShift.description
                    ? String(selectedShift.description)
                    : "N/A"}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>No Shift</Text>
                <Text style={styles.modalText}>
                  No shift on the selected date.
                </Text>
              </>
            )}

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D504D",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    borderRadius: 24,
    marginTop: -50,
  },
  monthHeader: {
    fontSize: 18,
    fontFamily: "PoppinsLight",
    color: "white",
    marginVertical: 10,
  },
  dateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  selectedDate: {
    backgroundColor: "#FFFFFF40", // Gray background for selected date
    borderRadius: 14,
  },
  activeDate: {
    backgroundColor: "#A4A705", // Yellow-green background for today's date
    borderRadius: 14,
  },
  dateText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsLight",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "PoppinsBold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#27736E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontFamily: "PoppinsRegular",
  },
});

export default HorizontalDatePicker;
