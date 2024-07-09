import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, StyleSheet, View, ViewToken, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import { format, addDays, subDays, isToday, parseISO } from 'date-fns';
import { useAppContext } from '@/context/AppContext';
import ProfilePicture from '@/assets/icons/ProfilePicture';
import LoadingSpinner from '../utils/LoadingSpinner';
import CheckBox from '../settings/CheckBox';

interface Shift {
  date: string; // Date in 'yyyy-MM-dd' format
  description: [];
  staffId: string;
  staff: {
    email: string,
    firstName: string
  }; // Add this field to match the email
}


interface RenderShiftInfoProps {
  date: Date;
  shifts: Shift[];
  emailFilter: string | null;
}

interface Props {
  shifts: Shift[];
}

const VerticalDatePicker: React.FC<Props> = ({ shifts }) => {
  const { emailFilter, showRequestCheckBox, setShowRequestCheckBox } = useAppContext();
  const [dates, setDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>(format(new Date(), 'MMMM yyyy'));
  const flatListRef = useRef<FlatList>(null);
  const today = new Date();
  const dateHeight = 160;

  useEffect(() => {
    const initialDates = Array.from({ length: 30 }).map((_, index) => subDays(today, 15 - index));
    setDates(initialDates);

    setTimeout(() => {
      if (flatListRef.current) {
        const todayIndex = 15;
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
  const shiftsForDate = shifts
    ?.filter(shift => format(parseISO(shift.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
    .filter(shift => emailFilter ? shift.staff.email === emailFilter : true);

  if (shiftsForDate && shiftsForDate.length > 0) {
    // Group shifts by staff
    const shiftsByStaff = shiftsForDate.reduce<Record<string, { staff: Shift['staff']; shifts: string[][] }>>((acc, shift) => {
      if (!acc[shift.staff.email]) {
        acc[shift.staff.email] = {
          staff: shift.staff,
          shifts: [],
        };
      }
      acc[shift.staff.email].shifts.push(shift.description);
      return acc;
    }, {});

    // Render shifts grouped by staff
    return Object.keys(shiftsByStaff).map((email, index) => {
      const staffShift = shiftsByStaff[email];
      return (
        <View key={index} style={styles.shiftContainer}>
          <View className="flex-row space-x-4">
            <View className="flex-col">
              <ProfilePicture width={20} />
              <Text className="-mt-2 w-20" style={styles.shiftHeader}>
                {staffShift.staff.firstName.charAt(0).toUpperCase() + staffShift.staff.firstName.slice(1)}
              </Text>
            </View>
            <View className='flex-1'>
              {staffShift.shifts.map((shiftInfoArray, shiftIndex) => (
                <View className='' key={shiftIndex}>
                  {shiftInfoArray.map((shiftInfo, descriptionIndex) => (
                    <TouchableOpacity onPress={()=>setShowRequestCheckBox!(!showRequestCheckBox)}  className='pt-2 flex-row justify-between w-full' key={descriptionIndex}>
                      <Text className={`${showRequestCheckBox && 'w-4/5'}  `} style={styles.shiftText}>{shiftInfo}</Text>

                      {
                        showRequestCheckBox && <CheckBox
                      color="gray"
                       />
                      }
                        
                      
                    
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      );
    });
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
        onEndReachedThreshold={0.5}
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
    marginLeft: 8,
  },
  shiftHeader: {
    fontFamily: 'PoppinsRegular',
    // paddingTop: 6,
    fontSize: 18,
  },
});

export default VerticalDatePicker;
