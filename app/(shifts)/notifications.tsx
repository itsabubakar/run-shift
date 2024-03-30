import Header from '@/components/header/Header'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-10'>
                <Header />
            </SafeAreaView>
            <View className='flex-1 bg-white'>
                <Text>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iste deleniti voluptates, sit facere cum quaerat tenetur quos tempora consequuntur sunt modi adipisci nisi, quae dolor. Optio voluptas aliquam minima! </Text>
                <Text>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iste deleniti voluptates, sit facere cum quaerat tenetur quos tempora consequuntur sunt modi adipisci nisi, quae dolor. Optio voluptas aliquam minima! </Text>
                <Text>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iste deleniti voluptates, sit facere cum quaerat tenetur quos tempora consequuntur sunt modi adipisci nisi, quae dolor. Optio voluptas aliquam minima! </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}
export default Screen