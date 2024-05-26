import Cancel from '@/assets/icons/Cancel'
import Check from '@/assets/icons/Check'
import ProfilePicture from '@/assets/icons/ProfilePicture'
import Send from '@/assets/icons/Send'
import Upload from '@/assets/icons/Upload'
import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'

import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
// import Checkbox from 'expo-checkbox';
import { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import CustomCheckBox from "@/components/utils/CustomCheckBox";
import CheckBox from "@/components/utils/CustomCheckBox";
import Eye from "@/assets/icons/Eye";
type Props = {}
const Screen = (props: Props) => {
    const [showError, setShowError] = useState(false)

    const [showAddPost, setShowAddPost] = useState(true)
    const [showDelete, setShowDelete] = useState(false)

    return (<>
        <View className='bg-[#000000b0]'>

            <SafeAreaView style={styles.flexContainer} className={` bg-primary`}>
            </SafeAreaView>
            <Header title='notice board'
                moreOptions={true}
            />
        </View>
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flex: 1 }}
        // scrollEnabled={!showAddPost}
        >
            <View className='p-6 flex-1 bg-green-300'>



                <Link asChild className=' w-full ' href={'/(shifts)/(notice)/id'}>
                    <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>

                        <Notice notification='hello' />
                    </TouchableOpacity>
                </Link>
                <Link asChild className=' w-full ' href={'/(shifts)/(notice)/id'}>
                    <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>

                        <Notice notification='hello' />
                    </TouchableOpacity>
                </Link>



                <TouchableOpacity onPress={() => setShowAddPost(!showAddPost)} className='self-end mt-auto'>

                    <Upload />
                </TouchableOpacity>

            </View>

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

            {
                showAddPost && <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className="   bottom-0 w-full rounded-t-[20px] justify-center items-center">
                    </View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center  px-8">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-16  -mt-[400px] ">New noticeboard post</Text>
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




            {/* {
                showAddPost && <KeyboardAwareScrollView
                    style={styles.flexContainer}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}
                >
                    <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                        <View className=" mt-[100%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
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

                </KeyboardAwareScrollView>
            } */}

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

    flexContainer: {
        // flex: 1,
    },

})

export default Screen