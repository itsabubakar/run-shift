import Cancel from '@/assets/icons/Cancel'
import Check from '@/assets/icons/Check'
import Jpg from '@/assets/icons/Jpg'
import Upload from '@/assets/icons/Upload'
import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    const [showDelete, setShowDelete] = useState(false)

    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>

            <Header title='uploads'
                calendar={true}
                filter={true}
                moreOptions={true}
            />
            <View className='flex-1 justify-between bg-white px-6'>
                <View className='pt-10 gap-y-10'>
                    <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)} className='flex-row'>
                        <View>
                            <Jpg />
                        </View>
                        <View className='ml-4'>

                            <Text className='bg-[#626262] text-white px-3 rounded-lg mb-1 py-2 text-base' style={styles.poppinsRegular} >IMG -2e22e4-22</Text>
                            <Text className='text-sm text-[#606060]' style={styles.poppinsRegular}>A few seconds ago</Text>
                            <Text className='text-sm text-[#606060]' style={styles.poppinsRegular}>45.78kb</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)} className='flex-row'>
                        <View>
                            <Jpg />
                        </View>
                        <View className='ml-4'>

                            <Text className='bg-[#626262] text-white px-3 rounded-lg mb-1 py-2 text-base' style={styles.poppinsRegular} >IMG -2e22e4-22</Text>
                            <Text className='text-sm text-[#606060]' style={styles.poppinsRegular}>A few seconds ago</Text>
                            <Text className='text-sm text-[#606060]' style={styles.poppinsRegular}>45.78kb</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setShowDelete(!showDelete)} className=' items-end rounded-xl  mb-10'>
                    <Upload />
                </TouchableOpacity>
            </View>
            {
                showDelete && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                    </View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-6">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8  -mt-[500px] ">Are you sure you want to delete this selected file ?</Text>
                        <View className='justify-end flex-row gap-x-[76px]'>
                            <TouchableOpacity className='flex-row ' onPress={() => setShowDelete(!showDelete)}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row ' onPress={() => setShowDelete(!showDelete)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            }
            <StatusBar style="auto" />
        </View>
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