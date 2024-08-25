import { View, Text, StyleSheet } from 'react-native'
type Props = {
    head: string
}
const TimeOffHeader = ({ head }: Props) => {
    return (
        <View>
            <Text className='text-xl text-[#21D0C6] pb-1 w-full' style={styles.poppinsRegular}>{head}</Text>
        </View>
    )
}
export default TimeOffHeader

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },



})