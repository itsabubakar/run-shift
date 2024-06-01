import { tick } from '@/assets/images'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
type Props = {
    errorField: string
    resetError: () => void
}
const ErrorModal = ({ resetError, errorField }: Props) => {
    return (
        <View className=" h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
            <View className=" h-[67%]  bottom-0 w-full rounded-t-[20px] justify-center items-center">
            </View>
            <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center items-center">
                <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 text-center -mt-[500px] max-w-[208px]">
                    {errorField}
                </Text>
                <TouchableOpacity onPress={resetError}>
                    {/* Change to an icon */}
                    <Image className="w-[51px] object-cover" source={tick} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },


})
export default ErrorModal