import { Link, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from "@/components/utils/CustomCheckBox";
import EyeOpen from "@/assets/icons/EyeOpen";
import EyeClose from "@/assets/icons/EyeClose";
import { useAuth } from "@/context/AuthContext";
import { logoSm, offline, tick } from "@/assets/images";
import axiosInstance from "@/services";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import axios from "axios";
import ErrorModal from "@/components/login/ErrorModal";
import NetInfo from '@react-native-community/netinfo';

// Testing commit from a new pc

type Props = {}

export enum Role {
    STAFF = "staff",
    ADMIN = "admin"
}

NetInfo.fetch().then(networkState => {
    console.log("Connection type - ", networkState.type);
    console.log("Is connected? - ", networkState.isConnected);
});



const Index = (props: Props) => {
    const [isChecked, setChecked] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('12345678');
    const [email, setEmail] = useState('sadiqbilyamin@gmail.com')
    const [isOffline, setIsOffline] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorField, setErrorField] = useState('');

    // Replace after setting up tanstack query
    const [loading, setLoading] = useState(false)

    const { setAuthState } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Subscribe to network state changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!(state.isConnected && state.isInternetReachable));
        });

        // Unsubscribe on cleanup
        return () => unsubscribe();
    }, []);

    const Login = async (email: string, password: string) => {
        if (!email || !password) {
            // Set the error message based on which field is empty
            setErrorField(!email ? 'Please enter an email address' : 'Please enter your password');
            setShowError(true);
            return;
        }
        setLoading(true)
        try {
            // const res = await axiosInstance.post(`/company/login`, { email, password });
            // console.log(res.data);

            // if (setAuthState) {

            //     setAuthState({
            //         authenticated: true,
            //         role: res.data.role,
            //         email: email,
            //         firstName: res.data.firstName,
            //         token: res.data.token,
            //         companyId: res.data.companyId
            //     })
            // }
            router.replace('/(shifts)')

            // axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
            // await SecureStore.setItemAsync('TOKEN_KEY', res.data.token)
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    // Handle 401 Unauthorized error
                    setErrorField('Invalid email or password');
                    setShowError(true);
                    console.log(error);

                    // Alert.alert('Unauthorized', 'Invalid email or password.');
                } else {
                    // Handle other errors
                    setErrorField('An error occurred. Please try again later.');
                    setShowError(true);
                    console.log(error);

                    // Alert.alert('Error', 'An error occurred. Please try again later.');
                }
            } else {
                // Handle non-axios errors
                setErrorField('An error occurred. Please try again later.');
                setShowError(true);
                console.log(error);

                // Alert.alert('Error', 'A non-network error occurred.');
            }
        }
        finally {
            setLoading(false)
        }
    }


    //     setLoading(true);

    //     // Simulate a 5-second delay with a loading screen
    //     await new Promise(resolve => setTimeout(resolve, 5000));

    //     // Hardcoded credentials check
    //     if (email === 'sadiqbilyamin@gmail.com' && password === '123456') {
    //         // Simulate successful login with hardcoded token and role
    //         setAuthState!({
    //             authenticated: true,
    //             role: Role.ADMIN,
    //             username: email,
    //             token: 'hardcoded-token',
    //         });

    //         router.replace('/(shifts)');
    //     } else {
    //         // If credentials do not match, set error
    //         setErrorField('Invalid email or password');
    //         setShowError(true);
    //     }

    //     setLoading(false);
    // }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const resetError = () => {
        setShowError(false);
        setErrorField('');
    };


    return (
        <>

            {!isOffline ? <KeyboardAwareScrollView
                className={`${showError ? 'bg-primary' : 'bg-primary'}`}
                style={styles.flexContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}>
                <SafeAreaView style={styles.flexContainer} className={`flex-1   justify-between `}>

                    <View className="flex-col flex-1 justify-center items-center pt-[50%]">
                        <View className='pb-8  w-full max-w-[308px] mx-auto'>
                            <Image className="w-[83px] object-cover" source={logoSm} />
                        </View>
                        <TextInput style={styles.poppinsRegular}
                            onChangeText={text => setEmail(text)}
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
                                onPress={() => Login(email, password)}
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
                                <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 text-center -mt-[500px] max-w-[208px]">
                                    {errorField}
                                </Text>
                                <TouchableOpacity onPress={resetError}>
                                    {/* Change to an icon */}
                                    <Image className="w-[51px] object-cover" source={tick} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    }














                    <StatusBar style="auto" />
                </SafeAreaView>
                {/* Loading spinner */}
            </KeyboardAwareScrollView> : <>
                <SafeAreaView className="flex-1  bg-primary font-PoppinsRegular">

                    <View className='pb-8 pt-24  w-full max-w-[308px] mx-auto'>
                        <Image className="w-[213px] object-cover" source={offline} />

                    </View>

                    <View className="flex-1 max-w-[308px] mx-auto">
                        <View>
                            <Text style={styles.poppinsSemiBold} className="text-white  text-4xl pb-8">You are offline</Text>
                            <Text style={styles.poppinsRegular} className="text-white text-lg">We are not able to connect to the internet from your device. Please check your settings and try again.</Text>
                        </View>
                    </View>
                    <StatusBar style="auto" />
                </SafeAreaView>

            </>
            }

            {
                loading && <LoadingSpinner />
            }

        </>

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

export default Index