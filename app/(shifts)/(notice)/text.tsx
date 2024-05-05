import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import Check from '@/assets/icons/Check'
import Send from '@/assets/icons/Send'
import Header from '@/components/header/Header'
import NoticeMessage from '@/components/noticeBoard/NoticeMessage'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaView } from 'react-native-safe-area-context'
import Delete from '@/components/noticeBoard/Delete';
import Cancel from '@/components/noticeBoard/Cancel';
type Props = {}
const Screen = (props: Props) => {
    const [showError, setShowError] = useState(true)

    const [showOptions, setShowOptions] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1 }} className={`flex-1   justify-between bg-primary `}>

            <KeyboardAwareScrollView
                className={`${showError ? 'bg-white' : 'bg-white'}`}
                style={{ flex: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}>
                <Header title='notice board'
                    calendar={true}
                    filter={true}
                    moreOptions={true}
                    subhead='run shift board'
                />

                <View className="justify-between">



                    <View className='flex-1 justify-between   bg-white px-6  min-h-[750px]'>
                        <View className=''>
                            <TouchableOpacity onLongPress={() => setShowOptions(!showDelete)}>

                                {/* <NoticeMessage /> */}
                            </TouchableOpacity>

                            <TouchableOpacity onLongPress={() => setShowOptions(!showDelete)}>

                                <NoticeMessage />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>


                {
                    showOptions && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                        <View className=" h-[60%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
                        </View>
                        <View className=" h-full bottom-0 w-full rounded-t-[60px] justify-center  px-8">

                            <View className='gap-y-2 items-end gap-x-[76px] -mt-[600px]'>
                                <TouchableOpacity className='flex-row mr-[70px]' onPress={() => setShowOptions(!showOptions)}>
                                    <Delete />
                                </TouchableOpacity>
                                <TouchableOpacity className='flex-row absolute top-8 ml-2' onPress={() => setShowOptions(!showOptions)}>
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
                            <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8  -mt-[600px] ">Are you sure you want to delete the selected message ?</Text>

                            <View className='justify-end flex-row gap-x-[76px]'>
                                <TouchableOpacity className='flex-row ' onPress={() => setShowOptions(!showOptions)}>
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
            <View className={`bg-white ${showOptions || showDelete ? 'hidden' : 'flex'}`}>
                <View className='bg-[#27736E]   rounded-xl mx-6  px-4 justify-between  items-center flex-row  mb-4'>
                    <TextInput
                        style={styles.poppinsRegular}
                        className='bg-[#27736E] rounded-2xl py-3 px-5 placeholder:text-white text-white  w-4/5 '
                        placeholderTextColor="#FFF"
                        placeholder='Your message' />
                    <Send />
                </View>
            </View>

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