import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { format, startOfWeek, add, sub, getDaysInMonth, getDay } from 'date-fns';
import Chevron from '@/assets/icons/Chevron';
import Cancel from '@/assets/icons/Cancel';
import Check from '@/assets/icons/Check';
import Redo from '@/assets/icons/shifts/Redo';
import Pin from '@/assets/icons/Pin';
import Star from '@/assets/icons/Star';
import Expand from '@/assets/icons/Expand';

type Props = {
    onSelect: (date: Date) => void;
    showHeaderCalendar: boolean;
    setShowHeaderCalendar: React.Dispatch<React.SetStateAction<boolean>> | undefined;

};

const CustomCalendarSelect = ({ onSelect, showHeaderCalendar, setShowHeaderCalendar }: Props) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const handleSelectDay = (day: number) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        onSelect(selectedDate);
        setShowHeaderCalendar!(false);
    };

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayOfWeek}>{day}</Text>
        ));
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        // Start from the first day of the current month
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        // Get the day of the week for the first day of the current month
        const dayOfWeek = getDay(firstDayOfMonth);
        const days = [];
        const today = new Date();

        // Fill in the blanks for the days before the first day of the month
        for (let i = 0;i < dayOfWeek;i++) {
            days.push(<View key={`empty-${i}`} style={styles.day} />);
        }

        // Fill in the days of the month
        for (let day = 1;day <= daysInMonth;day++) {
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

        // Calculate the number of empty cells to add at the end of the month to fill the row
        const totalSlots = Math.ceil((dayOfWeek + daysInMonth) / 7) * 7;
        const emptySlotsAfter = totalSlots - (dayOfWeek + daysInMonth);
        for (let i = 0;i < emptySlotsAfter;i++) {
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

            <Modal visible={showHeaderCalendar} transparent={true} onRequestClose={() => setShowHeaderCalendar!(false)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowHeaderCalendar!(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => changeMonth('prev')}>
                                <View className='rotate-90'>
                                    <Chevron />
                                </View>
                            </TouchableOpacity>
                            <Text
                                className='text-white'
                                style={styles.poppinsSemiBold}
                            >{format(currentMonth, 'MMMM yyyy')}</Text>
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

                            {/* <View className='mr-4 p-4 rounded-xl bg-[#27736E]'>

                                <Pin />
                            </View> */}
                            {/* <View className='mr-4 p-4 rounded-xl bg-[#27736E]'>

                                <Star />
                            </View> */}
                            <View className='mr-4 p-4 rounded-xl bg-[#27736E]'>

                                <Expand />
                            </View>
                            <View className=''>

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
        paddingTop: 80,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#175B57',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginRight: 10,

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
        color: 'white'

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