import ProfilePicture from '@/assets/icons/ProfilePicture'
import { useAppContext } from '@/context/AppContext'
import { View, Text, StyleSheet } from 'react-native'
type Props = {
    firstName: string
    email: string
}
const Staff = (props: Props) => {
    const { fontSize } = useAppContext()

    return (
        <View className='px-6 pt-10'>
            <View className='flex-row bg-white border-b-[#E9E9E9] border-b   pb-[47px] '>
                <View className=" h-[50] w-[50]  ">
                    <ProfilePicture />
                </View>
                <View className='ml-10'>
                    <Text className='text-xl text-[#606060]' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>{props.firstName}</Text>
                    <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]} className='bg-[#175B5726] px-2 py-1 rounded-full text-[12px] -ml-2'>{props.email}</Text>
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
export default Staff