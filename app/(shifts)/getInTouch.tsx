import Exclamination from '@/assets/icons/Exclamination'
import Letter from '@/assets/icons/Letter'
import Header from '@/components/header/Header'
import { useAppContext } from '@/context/AppContext'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const GetInTouch = () => {
    const { fontSize } = useAppContext()
    const openEmailApp = () => {
        const email = 'info@pedagogichub.com';
        const url = `mailto:${email}`;

        Linking.openURL(url).catch((err) => console.error('Error opening email app:', err));
    };
    return (
        <SafeAreaView className="flex-1 bg-primary ">
            <Header
                title='get in touch'
                moreOptions={true}
            />
            <View className='mx-6 mt-10 bg-white  rounded-xl p-4'>
                <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-black text-base'>The options below are exclusively for reaching out to the Runshift support team. If you wish to communicate with your manager, please contact them directly.</Text>
                <View className='items-end'>
                    <Exclamination />
                </View>
            </View>
            <View className=' pt-10 px-6'>
                <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='text-white text-base'>Have questions about this app? Feel free to reach out to our support team, available online from 12 am to 10 pm (GMT), Monday through Friday. If it's outside these hours, you can still leave them a message at any time.</Text>
            </View>

            <TouchableOpacity
                onPress={openEmailApp}
                className='mt-auto bg-[#27736E] justify-end align-end ml-auto mr-6 mb-10 p-4 rounded-xl'>
                <Letter />
            </TouchableOpacity>


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
export default GetInTouch