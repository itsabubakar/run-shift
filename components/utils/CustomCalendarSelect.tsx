import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { format, add, sub, getDaysInMonth, getDay } from 'date-fns';
import Chevron from '@/assets/icons/Chevron';
import Cancel from '@/assets/icons/Cancel';
import Check from '@/assets/icons/Check';
import Redo from '@/assets/icons/shifts/Redo';

type Props = {
  onSelect: (date: Date) => void;
};

const CustomCalendarSelect = ({ onSelect }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(selectedDate);
    setIsVisible(false);
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => (
      <Text key={index} style={styles.dayOfWeek}>{day}</Text>
    ));
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
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
          <Text style={[isToday ? { color: 'white' } : null, { fontFamily: 'PoppinsRegular', color: '#ffffff' }]}>{day}</Text>
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

  const changeMonth = (direction: 'next' | 'prev') => {
    const newMonth = direction === 'next' ? add(currentMonth, { months: 1 }) : sub(currentMonth, { months: 1 });
    setCurrentMonth(newMonth);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.button}>
        <Text className='text-white' style={styles.poppinsRegular}>{format(new Date(), 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      <Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => changeMonth('prev')}>
                <View className='rotate-90'>
                  <Chevron />
                </View>
              </TouchableOpacity>
              <Text className='text-white' style={styles.poppinsSemiBold}>{format(currentMonth, 'MMMM yyyy')}</Text>
              <TouchableOpacity onPress={() => changeMonth('next')}>
                <View className='-rotate-90'>
                  <Chevron />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              {renderDaysOfWeek()}
              {renderDays()}
            </View>
            <View className='flex-row pt-8'>
              <View className='mr-auto'>
                <Redo fill="#27736E" />
              </View>
              <View className='mr-8'>
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
    backgroundColor: '#27736E',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#175B57',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  dayOfWeek: {
    width: '14%',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'PoppinsRegular',
    color: 'white',
  },
  day: {
    width: '14%',
    alignItems: 'center',
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
    fontFamily: 'PoppinsRegular',
  },
  currentDay: {
    width: '14%',
    alignItems: 'center',
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: '#A4A705',
  },
  poppinsRegular: {
    fontFamily: 'PoppinsRegular',
  },
  poppinsSemiBold: {
    fontFamily: 'PoppinsSemiBold',
  },
});

export default CustomCalendarSelect;
