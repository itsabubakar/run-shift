import ProfilePicture from '@/assets/icons/ProfilePicture'
import Header from '@/components/header/Header'
import Staff from '@/components/staff/Staff'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>
            <Header
                title='staff'
                calendar={true}
                filter={true}
                moreOptions={true}

            />

            <View className='flex-1  bg-white  '>
                <Staff />
                <Staff />
                <Staff />
                <Staff />
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