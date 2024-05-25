import Calender from '@/assets/icons/header/Calender'
import Filter from '@/assets/icons/header/Filter'
import MoreOptions from '@/assets/icons/header/MoreOptions'
import Persons from '@/assets/icons/header/Persons'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import CustomCalendarSelect from '../utils/CustomCalendarSelect'
import { useState } from 'react'
import HeaderCalendar from '../calender/HeaderCalender'
import { useAppContext } from '@/context/AppContext'
import Person from '@/assets/icons/header/Person'
import Arrow from '@/assets/icons/Arrow'
import ArrowLarge from '@/assets/icons/ArrowLarge'
type Props = {
    title?: string
    calendar?: boolean
    filter?: boolean
    moreOptions?: boolean
    persons?: boolean
    subhead?: string
}
const Header = ({ title, calendar, filter, moreOptions, persons, subhead }: Props) => {
    const navigation = useNavigation()

    // const [showHeaderCalendar, setShowHeaderCalendar] = useState(false)
    const { setShowHeaderCalendar,
        showHeaderCalendar,
        showAllShifts,
        setShowAllShifts, setMoreOptions, showMoreOptions, showFilter, setShowFilter } = useAppContext()

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const handleDateSelection = (date: Date) => {
        // Handle the selected date here
        console.log(date);
    };

    return (
        <View className={`bg-[#175B57] px-6   py-6 max-w-[395px] w-full  mx-auto  rounded-b-3xl ${subhead ? '' : 'pb-10'}`}>
            <View className='flex-row justify-between items-center'>
                <TouchableOpacity onPress={onToggle} className='flex-row  gap-x-2 items-center'>
                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <Path
                            d="M10 15H10.0112M15.0063 15H15.0162M19.9888 15H20"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M2.5 15C2.5 9.1075 2.5 6.16125 4.33 4.33C6.1625 2.5 9.1075 2.5 15 2.5C20.8925 2.5 23.8387 2.5 25.6687 4.33C27.5 6.1625 27.5 9.1075 27.5 15C27.5 20.8925 27.5 23.8387 25.6687 25.6687C23.84 27.5 20.8925 27.5 15 27.5C9.1075 27.5 6.16125 27.5 4.33 25.6687C2.5 23.84 2.5 20.8925 2.5 15Z"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    </Svg>
                    {!showFilter && <Text style={styles.poppinsRegular} className='text-white text-2xl pl-1'>{title || 'runshift'}</Text>}

                </TouchableOpacity>

                {!showFilter &&
                    <View className='flex-row gap-x-4'>
                        {
                            calendar && <TouchableOpacity onPress={() => setShowHeaderCalendar!(!showHeaderCalendar)}>
                                <Calender />
                            </TouchableOpacity>
                        }

                        {
                            persons && <TouchableOpacity onPress={() => setShowAllShifts!(!showAllShifts)}>
                                <Persons />
                            </TouchableOpacity>
                        }

                        {
                            filter && <TouchableOpacity onPress={() => setShowFilter!(!showFilter)}>
                                <Filter />
                            </TouchableOpacity>
                        }

                        {
                            moreOptions && <TouchableOpacity onPress={() => setMoreOptions!(!showMoreOptions)}>
                                <MoreOptions />
                            </TouchableOpacity>
                        }

                    </View>
                }

                {
                    showFilter && <View className='flex-1 flex-row justify-between border-b ml-4 w-full border-white'>
                        <TextInput
                            style={styles.poppinsRegular}
                            placeholder='filter'
                            className=' text-2xl'
                            placeholderTextColor={'white'}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={() => setShowFilter!(!showFilter)}>

                            <ArrowLarge />
                        </TouchableOpacity>

                    </View>
                }



            </View>



            {subhead && <Text style={styles.poppinsRegular} className='text-white pt-6 text-base pl-1'>{subhead}</Text>}



        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
})