import ProfilePicture from '@/assets/icons/ProfilePicture'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
type Props = {}
const NoticeMessage = (props: Props) => {
    return (
        <View className='pt-10'>
            <View className='flex-row justify-between'>
                <View className="  max-w-[90px] mr-2 ">
                    <Text className='text-xl text-[#175B57] pb-1' style={styles.poppinsRegular}>Ifeoluwa</Text>
                    <ProfilePicture />
                    <Text className='text-[12px] pt-2  text-[#175B57]' style={styles.poppinsRegular}>Email and                        push</Text>
                </View>
                <View className=''>
                    <Text style={styles.poppinsRegular} className='bg-[#A4A705] text-white px-3 py-3 rounded-xl text-[14px] max-w-[240px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam vel voluptatem, totam distinctio est magni aliquid, iste quod aliquam repellat libero sint ratione cum! Qui veniam iure ipsam nobis voluptatibus. Brood on this idea,</Text>
                    <Text className='text-[12px]   self-end pt-2  text-[#175B57]' style={styles.poppinsRegular}>2 minutes ago</Text>
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

export default NoticeMessage