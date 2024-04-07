import Cancel from '@/assets/icons/Cancel'
import Check from '@/assets/icons/Check'
import Send from '@/assets/icons/Send'
import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import { Link } from 'expo-router'
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

            <Header title='notice board'
                calendar={true}
                filter={true}
                moreOptions={true}
            />
            <View className='flex-1 justify-between bg-white px-6'>
                <View>
                    <Link href={'/(shifts)/(notice)/text'}>
                        <Notice />
                    </Link>
                    <Notice />
                </View>
                <TouchableOpacity className='bg-primary rounded-xl justify-between p-4 items-center flex-row  mb-10'>
                    <Text style={styles.poppinsRegular} className='text-white '>Your message</Text>
                    <Send />
                </TouchableOpacity>
            </View>
            {
                showDelete && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                    </View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-6">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8  -mt-[500px] ">Are you sure you want to delete the selected message ?</Text>
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