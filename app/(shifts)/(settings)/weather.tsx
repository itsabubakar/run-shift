import Header from '@/components/header/Header'
import CheckBox from '@/components/settings/CheckBox'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider';

const Screen = () => {
    const [isChecked, setChecked] = useState(false)

    return (
        <SafeAreaView className="flex-1 bg-primary ">
            <View className='pt-4'>

                <Header
                    title='weather settings'
                    moreOptions={true}
                />
            </View>
            <ScrollView className='px-6 '>
                {/* Weather forecast */}
                <View className='flex-row items-start pt-8'>
                    <View>
                        <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Weather forecast</Text>
                        <Text style={styles.poppinsRegular} className='text-white text-base'>Display the predicted temperature and weather conditions on the schedule when the forecast information is accessible.</Text>
                    </View>

                    <CheckBox
                        isCheck={isChecked}
                        onChecked={() => setChecked(!isChecked)}
                    />
                </View>

                <View className={`${!isChecked ? 'opacity-20' : ''}`}>
                    {/* Weather forecast location */}
                    <View className=' items-start pt-20'>
                        <View className=''>
                            <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Weather forecast location</Text>
                            <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>If you do not provide a valid location
                                below we will try to detect your location
                                using GPS and your IP address.</Text>
                            <Text style={styles.poppinsRegular} className='mt-5 border-secondary border rounded-xl px-6 py-2 text-white'>City, country</Text>
                        </View>
                    </View>

                    {/* Wind information */}
                    <View className='flex-row items-start pt-20'>
                        <View className=' w-[90%]'>
                            <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Wind information</Text>
                            <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Show forecasted wind speeds and
                                directions where possible.</Text>
                        </View>

                        <CheckBox
                            isCheck={isChecked}
                            onChecked={() => setChecked(!isChecked)}
                        />
                    </View>

                    {/* temperatures */}
                    <View className='flex-row items-start pt-20'>
                        <View className=' w-[90%]'>
                            <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2'>Temperatures</Text>
                            <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>Show forecasted day and night
                                temperatures where possible.</Text>
                        </View>

                        <CheckBox
                            isCheck={isChecked}
                            onChecked={() => setChecked(!isChecked)}
                        />
                    </View>

                    {/* Display the weather using
metric units */}
                    <View className='flex-row items-start py-20'>
                        <View className=' w-[90%]'>
                            <Text style={styles.poppinsRegular} className='text-[#21D0C6] text-2xl pb-2 leading-9'>Display the weather using
                                metric units</Text>
                            <Text style={styles.poppinsRegular} className='text-white text-base leading-6'>To display the weather in degrees
                                celsius, tick this option. To display the
                                weather using fahrenheit, untick this
                                option.</Text>
                        </View>

                        <CheckBox
                            isCheck={isChecked}
                            onChecked={() => setChecked(!isChecked)}
                        />
                    </View>
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