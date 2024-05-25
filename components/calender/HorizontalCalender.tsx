// HorizontalDatePicker.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View, ViewToken } from 'react-native';
import { format, addDays } from 'date-fns';

const HorizontalDatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dates, setDates] = useState<Date[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState<string>(format(new Date(), 'MMMM yyyy'));
    const flatListRef = useRef<FlatList>(null);
    const today = new Date();

    useEffect(() => {
        // Initial load of dates
        loadMoreDates();
    }, []);

    const loadMoreDates = () => {
        const newDates = Array.from({ length: 30 }).map((_, index) => addDays(startDate, index));
        setDates((prevDates) => [...prevDates, ...newDates]);
        setStartDate(addDays(startDate, 30)); // Update start date for the next load
    };

    const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            const firstVisibleDate = new Date(viewableItems[0].item);
            setCurrentMonth(format(firstVisibleDate, 'MMMM yyyy'));
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.monthHeader}>{currentMonth}</Text>
            <FlatList
                ref={flatListRef}
                horizontal
                data={dates}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedDate(item)}>
                        <View style={[
                            styles.dateContainer,
                            item.toDateString() === today.toDateString() && styles.activeDate, // Highlight today's date
                            selectedDate && item.toDateString() === selectedDate.toDateString() && styles.selectedDate
                        ]}>
                            <Text style={styles.dateText}>{format(item, 'EEEEEE')}</Text>
                            <Text style={styles.dateText}>{format(item, 'd')}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={loadMoreDates}
                onEndReachedThreshold={0.5} // Load more dates when scrolled 50% to the end
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D504D',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
        borderRadius: 24,
        marginTop: -24,
    },
    monthHeader: {
        fontSize: 18,
        fontFamily: 'PoppinsLight',
        color: 'white',
        marginVertical: 10,
    },
    dateContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignItems: 'center',
    },
    selectedDate: {
        backgroundColor: '#FFFFFF40',
        borderRadius: 14,
    },
    activeDate: {
        backgroundColor: '#A4A705', // Blue background for today's date
        borderRadius: 14,
    },
    dateText: {
        color: '#FFFFFF',
        fontFamily: 'PoppinsLight',
    },
});

export default HorizontalDatePicker;
