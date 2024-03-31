import Header from '@/components/header/Header'
import CheckBox from '@/components/settings/CheckBox'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider';
import { Link } from 'expo-router'

const Screen = () => {
    const [isChecked, setChecked] = useState(false)

    return (
        <SafeAreaView className="flex-1 bg-primary ">
            <View className='pt-4'>

                <Header
                    title='settings'
                    moreOptions={true}
                />
            </View>
            <ScrollView className='px-6 '>
                {/* Push notifications */}
                <View className='flex-row items-start pt-8'>
                    <View>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Push notifications</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base'>Get push notification using this device</Text>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                {/* font size slider */}
                <View className=' items-start pt-20'>
                    <View className='w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Font size</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Enhance the text size across the entire app for improved visibility.</Text>
                    </View>

                    <Slider
                        style={{ width: 340, height: 80 }}
                        minimumValue={0}
                        maximumValue={6}
                        thumbTintColor="#fefefe"
                        minimumTrackTintColor="##21D0C6"
                        maximumTrackTintColor="#fefefe"

                    />
                </View>

                {/* Login with fingerprint */}
                <View className='flex-row items-start pt-20'>
                    <View className=' w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Login with your fingerprints</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Your device processes and stores fingerprints, ensuring they are never shared with Runshift.</Text>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                {/* camera */}
                <View className='flex-row items-start pt-20'>
                    <View className=' w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Camera</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Use the Android camera application for taking photos.</Text>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                {/* Show profile pictures */}
                <View className='flex-row items-start pt-20'>
                    <View className=' w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Show profile pictures</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Utilize the Android camera application to capture photos.</Text>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                {/* Weather forecast */}
                <View className='flex-row items-start pt-20'>
                    <View className='w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Weather forecast</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Display the predicted temperature and weather conditions on the schedule when the forecast information is accessible.</Text>
                        <Link asChild href={'/(shifts)/(settings)/weather'}>

                            <TouchableOpacity className='pt-3'>
                                <Text style={styles.poppinsRegular} className='text-base text-[#21D0C6] underline'>Weather settings</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                {/* Reset the app */}
                <View className=' items-start pt-20'>
                    <View className=' w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Reset the app</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Erase your data from this device and log out.</Text>
                    </View>
                    <TouchableOpacity className='mt-5 border-secondary border rounded-xl px-6 py-2'>
                        <Text style={styles.poppinsRegular} className='text-white text-sm'>REST</Text>
                    </TouchableOpacity>
                </View>

                {/* Version */}
                <View className=' items-start py-20'>
                    <View className=' w-[90%]'>
                        <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>r9y3ri3yry93ry93yry3r
                            ri3yri3rirrh</Text>
                    </View>
                    <TouchableOpacity className='mt-5 border-secondary border rounded-xl px-6 py-2'>
                        <Text style={styles.poppinsRegular} className='text-white text-sm'>COPY</Text>
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

    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
})
export default Screen