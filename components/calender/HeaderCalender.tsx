import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { format, add, sub, getDaysInMonth, getDay } from "date-fns";
import Chevron from "@/assets/icons/Chevron";
import Cancel from "@/assets/icons/Cancel";
import Expand from "@/assets/icons/Expand";
import { Link } from "expo-router";

type Props = {
  onSelect: (date: Date) => void;
  showHeaderCalendar: boolean;
  setShowHeaderCalendar:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
};

const CustomCalendarSelect = ({
  onSelect,
  showHeaderCalendar,
  setShowHeaderCalendar,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [expand, setExpand] = useState(false);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
      12
    );
    onSelect(selectedDate);
    setShowHeaderCalendar?.(false);
  };

  const renderDaysOfWeek = () =>
    daysOfWeek.map((day, index) => (
      <Text key={index} style={styles.dayOfWeek}>
        {day}
      </Text>
    ));

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
      days.push(<View key={`empty-start-${i}`} style={styles.day} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear();

      const dateObj = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
        12
      );

      days.push(
        <Link key={`day-${day}`} asChild href={`/(shifts)/(shift)/${dateObj}`}>
          <TouchableOpacity
            style={isToday ? styles.currentDay : styles.day}
            onPress={() => handleSelectDay(day)}
          >
            <Text
              style={[
                styles.poppinsRegular,
                { color: isToday ? "white" : "#ffffff" },
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        </Link>
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
      <Modal
        visible={showHeaderCalendar}
        transparent
        onRequestClose={() => setShowHeaderCalendar?.(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, !expand && styles.overlayPadding]}
          onPress={() => setShowHeaderCalendar?.(false)}
          activeOpacity={1}
        >
          <View style={[styles.modalContent, !expand && styles.compactContent]}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => changeMonth("prev")}>
                <View style={{ transform: [{ rotate: "90deg" }] }}>
                  <Chevron />
                </View>
              </TouchableOpacity>

              <Text style={[styles.poppinsSemiBold, styles.headerText]}>
                {format(currentMonth, "MMMM yyyy")}
              </Text>

              <TouchableOpacity onPress={() => changeMonth("next")}>
                <View style={{ transform: [{ rotate: "-90deg" }] }}>
                  <Chevron />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.calendar}>
              {renderDaysOfWeek()}
              {renderDays()}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => setExpand(!expand)}
                style={styles.expandBtn}
              >
                <Expand />
              </TouchableOpacity>

              <View>
                <Cancel />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayPadding: {
    paddingTop: 80,
  },
  modalContent: {
    backgroundColor: "#175B57",
    padding: 20,
    borderRadius: 10,
    height: "100%",
  },
  compactContent: {
    width: "80%",
    marginRight: 10,
    height: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 16,
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
  actions: {
    flexDirection: "row",
    paddingTop: 32,
    gap: 16,
  },
  expandBtn: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#27736E",
    marginRight: 16,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default CustomCalendarSelect;
