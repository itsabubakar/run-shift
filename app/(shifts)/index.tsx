import HorizontalDatePicker from '@/components/calender/HorizontalCalender'
import VerticalDateList from '@/components/calender/VerticalCalender'
import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderCalendar from '@/components/calender/HeaderCalender';
import MyShifts from '@/components/header/MyShifts'
import MoreOptions from '@/components/header/MoreOptions';
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { useEffect, useState } from 'react'
import FontSlider from '@/components/FontSlider'
import axiosInstance from '@/services'
import { useAuth } from '@/context/AuthContext'
import Check from '@/assets/icons/Check'
import Cancel from '@/assets/icons/Cancel'
import { StyleSheet } from 'react-native'
import CalenderIcon from '@/assets/icons/CalenderIcon'
import Clock from '@/assets/icons/Clock'


type Props = {}
const HomeScreen = (props: Props) => {
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions, showFontSlider, showHorizontalCalendar, refreshKey, showRequest, setShowRequest } = useAppContext()
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

             
               { showRequest &&  <View className="h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className="h-[60%] bottom-0 w-full rounded-t-[20px] justify-center items-center"></View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-8">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 -mt-[500px]">
                            Are you sure you want to request the selected shift
                        </Text>
                        <View className='justify-end flex-row gap-x-[76px]'>
                            <TouchableOpacity className='flex-row' >
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row' onPress={()=>setShowRequest!(!showRequest)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}

                <View className='absolute bottom-10 right-4 '>
                    <View className=''>
                        <TouchableOpacity className='bg-primary flex-row justify-between space-x-4  py-3 px-2 rounded-xl'>
                            <CalenderIcon />
                            <Text  className='text-white' style={styles.poppinsRegular}>request shift</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-primary flex-row justify-between space-x-4 mt-4  py-3 px-2 rounded-xl'>
                            <Clock />
                            <Text className='text-white' style={styles.poppinsRegular}>request time off</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
            {
                loading && <LoadingSpinner />
            }


        </View>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
   
    
   
    
});
export default HomeScreen