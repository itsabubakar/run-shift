import ProfilePicture from '@/assets/icons/ProfilePicture'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
type Props = {}
const Notice = (props: Props) => {
    return (<View className='pt-10 pb-20 '>
        <View className='min-w-[300px] justify-between  flex-row flex  w-full'>
            <View className="  max-w-[90px] ">
                <Text className='text-xl text-[#175B57] pb-1' style={styles.poppinsRegular}>Ifeoluwa</Text>
                <ProfilePicture />
            </View>

            <View className='ml-10  '>
                <Text style={styles.poppinsRegular} className='bg-[#6E6E6E] text-white px-3 py-3 rounded-xl text-[14px] min-h-[94px] max-w-[260px] min-w-[200px]'>Run Shift Board</Text>
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