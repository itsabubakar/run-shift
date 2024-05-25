import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, StyleSheet, View, ViewToken, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { format, addDays, subDays, isToday } from 'date-fns';

const VerticalDatePicker: React.FC = () => {
    const [dates, setDates] = useState<Date[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>(format(new Date(), 'MMMM yyyy'));
    const flatListRef = useRef<FlatList>(null);
    const today = new Date();

    useEffect(() => {
        // Initial load of dates, centered around today
        const initialDates = Array.from({ length: 30 }).map((_, index) => subDays(today, 15 - index));
        setDates(initialDates);
    }, []);

    const loadMoreDates = (direction: 'up' | 'down') => {
        if (direction === 'down') {
            const newDates = Array.from({ length: 30 }).map((_, index) => addDays(dates[dates.length - 1], index + 1));
            setDates((prevDates) => [...prevDates, ...newDates]);
        } else {
            const newDates = Array.from({ length: 30 }).map((_, index) => subDays(dates[0], index + 1)).reverse();
            setDates((prevDates) => [...newDates, ...prevDates]);

            // Adjust the scroll position to account for the added dates at the top
            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToOffset({ offset: 30 * 160, animated: false });
                }
            }, 0);
        }
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

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const dateHeight = 160; // Adjust this based on your date item height
        const currentIndex = Math.floor(offsetY / dateHeight);
        const currentMonth = dates[currentIndex] ? format(dates[currentIndex], 'MMMM yyyy') : '';
        setCurrentMonth(currentMonth);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={dates}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <View style={[
                        styles.dateContainer,
                        isToday(item) && styles.selectedDate
                    ]}>
                        <View style={styles.row}>
                            <Text className='text-primary' style={styles.dateText}>{format(item, 'EEE')}</Text>
                            <Text className='text-primary' style={styles.dayName}>{format(item, 'd')}</Text>
                            <Text className='text-primary' style={styles.dateText}>{format(item, 'MMM')}</Text>
                        </View>
                        <Text style={styles.poppinsLight} className='text-center my-auto'>No shifts</Text>
                    </View>
                )}
                onEndReached={() => loadMoreDates('down')}
                onEndReachedThreshold={0.5} // Load more dates when scrolled 50% to the end
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                onScrollBeginDrag={(event) => {
                    if (event.nativeEvent.contentOffset.y <= 0) {
                        loadMoreDates('up');
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    poppinsLight: {
        fontFamily: 'PoppinsLight',
    },
    dayName: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 18,
    },
    container: {
        paddingHorizontal: 16,
        borderRadius: 24,
        flex: 1,
    },
    monthHeader: {
        fontSize: 18,
        fontFamily: 'PoppinsLight',
        color: 'white',
    },
    dateContainer: {
        borderBottomColor: '#E9E9E9',
        borderBottomWidth: 1,

        paddingHorizontal: 10,
        paddingVertical: 16,
        minHeight: 160,
    },
    selectedDate: {
        backgroundColor: 'yellow',
        borderRadius: 14,
    },
    dateText: {
        fontFamily: 'PoppinsLight',
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        gap: 4,
    },
});

export default VerticalDatePicker;
