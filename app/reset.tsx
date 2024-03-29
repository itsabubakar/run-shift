import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

type Props = {}
const reset = (props: Props) => {
    const [passwordReset, setPasswordReset] = useState(false)

    return (
        <SafeAreaView className={`flex-1  ${passwordReset ? 'bg-[#175b57]' : 'bg-primary'} justify-between`}>

            <View className="flex-col flex-1 justify-center items-center">
                <View className='pb-8  w-full max-w-[308px] mx-auto'>
                    <Image className="w-[83px] object-cover" source={require('../assets/images/logo-sm.png')} />
                </View>

                <View className=" border border-white rounded-2xl flex flex-row items-center justify-between w-full mt-5 py-2 px-3 max-w-[308px] min-w-[308px]">
                    <TextInput style={styles.poppinsRegular} placeholderTextColor="#FFF" className='  w-[80%] placeholder:text-lg   ' placeholder='Input new password' />
                    <TouchableOpacity>
                        <Image className="w-[24px] object-cover" source={require('../assets/images/eye.png')} />
                    </TouchableOpacity>
                </View>
                <View className=" border border-white rounded-2xl flex flex-row items-center justify-between w-full mt-5 py-2 px-3 max-w-[308px] min-w-[308px]">
                    <TextInput style={styles.poppinsRegular} placeholderTextColor="#FFF" className='  w-[80%] placeholder:text-lg   ' placeholder='Input new password' />
                    <TouchableOpacity>
                        <Image className="w-[24px] object-cover" source={require('../assets/images/eye.png')} />
                    </TouchableOpacity>
                </View>


                <Link className="mt-24" style={styles.poppinsRegular} href={'/signUp'}>
                    <TouchableOpacity onPress={() => setPasswordReset(!passwordReset)}>
                        <Text style={styles.poppinsRegular} className='text-center bg-secondary py-4  text-lg rounded-2xl max-w-[308px] min-w-[308px] text-white'>Reset Password</Text>
                    </TouchableOpacity>
                </Link>

            </View>



            {
                passwordReset && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className=" h-[67%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                    </View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center items-center">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 text-center -mt-[500px] max-w-[208px]">Password reset successful</Text>
                        <TouchableOpacity onPress={() => setPasswordReset(!passwordReset)}>
                            <Image className="w-[51px] object-cover" source={require('../assets/images/Tick.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
            }



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
export default reset