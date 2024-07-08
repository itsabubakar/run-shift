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
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions, showFontSlider, showHorizontalCalendar, refreshKey } = useAppContext()
    const [shifts, setShifts] = useState([])

    const {authState} = useAuth()

    // console.log(authState?.role);
        

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        // console.log(date);
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
            // console.log(shifts.data);

            setShifts(shifts.data)
        } catch (error) {
            setLoading(false)

            console.log(error);
        }
        finally {
            setLoading(false)

        }
    }
       
    getShifts()
   
        
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