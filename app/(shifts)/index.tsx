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
import { useState } from 'react'


type Props = {}
const HomeScreen = (props: Props) => {
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions } = useAppContext()

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        console.log(date);
    };
    // Replace after setting up tanstack query
    const [loading, setLoading] = useState(false)

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
            <HorizontalDatePicker />
            <VerticalDateList />
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
            {
                loading && <LoadingSpinner />
            }


        </View>
    )
}
export default HomeScreen