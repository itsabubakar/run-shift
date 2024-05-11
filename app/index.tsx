import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from "@/components/utils/CustomCheckBox";
import EyeOpen from "@/assets/icons/EyeOpen";
import EyeClose from "@/assets/icons/EyeClose";
import { useAuth } from "@/context/AuthContext";
import { logoSm } from "@/assets/images";

type Props = {}
const index = (props: Props) => {
    const [isChecked, setChecked] = useState(false)
    const [showError, setShowError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('admin');
    const [email, setEmail] = useState('admin')

    const { onLogin, onSignUp } = useAuth()
    const router = useRouter()


    const onAdminLoginPress = async () => {
        console.log(email, password);

        onSignUp!(email, password)
        router.replace('/(shifts)')


    }
    const onStaffLoginPress = async () => {
        onLogin!('staff', 'staff')
        router.replace('/(shifts)')

    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <KeyboardAwareScrollView
            className={`${showError ? 'bg-[#175b57]' : 'bg-primary'}`}
            style={styles.flexContainer}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
            <SafeAreaView style={styles.flexContainer} className={`flex-1   justify-between `}>

                <View className="flex-col flex-1 justify-center items-center pt-[50%]">
                    <View className='pb-8  w-full max-w-[308px] mx-auto'>
                        <Image className="w-[83px] object-cover" source={logoSm} />
                    </View>
                    <TextInput style={styles.poppinsRegular}
                        placeholderTextColor="#c2c2c2" className='border border-[#FFF]/25 rounded-2xl py-3 px-3 placeholder:text-lg text-white max-w-[308px] min-w-[308px]' placeholder='Email address' />

                    <View className=" border border-[#ffffff]/25 rounded-2xl flex flex-row items-center justify-between w-full mt-5 py-3 px-3 max-w-[308px] min-w-[308px]">
                        <TextInput
                            style={styles.poppinsRegular}
                            placeholderTextColor="#c2c2c2"
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            onChangeText={text => setPassword(text)}
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            underlineColorAndroid="transparent"
                            selectionColor="white"
                            maxLength={32}
                            className='  w-[80%] placeholder:text-lg  text-white '
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            {passwordVisible ? <EyeClose /> : <EyeOpen />}
                        </TouchableOpacity>
                    </View>

                    <View className='pt-8 pb-10 max-w-[308px] w-full flex-row items-center justify-between px-2'>
                        <Text style={styles.poppinsRegular} className='text-white text-left text-lg'>Keep me logged in</Text>


                        <CheckBox
                            isCheck={isChecked}
                            onChecked={() => setChecked(!isChecked)}
                        />
                    </View>

                    <View

                    >
                        <TouchableOpacity
                            onPress={onStaffLoginPress}
                        >
                            <Text style={styles.poppinsRegular} className='text-center bg-secondary py-4  text-lg rounded-2xl max-w-[308px] min-w-[308px] text-white'>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='pt-8 pb-10 max-w-[308px] w-full'>
                        <Link href={'/reset'} style={styles.poppinsRegular} className='text-white text-lg'>Forgotten your password?</Link>
                    </View>
                </View>

                <View className='flex justify-end items-end pr-8 pb-8'>

                    <Link href={'/options'} asChild>
                        <TouchableOpacity>
                            {/* Change to an icon */}
                            <Image source={require('../assets/images/LoginMenu.png')} />
                        </TouchableOpacity>
                    </Link>
                </View>


                {/* Shows error if any */}

                {
                    showError && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                        <View className=" h-[67%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                        </View>
                        <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center items-center">
                            <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 text-center -mt-[500px] max-w-[208px]">Kindly enter your email address.</Text>
                            <TouchableOpacity onPress={() => setShowError(!showError)}>
                                {/* Change to an icon */}
                                <Image className="w-[51px] object-cover" source={require('../assets/images/Tick.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                }

                <StatusBar style="auto" />
            </SafeAreaView>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },

    flexContainer: {
        flex: 1,
    },

})

export default index