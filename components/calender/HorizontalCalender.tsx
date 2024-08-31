import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { format, addDays } from "date-fns";
import { Link } from "expo-router";

type HorizontalDatePickerProps = {
  selectedDate?: Date | null;
};

const HorizontalDatePicker: React.FC<HorizontalDatePickerProps> = ({
  selectedDate,
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
  useEffect(() => {
    loadMoreDates();
  }, []);

  //   useEffect(() => {
  //     console.log('running');

  //         if (selectedDate && !initialScrollDone) {
  //             const timer = setTimeout(() => {
  //                 scrollToSelectedDate(selectedDate);
  //                 setInitialScrollDone(true); // Ensure we only scroll once
  //             }, 100); // Adjust if needed
  //             return () => clearTimeout(timer);
  //         }
  //     }, [selectedDate]);

  const loadMoreDates = () => {
    const newDates = Array.from({ length: 30 }).map((_, index) =>
      addDays(startDate, index)
    );
    setDates((prevDates) => [...prevDates, ...newDates]);
    setStartDate(addDays(startDate, 30));
  };

  const handleDatePress = (date: Date) => {
    setInternalSelectedDate(date);
    console.log(date, "this is what is being passed");
  };

  const scrollToSelectedDate = (date: Date) => {
    const index = dates.findIndex(
      (d) => d.toDateString() === date.toDateString()
    );
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // This keeps the item centered in the viewport
      });
    }
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
            <Link
              asChild
              className="self-center"
              href={`/(shifts)/(shift)/${item}`}
            >
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
            </Link>
          );
        }}
        onEndReached={loadMoreDates}
        onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
      />
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
});

export default HorizontalDatePicker;
