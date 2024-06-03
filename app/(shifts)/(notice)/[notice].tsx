import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import Cancel from '@/assets/icons/Cancel'
import Check from '@/assets/icons/Check'
import Send from '@/assets/icons/Send'
import Header from '@/components/header/Header'
import NoticeMessage from '@/components/noticeBoard/NoticeMessage'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router';
type Props = {}
const Screen = (props: Props) => {
    const [showError, setShowError] = useState(true)

    const [showAddPost, setShowAddPost] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const { notice } = useLocalSearchParams();


    return (
        <>
            <SafeAreaView className={`   bg-primary `}>

            </SafeAreaView>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
                style={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}>


                <View className="flex-1   justify-between">

                    <Header title='notice board'
                        calendar={true}
                        filter={true}
                        moreOptions={true}
                        subhead={notice}
                    />

                    <View className='flex-1  justify-between px-6'>
                        <View className=''>
                            <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>

                                <NoticeMessage />
                            </TouchableOpacity>

                            <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>

                                <NoticeMessage />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
                <View className='flex-1 pb-4'>
                    <View className='  absolute top-[80%]  flex-1 w-full px-6'>
                        <View className='bg-[#27736E] flex-row justify-between items-center w-full px-4  rounded-2xl'>
                            <TextInput
                                style={styles.poppinsRegular}
                                className='bg-[#27736E] rounded-2xl py-3 px-4 placeholder:text-white text-white flex-1 w-full'
                                placeholderTextColor="#FFF"
                                placeholder='Your message' />
                            <Send />
                        </View>
                    </View>

                </View>

                {
                    showAddPost && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                        <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                        </View>
                        <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center  px-8">
                            <Text style={styles.poppinsRegular} className="text-white text-2xl pb-16  -mt-[500px] ">New noticeboard post</Text>
                            <TextInput
                                style={styles.poppinsRegular}
                                className='bg-[#27736E] rounded-2xl py-3 px-4 placeholder:text-white text-white w-full mb-[70px]'
                                placeholderTextColor="#FFF"
                                placeholder='Title' />
                            <View className='justify-end flex-row gap-x-[76px]'>
                                <TouchableOpacity className='flex-row ' onPress={() => setShowAddPost(!showAddPost)}>
                                    <Check />
                                </TouchableOpacity>
                                <TouchableOpacity className='flex-row ' onPress={() => setShowAddPost(!showAddPost)}>
                                    <Cancel />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                }
                {
                    showDelete && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                        <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                        </View>
                        <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center  px-8">
                            <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8  -mt-[500px] ">Are you sure you want to delete the selected message ?</Text>

                            <View className='justify-end flex-row gap-x-[76px]'>
                                <TouchableOpacity className='flex-row ' onPress={() => setShowAddPost(!showAddPost)}>
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

            </KeyboardAwareScrollView>
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
})

export default Screen