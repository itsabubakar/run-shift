import ProfilePicture from '@/assets/icons/ProfilePicture'
import { useAppContext } from '@/context/AppContext'
import { useAuth } from '@/context/AuthContext'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
type Props = {
    notification: string
}
const Notice = ({ notification }: Props) => {
    const { authState,setAuthState } = useAuth()

    const { fontSize } = useAppContext()
    return (<View className='pt-10 pb-4 '>
        <View className='min-w-[300px] justify-between  flex-row flex  w-full'>
            <View className="  max-w-[90px] ">
                <Text className='text-xl text-[#175B57] pb-1' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>{authState?.firstName}</Text>
                <ProfilePicture />
            </View>

            <View className='ml-10 flex-1 '>
                <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='bg-[#6E6E6E] text-white px-3 py-3 rounded-xl text-[14px] min-h-[94px] max-w-[260px] min-w-[200px]'>{notification}!</Text>
            </View>
        </View>
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

export default Notice