import HorizontalDatePicker from '@/components/calender/HorizontalCalender'
import VerticalDateList from '@/components/calender/VerticalCalender'
import Header from '@/components/header/Header'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const HomeScreen = (props: Props) => {
    return (
        <View className='flex-1'>
            <SafeAreaView className='bg-primary pb-10'>
                <Header
                    title='runshift'
                    calendar={true}
                    filter={true}
                    moreOptions={true}
                    persons={true}

                />
            </SafeAreaView>
            <HorizontalDatePicker />
            <VerticalDateList />

        </View>
    )
}
export default HomeScreen