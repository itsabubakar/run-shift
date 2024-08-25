import MoreOptionsButton from "@/components/login/MoreOptionsButton"
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {}
const options = (props: Props) => {
    return (
        <SafeAreaView className="flex-1 justify-center  bg-primary items-center">
            <View className="px-5">
                    <Link  asChild className="self-center" href={'/'}>
                <TouchableOpacity className="w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row  bg-secondary">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">Login</Text>
                    <Image className="self-end" source={require('../assets/images/arrow.png')} />
                </TouchableOpacity>
                    </Link>

                <Link asChild className="self-center" href={'/'}>
                    <TouchableOpacity className="w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row border border-white/25">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">Scan a QR code</Text>
                        <Image className="self-end" source={require('../assets/images/scan.png')} />
                    </TouchableOpacity>
                </Link>

                <Link asChild className="self-center" href={'/'}>
                    <TouchableOpacity className="border border-white/25 w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row  ">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">Demo</Text>
                        <Image className="self-end" source={require('../assets/images/pc.png')} />
                    </TouchableOpacity>
                </Link>

                <Link asChild className="self-center" href={'/'}>
                    <TouchableOpacity className="border border-white/25 w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row  ">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">English (UK)</Text>
                        <Image className="self-end" source={require('../assets/images/web.png')} />
                    </TouchableOpacity>
                </Link>

                <Link asChild className="self-center" href={'/'}>

                    <TouchableOpacity className="border border-white/25 w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row  ">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">Desktop Site</Text>
                        <Image className="self-end" source={require('../assets/images/desktop.png')} />
                    </TouchableOpacity>
                </Link>

                <Link className="self-center text-white text-lg" asChild href="/">
                    <TouchableOpacity className="border border-white/25 w-[220px] px-4 py-3 rounded-xl mb-5  justify-between h-[90px]  flex-row  ">
                        <Text style={styles.poppinsRegular} className="text-white text-lg">Exit</Text>

                        <Image className="self-end" source={require('../assets/images/arrow.png')} />
                    </TouchableOpacity>
                </Link>
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

export default options