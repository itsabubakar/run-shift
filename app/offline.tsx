import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {}
const offline = (props: Props) => {
    return (
        <SafeAreaView className="flex-1  bg-primary font-PoppinsRegular">

            <View className='pb-8 pt-24  w-full max-w-[308px] mx-auto'>
                <Image className="w-[213px] object-cover" source={require('../assets/images/offline.png')} />

            </View>

            <View className="flex-1 max-w-[308px] mx-auto">
                <View>
                    <Text style={styles.poppinsSemiBold} className="text-white  text-4xl pb-8">You are offline</Text>
                    <Text style={styles.poppinsRegular} className="text-white text-lg">We are not able to connect to the internet from your device. Please check your settings and try again.</Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
})

export default offline