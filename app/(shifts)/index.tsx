import Calender from '@/components/calender/Calender';
import Header from '@/components/header/Header';
import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SetStateAction, useState } from 'react';
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

type Props = {}
const HomeScreen = (props: Props) => {
    const [shifts, setShifts] = useState(false)
    const [addTimeOff, setAddTimeOff] = useState(false)

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

    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-10'>
                <Header
                    title='runshift'
                    calendar={true}
                    filter={true}
                    moreOptions={true}

                />
            </SafeAreaView>
            <Calender />
            <View className='flex-1 bg-white'>
                {!shifts && <View className='px-6 flex-1 text-base'>
                    <Text style={styles.poppinsRegular} className='mt-10 text-[#606060]'>There are no shifts on this date </Text>

                    <View className=' mt-auto pb-6 items-end'>
                        <TouchableOpacity className='bg-primary flex-row py-3 px-4 rounded-xl gap-x-2 mb-5' >
                            <CalenderIcon />
                            <Text
                                style={styles.poppinsRegular}
                                className='text-white'>request shift</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setAddTimeOff(!addTimeOff)}
                            className='bg-primary flex-row py-3 px-4 rounded-xl gap-x-2 mb-5'  >
                            <Clock />
                            <Text
                                style={styles.poppinsRegular}
                                className='text-white'
                            >request time off</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Upload />
                        </TouchableOpacity>
                    </View>

                </View>


                }
                {
                    shifts && <View className='px-6 mt-10 flex-1'>
                        <Shift />
                        <Shift />

                        <View className='mt-auto'>
                            <TouchableOpacity className='   items-end absolute right-20 bottom-14'>
                                <Redo />

                            </TouchableOpacity>
                            <TouchableOpacity className='   items-end pb-4'>
                                <Pencil />

                            </TouchableOpacity>
                            <TouchableOpacity className='   items-end pb-6'>
                                <Cancel fill='#175B57' />
                            </TouchableOpacity>
                        </View>

                    </View>
                }

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

            <StatusBar style="auto" />
        </View >

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