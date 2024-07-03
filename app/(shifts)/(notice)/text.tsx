import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, StyleSheet, View, ViewToken, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { format, addDays, subDays, isToday, parseISO } from 'date-fns';

interface ShiftInfo {
  startTime: string;
  endTime: string;
  description: string;
}

interface Shift {
  date: string; // Date in 'yyyy-MM-dd' format
  shiftInfos: ShiftInfo[];
  staffId: string;
  staffName: string;
}

interface Props {
  shifts: Shift[];
}

const VerticalDatePicker: React.FC<Props> = ({ shifts }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(format(new Date(), 'MMMM yyyy'));
  const flatListRef = useRef<FlatList>(null);
  const today = new Date();
  const dateHeight = 160;

  useEffect(() => {
    // Initial load of dates, centered around today
    const initialDates = Array.from({ length: 30 }).map((_, index) => subDays(today, 15 - index));
    setDates(initialDates);

    // Automatically scroll to today's date after the dates are set
    setTimeout(() => {
      if (flatListRef.current) {
        const todayIndex = 15; // Since we are centering around today, it's at the 15th position
        flatListRef.current.scrollToIndex({ index: todayIndex, animated: false });
      }
    }, 0);
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
          flatListRef.current.scrollToOffset({ offset: 30 * dateHeight, animated: false });
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
    const currentIndex = Math.floor(offsetY / dateHeight);
    const currentMonth = dates[currentIndex] ? format(dates[currentIndex], 'MMMM yyyy') : '';
    setCurrentMonth(currentMonth);
  };

  const getItemLayout = (data: any, index: number) => ({
    length: dateHeight,
    offset: dateHeight * index,
    index,
  });

  const onScrollToIndexFailed = (info: any) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    }, 500);
  };

  const renderShiftInfo = (date: Date) => {
    const shift = shifts.find(shift => format(parseISO(shift.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    if (shift) {
      return shift.shiftInfos.map((shiftInfo, index) => (
        <View key={index} style={styles.shiftContainer}>
          {/* <Text style={styles.shiftText}>{`${shiftInfo.startTime} - ${shiftInfo.endTime}`}</Text> */}
          <Text style={styles.shiftText}>{shiftInfo.description}</Text>
          {/* <Text style={styles.shiftText}>{shift.staffName}</Text> */}
        </View>
      ));
    }
    return <Text style={styles.shiftText}>No Shifts</Text>;
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
            <View style={[styles.row, isToday(item) && styles.selectedDay]}>
              <Text style={styles.dateText} className='text-primary'>{format(item, 'EEE')}</Text>
              <Text className='text-primary' style={styles.dayName}>{format(item, 'd')}</Text>
              <Text className='text-primary' style={styles.dateText}>{format(item, 'MMM')}</Text>
            </View>
            {renderShiftInfo(item)}
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
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
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
    // backgroundColor: 'yellow',
    borderRadius: 14,
  },
  selectedDay: {
    borderBottomColor: '#175B57',
    borderBottomWidth: 1,
  },
  dateText: {
    fontFamily: 'PoppinsLight',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  shiftContainer: {
    marginTop: 4,
  },
  shiftText: {
    fontFamily: 'PoppinsRegular',
    paddingTop: 4,
    fontSize: 16,
  },
});

export default VerticalDatePicker;
