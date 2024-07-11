import HorizontalDatePicker from '@/components/calender/HorizontalCalender'
import VerticalDateList from '@/components/calender/VerticalCalender'
import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderCalendar from '@/components/calender/HeaderCalender';
import MyShifts from '@/components/header/MyShifts'
import MoreOptions from '@/components/header/MoreOptions';
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { SetStateAction, useEffect, useState } from 'react'
import FontSlider from '@/components/FontSlider'
import axiosInstance from '@/services'
import { useAuth } from '@/context/AuthContext'
import Check from '@/assets/icons/Check'
import Cancel from '@/assets/icons/Cancel'
import { StyleSheet } from 'react-native'
import CalenderIcon from '@/assets/icons/CalenderIcon'
import Clock from '@/assets/icons/Clock'
import TimeOffHeader from '@/components/shifts/TimeOffHeader'
import CustomSelect from '@/components/utils/CustomSelect'
import CustomCalendarSelect from '@/components/utils/CustomCalendarSelect'
import Arrow from '@/assets/icons/Arrow'
import Chevron from '@/assets/icons/Chevron'
import { TextInput } from 'react-native-gesture-handler'


type Props = {}
const HomeScreen = (props: Props) => {
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions, showFontSlider, showHorizontalCalendar, refreshKey, showRequest, setShowRequest } = useAppContext()
    const [shifts, setShifts] = useState([])

    const {authState} = useAuth()

    // console.log(authState?.role);
        

    // const handleDateSelection = (date: Date) => {
    //     // Handle the selected date here
    //     // console.log(date);
    // };
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

    const [selectedValue, setSelectedValue] = useState(null);


    const options = [
        { label: 'Holiday', value: '1' },
        { label: 'LOA', value: '2' },
        { label: 'Maternity', value: '3' },
        { label: 'Personal', value: '4' },
        { label: 'RDO', value: '5' },
        { label: 'Sick leave', value: '6' },
    ];
    const [addTimeOff, setAddTimeOff] = useState(false)

    const handleSelect = (value: SetStateAction<null>) => {
        setSelectedValue(value);
        // Additional logic on select
    }

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        console.log('function selected!!');
        
        console.log(date);
    };

      
    
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

             
               { showRequest &&  <View className="h-full z-10 absolute w-full flex-col flex-1 bg-[#000000b0]">
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
                        <TouchableOpacity onPress={()=> setShowRequest!(!showRequest)} className='bg-primary flex-row justify-between space-x-4  py-3 px-2 rounded-xl'>
                            <CalenderIcon />
                            <Text  className='text-white' style={styles.poppinsRegular}>request shift</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setAddTimeOff(!addTimeOff)} className='bg-primary flex-row justify-between space-x-4 mt-4  py-3 px-2 rounded-xl'>
                            <Clock />
                            <Text className='text-white' style={styles.poppinsRegular}>request time off</Text>
                        </TouchableOpacity>
                    </View>
                </View>

             {
                addTimeOff && <View className='bg-[#00000073] flex-1 h-full w-full absolute'>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className='mt-24 bg-primary mx-3 px-6 rounded-xl py-7 mb-10'>
                        <View className='flex-row justify-between pb-8 items-center'>

                            <Text className='text-white text-2xl ' style={styles.poppinsRegular}>Request for time off</Text>
                            <TouchableOpacity onPress={() => setAddTimeOff(!addTimeOff)}>

                                <Cancel />
                            </TouchableOpacity>
                        </View>
                        <View className='mb-14'>
                            <TimeOffHeader
                                head={'Select type of time off'}
                            />
                            <CustomSelect header={'Holiday'} options={options} onSelect={handleSelect} />

                        </View>
                        <View className='mb-14'>
                            <TimeOffHeader
                                head={'Type in your display text:'}
                            />
                            <TextInput
                            style={styles.input}
                            />

                        </View>
                        {/* Calender select */}
                                <TimeOffHeader
                                    head={'Select days:'}
                                />
                        <View className='mb-14 justify-center items-center  flex-row gap-x-5'>
                            <View>
                                <Text
                                    className='text-white text-base'
                                    style={styles.poppinsRegular}
                                >First day off:</Text>
                                <CustomCalendarSelect onSelect={handleDateSelection} />
                            </View>

                            <View className=' mt-6 flex-1'>
                                <Arrow />
                            </View>

                            <View>
                                <Text
                                    className='text-white text-base'
                                    style={styles.poppinsRegular}
                                >Last day off:</Text>
                                <CustomCalendarSelect onSelect={handleDateSelection} />

                            </View>

                        </View>

                        {/* Included days */}
                        <View>
                            <TimeOffHeader
                                head={'Included days'}
                            />
                            <View className='flex-row justify-between items-end'>

                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>M</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>T</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>W</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>T</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>F</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>S</Text>
                                <Text style={styles.poppinsRegular} className='text-white py-3 px-4 rounded-xl bg-[#27736E]'>S</Text>


                            </View>
                        </View>

                        {/* Repetition */}
                        <View className='mb-14'>
                            <TimeOffHeader
                                head={'Repetition'}
                            />
                            <View className='flex-row justify-between items-end'>
                                <View>
                                    <Text style={styles.poppinsRegular} className='text-white'>Every</Text>
                                    <View className='flex-row gap-x-2'>
                                        <Text style={styles.poppinsRegular} className='text-white py-3 px-6 rounded-xl bg-[#27736E]'>1</Text>
                                        <View className='py-3 pr-4 pl-6 rounded-xl bg-[#27736E]'>
                                            <Chevron />
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.poppinsRegular} className='text-white'>Until</Text>
                                    <CustomCalendarSelect onSelect={handleDateSelection} />

                                </View>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View className='flex-row justify-end pb-14'>
                            <View className='mr-20'>

                                <Cancel />
                            </View>
                            <Check />
                        </View>


                    </ScrollView>

                </View >
            }
            
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
   input : {
        backgroundColor: '#27736E',
        color: 'white',
        padding: 10,
        fontFamily: 'PoppinsRegular',
        borderRadius: 8,

   }
    
   
    
});
export default HomeScreen