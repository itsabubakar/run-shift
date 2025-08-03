import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { format, add, sub, getDaysInMonth, getDay } from "date-fns";
import Chevron from "@/assets/icons/Chevron";
import Cancel from "@/assets/icons/Cancel";
import Check from "@/assets/icons/Check";
import Redo from "@/assets/icons/shifts/Redo";

type Props = {
  onSelect: (date: Date) => void;
};

const CustomCalendarSelect = ({ onSelect }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onSelect(selectedDate);
    setIsVisible(false);
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <Text key={index} style={styles.dayOfWeek}>
        {day}
      </Text>
    ));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const dayOfWeek = getDay(firstDayOfMonth);
    const days = [];
    const today = new Date();

    for (let i = 0; i < dayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.day} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear();

      days.push(
        <TouchableOpacity
          key={day}
          style={isToday ? styles.currentDay : styles.day}
          onPress={() => handleSelectDay(day)}
        >
          <Text style={styles.dayText}>{day}</Text>
        </TouchableOpacity>
      );
    }

    const totalSlots = Math.ceil((dayOfWeek + daysInMonth) / 7) * 7;
    const emptySlotsAfter = totalSlots - (dayOfWeek + daysInMonth);
    for (let i = 0; i < emptySlotsAfter; i++) {
      days.push(<View key={`empty-end-${i}`} style={styles.day} />);
    }

    return days;
  };

  const changeMonth = (direction: "next" | "prev") => {
    const newMonth =
      direction === "next"
        ? add(currentMonth, { months: 1 })
        : sub(currentMonth, { months: 1 });
    setCurrentMonth(newMonth);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {format(new Date(), "dd/MM/yyyy")}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => changeMonth("prev")}>
                <View style={styles.rotateChevron}>
                  <Chevron />
                </View>
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {format(currentMonth, "MMMM yyyy")}
              </Text>
              <TouchableOpacity onPress={() => changeMonth("next")}>
                <View style={styles.rotateChevronBack}>
                  <Chevron />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.calendar}>
              {renderDaysOfWeek()}
              {renderDays()}
            </View>

            <View style={styles.footer}>
              <View style={styles.iconLeft}>
                <Redo fill="#27736E" />
              </View>
              <View style={styles.iconCenter}>
                <Cancel />
              </View>
              <Check />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#27736E",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "PoppinsRegular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#175B57",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },
  rotateChevron: {
    transform: [{ rotate: "90deg" }],
  },
  rotateChevronBack: {
    transform: [{ rotate: "-90deg" }],
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  dayOfWeek: {
    width: "14%",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "PoppinsRegular",
    color: "white",
  },
  day: {
    width: "14%",
    alignItems: "center",
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
  },
  currentDay: {
    width: "14%",
    alignItems: "center",
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: "#A4A705",
  },
  dayText: {
    fontFamily: "PoppinsRegular",
    color: "#ffffff",
  },
  footer: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconLeft: {
    marginRight: "auto",
  },
  iconCenter: {
    marginRight: 32,
  },
});

export default CustomCalendarSelect;
