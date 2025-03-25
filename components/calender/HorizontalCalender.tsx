import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  ViewToken,
} from "react-native";
import { format, addDays, isSameDay } from "date-fns";

type HorizontalDatePickerProps = {
  shifts?: any;
};

const HorizontalDatePicker: React.FC<HorizontalDatePickerProps> = ({
  shifts,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(new Date(), "MMMM yyyy")
  );
  const flatListRef = useRef<FlatList>(null);
  const today = new Date();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);

  useEffect(() => {
    loadMoreDates();
  }, []);

  const loadMoreDates = () => {
    const newDates = Array.from({ length: 30 }).map((_, index) =>
      addDays(startDate, index)
    );
    setDates((prevDates) => [...prevDates, ...newDates]);
    setStartDate(addDays(startDate, 30));
  };

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      const firstVisibleDate = new Date(viewableItems[0].item);
      setCurrentMonth(format(firstVisibleDate, "MMMM yyyy"));
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const hasShiftOnDate = (date: Date) => {
    const formattedDate = format(date, "MM-dd-yyyy");
    return shifts?.some((shift: any) => shift.date === formattedDate);
  };

  const getShiftDetails = (date: Date) => {
    const formattedDate = format(date, "MM-dd-yyyy");
    return shifts?.find((shift: any) => shift.date === formattedDate);
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);

    if (hasShiftOnDate(date)) {
      const shiftDetails = getShiftDetails(date);
      setSelectedShift(shiftDetails);
    } else {
      setSelectedShift(null);
    }

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
          const isToday = isSameDay(item, today);
          const isSelected = selectedDate && isSameDay(item, selectedDate);

          return (
            <TouchableOpacity onPress={() => handleDatePress(item)}>
              <View
                style={[
                  styles.dateContainer,
                  isToday && styles.activeDate,
                  isSelected && !isToday && styles.selectedDate,
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
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={30}
        windowSize={10}
      />

      {/* Modal for shift details */}
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
                  Time: {String(selectedShift.description) || "N/A"}
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
    marginTop: -24,
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
    marginHorizontal: 4,
  },
  selectedDate: {
    backgroundColor: "#FFFFFF40",
    borderRadius: 14,
  },
  activeDate: {
    backgroundColor: "#A4A705",
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
