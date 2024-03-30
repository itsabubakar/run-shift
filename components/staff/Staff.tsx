import ProfilePicture from '@/assets/icons/ProfilePicture'
import { View, Text, StyleSheet } from 'react-native'
type Props = {}
const Staff = (props: Props) => {
    return (
        <View className='px-6 pt-10'>
            <View className='flex-row border-b-[#E9E9E9] border-b   pb-[47px] '>
                <View className=" h-[50] w-[50]  ">
                    <ProfilePicture />
                </View>
                <View className='ml-10'>
                    <Text className='text-xl text-[#606060]' style={styles.poppinsRegular}>Ifeoluwa</Text>
                    <Text style={styles.poppinsRegular} className='bg-[#175B5726] px-2 py-1 rounded-full text-[12px] -ml-2'>alaoIfeoluwa@gmail.com</Text>
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