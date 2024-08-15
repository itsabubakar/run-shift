import HorizontalDatePicker from '@/components/calender/HorizontalCalender';
import Header from '@/components/header/Header';
import { useAppContext } from '@/context/AppContext';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { useEffect, useState } from 'react';
import axiosInstance from '@/services';
import { useAuth } from '@/context/AuthContext';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Props = {}
const HomeScreen = (props: Props) => {
    const { showHorizontalCalendar, refreshKey } = useAppContext();
    const [shifts, setShifts] = useState([]);
    const { authState } = useAuth();
    const { shift } = useLocalSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getShifts = async () => {
            setLoading(true);
            try {
                const shifts = await axiosInstance.get(`/shifts/${authState?.companyId}`);
                setShifts(shifts.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        // getShifts();
    }, [refreshKey]);

    return (
        <View className='flex-1'>
            <SafeAreaView className='bg-primary pb-10'>
                <Header
                    title='runshift'
                    calendar={true}
                    filter={true}
                    moreOptions={true}
                    persons={true}
                />
            </SafeAreaView>

            {showHorizontalCalendar && <HorizontalDatePicker selectedDate={shift ? new Date(shift) : null} />}

            <View>
                <Text style={styles.poppinsRegular} className='p-5 text-base'>There are no shifts on this date that match your {shift}.</Text>
            </View>

            {loading && <LoadingSpinner />}
        </View>
    );
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
});

export default HomeScreen;
