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
                title='facilities'
                moreOptions={true}

            />

            <View className='flex-1  bg-white px-6 pt-10 '>
                <Text className='text-xl text-[#606060]' style={styles.poppinsRegular}>There are no uploads.</Text>

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