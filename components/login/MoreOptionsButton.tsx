import { Link } from "expo-router"
import { Image, Text, TouchableOpacity } from "react-native"

type Props = {
    icon: string
    text: string
}
const MoreOptionsButton = ({ icon, text }: Props) => {
    return (
        <TouchableOpacity className="w-[220px] px-4 py-3 rounded-md mb-5  justify-between h-[90px]  flex-row  bg-secondary">
            <Link className="self-center" href={'/options'}>
                <Text className="text-white text-lg">Login</Text>
            </Link>
            <Image className="self-end" source={require('../../assets/images/arrow.png')} />
        </TouchableOpacity>
    )
}
export default MoreOptionsButton