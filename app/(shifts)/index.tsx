import HorizontalDatePicker from '@/components/calender/HorizontalCalender'
import VerticalDateList from '@/components/calender/VerticalCalender'
import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderCalendar from '@/components/calender/HeaderCalender';
import MyShifts from '@/components/header/MyShifts'
import MoreOptions from '@/components/header/MoreOptions';
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { useEffect, useState } from 'react'
import FontSlider from '@/components/FontSlider'
import axiosInstance from '@/services'
import { useAuth } from '@/context/AuthContext'


type Props = {}
const HomeScreen = (props: Props) => {
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions, showFontSlider, showHorizontalCalendar } = useAppContext()
    const [shifts, setShifts] = useState([])

    const {authState} = useAuth()

    

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        console.log(date);
    };
    // Replace after setting up tanstack query
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
       console.log('index shift screen mounted')

       const getShifts = async () => {
        setLoading(true)
        try {
            // setLoading(false)
            const shifts = await axiosInstance.get(`/shifts/${authState?.companyId}`)
            console.log(shifts.data);

            setShifts(shifts.data)
        } catch (error) {
            setLoading(false)

            console.log(error);
        }
        finally {
            console.log('done', loading);
            setLoading(false)

        }
    }
       
    getShifts()
        
      }, []);

    // const shifts = [
    //     {
    //       date: '2024-07-04', // July 4
    //       shiftInfos: [
    //         { startTime: '09:00', endTime: '11:00', description: 'Morning Shift' },
    //         { startTime: '11:00', endTime: '14:00', description: 'Break' },
    //         { startTime: '14:00', endTime: '20:00', description: 'Afternoon Shift' }
    //       ],
    //       staffId: '1',
    //       staffName: 'John Doe',
    //     },
    //     {
    //       date: '2024-07-05', // July 5
    //       shiftInfos: [
    //         { startTime: '09:00', endTime: '12:00', description: 'Morning Shift' }
    //       ],
    //       staffId: '2',
    //       staffName: 'Jane Smith',
    //     },
    //     {
    //       date: '2024-07-06', // July 6
    //       shiftInfos: [
    //         { startTime: '10:00', endTime: '14:00', description: 'Midday Shift' }
    //       ],
    //       staffId: '3',
    //       staffName: 'Alice Johnson',
    //     },
    //     {
    //       date: '2024-07-10', // July 10
    //       shiftInfos: [
    //         { startTime: '08:00', endTime: '10:00', description: 'Early Morning Shift' },
    //         { startTime: '10:00', endTime: '12:00', description: 'Late Morning Shift' }
    //       ],
    //       staffId: '4',
    //       staffName: 'Bob Brown',
    //     },
    //     {
    //       date: '2024-07-12', // July 12
    //       shiftInfos: [
    //         { startTime: '09:00', endTime: '11:00', description: 'Morning Shift' },
    //         { startTime: '11:00', endTime: '13:00', description: 'Late Morning Shift' }
    //       ],
    //       staffId: '5',
    //       staffName: 'Charlie Davis',
    //     },
    //     {
    //       date: '2024-08-01', // August 1
    //       shiftInfos: [
    //         { startTime: '07:00', endTime: '09:00', description: 'Early Morning Shift' }
    //       ],
    //       staffId: '6',
    //       staffName: 'David Evans',
    //     },
    //     {
    //       date: '2024-08-02', // August 2
    //       shiftInfos: [
    //         { startTime: '08:00', endTime: '10:00', description: 'Morning Shift' }
    //       ],
    //       staffId: '7',
    //       staffName: 'Eve Frank',
    //     },
    //     {
    //       date: '2024-08-03', // August 3
    //       shiftInfos: [
    //         { startTime: '10:00', endTime: '12:00', description: 'Midday Shift' }
    //       ],
    //       staffId: '8',
    //       staffName: 'Grace Hill',
    //     },
    //     {
    //       date: '2024-08-04', // August 4
    //       shiftInfos: [
    //         { startTime: '09:00', endTime: '11:00', description: 'Morning Shift' }
    //       ],
    //       staffId: '9',
    //       staffName: 'Hank Irving',
    //     },
    //     {
    //       date: '2024-08-05', // August 5
    //       shiftInfos: [
    //         { startTime: '11:00', endTime: '13:00', description: 'Late Morning Shift' }
    //       ],
    //       staffId: '10',
    //       staffName: 'Ivy Jackson',
    //     },
    //   ];
      
      
      console.log(shifts);
      
      
      

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
            {
                showHorizontalCalendar && <HorizontalDatePicker />
            }


            <VerticalDateList shifts={shifts} />


            {/* Header Calendar */}
            {
                showHeaderCalendar && <View className='bg-[#00000073] flex-1 h-full w-full absolute'>
                    <View className=''>
                        <HeaderCalendar setShowHeaderCalendar={setShowHeaderCalendar} showHeaderCalendar={showHeaderCalendar} onSelect={handleDateSelection} />
                    </View>


                </View >
            }

            {/* Header shifts display */}

            {showAllShifts && <View className='bg-[#00000073] flex-1 h-full w-full absolute'>
                <View className=''>
                    <MyShifts />
                </View>

            </View >
            }

            {/* more options */}
            {showMoreOptions && <View className='bg-[#00000073] flex-1 h-full w-full absolute'>
                <View className=''>
                    <MoreOptions />
                </View>

            </View >
            }

            {/* font size modal */}

            {
                showFontSlider && <View className='flex-1 h-full w-full absolute'>
                    <View className=''>
                        <FontSlider />
                    </View>

                </View >

            }
            {
                loading && <LoadingSpinner />
            }


        </View>
    )
}
export default HomeScreen