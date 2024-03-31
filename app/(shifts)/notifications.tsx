import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { View, StyleSheet, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>

            <Header title='notifications'
                calendar={true}
                persons={true}
                filter={true}
                moreOptions={true}
            />
            <View className='flex-1 justify-between bg-white px-6'>
                <View>
                    <Notice />
                    <Notice />
                </View>

            </View>
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