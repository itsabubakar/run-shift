import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, addDays, isSameDay } from 'date-fns';

const CalendarWeek = () => {
    const today = new Date();
    // console.log(today);

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


        // styling active day of the week - su mo tu
        const isToday = isSameDay(date, today);
        const activeDayOfWeekStyle = isToday ? styles.activeDayOfWeek : {};


        return (
            <TouchableOpacity
                key={date.toString()}
                onPress={() => setActiveDate(date)}
                style={[isActive && styles.activeDay, activeDayOfWeekStyle, styles.borderRadius]}

            >
                <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
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
    borderRadius: {
        borderRadius: 8,
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
        borderWidth: 0,
        borderRadius: 8,

    },
    activeDayOfWeek: {
        backgroundColor: '#FFFFFF99', // Dark gray color
    },
    dayOfWeek: {
        fontFamily: 'PoppinsLight',
        textAlign: 'center',
        color: '#FFFFFF99'

    },


});

export default CalendarWeek;