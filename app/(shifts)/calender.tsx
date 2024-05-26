import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Calender = () => {
    const { fontSize } = useAppContext()
    return (
        <SafeAreaView className="flex-1 bg-primary ">
            <Header
                title='calendar feeds'
                moreOptions={true}
            />
            <ScrollView>

                <View className=' pt-10 px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>With the calendar feed below, you can exhibit your upcoming shifts in Google Calendar, Apple's iCal, Windows Live Calendar, or any other application that supports iCal.</Text>
                </View>
                <View className='pt-[40px] px-6'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>Instructions for linking the feed may vary, but in most applications, you can directly paste your feed URL (provided below) into the calendar app.</Text>
                </View>
                <View className='mx-6 mt-10 bg-white  rounded-xl'>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-black text-base p-6'>CWKLLCBLVND LKlkcbnlcnolcTo display the weather in degrees celsius, tick this option. To display the weather using fahrenheit, untick this optionckcb cblcbblblc kbscklbclbslcbcb CWKLLC BLVND LKlkcb nlcnolcTo display the weather in degrees
                        celsius, tick this option. To display the
                        weather using fahrenheit, untick this
                        optionck cbcblc bblblc kbsckl bclbslc bcb</Text>
                </View>
                <View className='items-end mt-5 px-6 pb-10'>
                    <TouchableOpacity className='border-secondary border 
                    rounded-xl px-6 py-2'>
                        <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-sm'>COPY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
        lineHeight: 24
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
})
export default Calender