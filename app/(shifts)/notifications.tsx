import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import axiosInstance from '@/services'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('notifications screen mouted');

        const fetchStaff = async () => {
            setLoading(true)
            try {
                // setLoading(false)
                const notifications = await axiosInstance.get('/notification')
                console.log(notifications.data);

                setNotifications(notifications.data)
            } catch (error) {
                setLoading(false)

                console.log(error);
            }
            finally {
                console.log('done', loading);
                setLoading(false)

            }
        }

        fetchStaff()

    }, [])


    return (
        <View className="flex-1   justify-between">
            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>

            <Header title='notifications'
                moreOptions={true}
            />
            <ScrollView className='flex-1  bg-white px-6'>


                {
                    notifications.map((notification: {}, i) => (
                        <Notice {...notification} key={i} />

                    ))
                }

            </ScrollView>
            <StatusBar style="auto" />
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

export default Screen