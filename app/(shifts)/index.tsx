import Calender from '@/components/calender/Calender';
import Header from '@/components/header/Header';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import { Ionicons } from '@expo/vector-icons'

type Props = {}
const HomeScreen = (props: Props) => {

    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-10'>
                <Header
                    title='staff'
                    calendar={true}
                    filter={true}
                    moreOptions={true}

                />
            </SafeAreaView>
            <View className='flex-1 bg-white'>
                <Text>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iste deleniti voluptates, sit facere cum quaerat tenetur quos tempora consequuntur sunt modi adipisci nisi, quae dolor. Optio voluptas aliquam minima! </Text>
                <Text>Lorem ipsum, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium iste deleniti voluptates, sit facere cum quaerat tenetur quos tempora consequuntur sunt modi adipisci nisi, quae dolor. Optio voluptas aliquam minima! </Text>
            </View>
            <StatusBar style="auto" />
        </View>

    )
}
export default HomeScreen
const styles = StyleSheet.create({})