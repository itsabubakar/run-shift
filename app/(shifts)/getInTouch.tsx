import Exclamination from '@/assets/icons/Exclamination'
import Header from '@/components/header/Header'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const getInTouch = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary ">
            <Header
                title='get in touch'
                moreOptions={true}
            />
            <View className='mx-6 mt-10 bg-white  rounded-xl p-4'>
                <Text style={styles.poppinsRegular} className='text-black text-base'>The options below are exclusively for reaching out to the Runshift support team. If you wish to communicate with your manager, please contact them directly.</Text>
                <View className='items-end'>
                    <Exclamination />
                </View>
            </View>
            <View className=' pt-10 px-6'>
                <Text style={styles.poppinsRegular} className='text-white text-base'>Have questions about this app? Feel free to reach out to our support team, available online from 12 am to 10 pm (GMT), Monday through Friday. If it's outside these hours, you can still leave them a message at any time.</Text>
            </View>


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
export default getInTouch