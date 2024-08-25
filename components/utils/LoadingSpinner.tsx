import { View, Text, ActivityIndicator } from 'react-native'
type Props = {}
const LoadingSpinner = (props: Props) => {
    return (
        <View className=" h-full border-2 absolute w-full justify-center items-center  bg-[#000000b0]">

            <ActivityIndicator size="large" color={"bg-primary"} />
        </View>
    )
}
export default LoadingSpinner