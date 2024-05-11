import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, eachDayOfInterval, addDays, isSameDay } from 'date-fns';

const CalendarWeek = () => {
    const today = new Date();
    const [activeDate, setActiveDate] = useState(today);

    // Generate the days starting from today and the next six days
    const days = [];
    for (let i = 0;i < 9;i++) {
        days.push(addDays(today, i));
    }

    const renderDay = (date: Date) => {
        const dayOfWeek = format(date, 'EEEEEE'); // Two-letter abbreviation
        const dayOfMonth = format(date, 'd');
        const isActive = isSameDay(date, activeDate); // Compares the two dates

        return (
            <TouchableOpacity
                key={date.toString()}
                onPress={() => setActiveDate(date)}

            >
                <Text style={styles.dayOfWeek} className='text-[#FFFFFF99]'>{dayOfWeek}</Text>
                <Text className='text-white' style={[styles.dayContainer, isActive && styles.activeDay]}>{dayOfMonth}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.calendarContainer} className=' bg-[#1D504D]  py-5  px-6 rounded-3xl -mt-12'>
            <Text className='text-white' style={styles.monthHeader}>{format(today, 'MMMM yyyy')}</Text>
            <View className='' style={styles.daysContainer}>
                {days.map(renderDay)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        // Your calendar container styles
    },
    monthHeader: {
        fontFamily: 'PoppinsLight',
        fontSize: 14,
    },
    daysContainer: {
        // Your days container styles
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    dayContainer: {
        // Your day container styles
        alignItems: 'center',
        fontFamily: 'PoppinsLight',

        padding: 8,
        paddingHorizontal: 12,
        fontSize: 14,

    },
    activeDay: {
        backgroundColor: '#A4A705', // Highlight color for the active day
        borderRadius: 10,
        borderWidth: 0,
    },
    dayOfWeek: {
        fontFamily: 'PoppinsLight',
        textAlign: 'center',
        // Styles for the day of the week text
    },
    dayOfMonth: {
        padding: 6,
        // Styles for the day of the month text
    },
    // ... any other styles you need
});

export default CalendarWeek;