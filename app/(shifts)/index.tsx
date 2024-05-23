import Calender from '@/components/calender/Calender';
import Header from '@/components/header/Header';
import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SetStateAction, useEffect, useState } from 'react';
import Upload from '@/assets/icons/Upload';
import Shift from '@/components/shifts/Shift';
import Cancel from '@/assets/icons/Cancel';
import Pencil from '@/assets/icons/shifts/Pencil';
import Redo from '@/assets/icons/shifts/Redo';
import CalenderIcon from '@/assets/icons/CalenderIcon';
import Clock from '@/assets/icons/Clock';
import TimeOffHeader from '@/components/shifts/TimeOffHeader';
import CustomSelect from '@/components/utils/CustomSelect';
import Arrow from '@/assets/icons/Arrow';
import CustomCalendarSelect from '@/components/utils/CustomCalendarSelect';
import Chevron from '@/assets/icons/Chevron';
import Check from '@/assets/icons/Check';
import HeaderCalendar from '@/components/calender/HeaderCalender';
import axiosInstance from '@/services';
import LoadingSpinner from '@/components/utils/LoadingSpinner';
import { useAppContext } from '@/context/AppContext';
import MyShifts from '@/components/header/MyShifts';
import MoreOptions from '@/components/header/MoreOptions';

type Props = {}
const HomeScreen = (props: Props) => {
    const [shifts, setShifts] = useState(false)
    const [addTimeOff, setAddTimeOff] = useState(false)
    const { setShowHeaderCalendar, showHeaderCalendar, showAllShifts, setShowAllShifts, showMoreOptions } = useAppContext()
    const [showRequestIcon, setShowRequestIcon] = useState(false)
    const [showTimeOffAndShiftRequest, setShowTimeOffAndShiftRequest] = useState(false)

    const [myShifts, setMyShifts] = useState(true)


    // Replace after setting up tanstack query
    const [loading, setLoading] = useState(false)


    const options = [
        { label: 'Holiday', value: '1' },
        { label: 'LOA', value: '2' },
        { label: 'Maternity', value: '3' },
        { label: 'Personal', value: '4' },
        { label: 'RDO', value: '5' },
        { label: 'Sick leave', value: '6' },
    ];

    const [selectedValue, setSelectedValue] = useState(null);

    const handleSelect = (value: SetStateAction<null>) => {
        setSelectedValue(value);
        // Additional logic on select
    }

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        console.log(date);
    };

    useEffect(() => {
        console.log('mounted')

        const fetchShifts = async () => {
            setLoading(true)

            try {
                const shifts = await axiosInstance.get('/shifts')
                setShifts(shifts.data)
                console.log(shifts.data);

            } catch (error) {
                setLoading(false)
                console.log(error);

            }
            finally {
                setLoading(false)
            }
        }

        fetchShifts()

    }, [])

    const handleLongPress = () => {
        // setShowRequestIcon(!showRequestIcon)
        console.log('long press');

    }

    return (

        <>
            <View className="flex-1   justify-between">
                <SafeAreaView className='bg-primary pb-10'>
                    <Header
                        title='runshift'
                        calendar={true}
                        filter={true}
                        moreOptions={true}
                        persons={true}

                    />
                </SafeAreaView>

                <View className='bg-white'>
                    <Calender />
                </View>

                <View className='flex-1 bg-white'>
                    {!shifts && <View className='px-6 flex-1 text-base'>
                        <Text style={styles.poppinsRegular} className='mt-10 text-[#606060]'>There are no shifts on this date </Text>

                        <View className=' mt-auto pb-6 items-end'>
                            <TouchableOpacity className='bg-primary flex-row py-3 px-4 rounded-xl  mb-5' >
                                <CalenderIcon />

                                <Text
                                    style={styles.poppinsRegular}
                                    className='text-white ml-2'>request shift</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setAddTimeOff(!addTimeOff)}
                                className='bg-primary flex-row py-3 px-3 rounded-xl mb-5'  >
                                <Clock />
                                <Text
                                    style={styles.poppinsRegular}
                                    className='text-white ml-2'
                                >request time off</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Upload />
                            </TouchableOpacity>
                        </View>

                    </View>


                    }

                    {/* Shifts */}
                    {
                        shifts && <View className='px-6 mt-10 flex-1'>
                            {
                                shifts.map((shift) => (

                                    <Shift
                                        {...shift}
                                        key={shift.id} />
                                ))
                            }

                            {
                                !showRequestIcon ? <View className=' mt-auto pb-6 items-end'>
                                    {
                                        showTimeOffAndShiftRequest && <>
                                            <TouchableOpacity onLongPress={handleLongPress} className='bg-primary flex-row py-3 px-4 rounded-xl  mb-5' >
                                                <CalenderIcon />

                                                <Text
                                                    style={styles.poppinsRegular}
                                                    className='text-white ml-2'>request shift</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => setAddTimeOff(!addTimeOff)}
                                                className='bg-primary flex-row py-3 px-3 rounded-xl mb-5'  >
                                                <Clock />
                                                <Text
                                                    style={styles.poppinsRegular}
                                                    className='text-white ml-2'
                                                >request time off</Text>
                                            </TouchableOpacity>
                                        </>
                                    }

                                    <TouchableOpacity onPress={() => setShowTimeOffAndShiftRequest(!showTimeOffAndShiftRequest)}>
                                        <Upload />
                                    </TouchableOpacity>
                                </View> : <View className='mt-auto'>
                                    <TouchableOpacity className='   items-end absolute right-20 bottom-14'>
                                        <Redo />

                                    </TouchableOpacity>

                                    {/* <TouchableOpacity className='   items-end pb-4'>
                                        <Pencil />
                                    </TouchableOpacity> */}

                                    <TouchableOpacity className='   items-end pb-6'>
                                        <Cancel fill='#175B57' />
                                    </TouchableOpacity>
                                </View>
                            }





                        </View>
                    }

                </View>

                {/* Time off */}
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
                                <CustomSelect header={'I'} options={options} onSelect={handleSelect} />

                            </View>
                            {/* Calender select */}
                            <View className='mb-14 justify-center items-center  flex-row gap-x-5'>
                                <View>
                                    <TimeOffHeader
                                        head={'Select days:'}
                                    />
                                    <Text
                                        className='text-white text-base'
                                        style={styles.poppinsRegular}
                                    >First day off:</Text>
                                    <CustomCalendarSelect onSelect={handleDateSelection} />
                                </View>
                                <View className='mt-14'>

                                    <Arrow />
                                </View>
                                <View>
                                    <TimeOffHeader
                                        head={'Select days:'}
                                    />
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

                                        <Text style={styles.poppinsRegular} className='text-white py-3 px-6 rounded-xl bg-[#27736E]'>18/03/2025</Text>
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


                {/* Header calendar */}
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
                <StatusBar style="auto" />
            </View >
            {
                loading && <LoadingSpinner />
            }
        </>

    )
}
export default HomeScreen

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },



})