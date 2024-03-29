import Calender from '@/assets/icons/header/Calender'
import Filter from '@/assets/icons/header/Filter'
import MoreOptions from '@/assets/icons/header/MoreOptions'
import Persons from '@/assets/icons/header/Persons'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
type Props = {}
const Header = (props: Props) => {
    const navigation = useNavigation()
    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer())
    }

    return (
        <View className='bg-[#175B57] pt-12 max-w-[395px] w-full  mx-auto flex-row px-6 justify-between items-end pb-3'>
            <TouchableOpacity onPress={onToggle} className='flex-row '>
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
                <Text style={styles.poppinsRegular} className='text-white text-2xl pl-1'>runshift</Text>
            </TouchableOpacity>

            <View className='flex-row p gap-x-4'>
                <TouchableOpacity>
                    <Calender />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Persons />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Filter />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MoreOptions />
                </TouchableOpacity>

            </View>
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