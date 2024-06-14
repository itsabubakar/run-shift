import Header from '@/components/header/Header'
import Notice from '@/components/noticeBoard/Notice'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { useAppContext } from '@/context/AppContext'
import axiosInstance from '@/services'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const { fontSize } = useAppContext()


    useEffect(() => {
        console.log('notifications screen mouted');

        const fetchStaff = async () => {
            setLoading(true)
            try {
                // setLoading(false)
                const notifications = await axiosInstance.get('/notifications')
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

                {!loading &&
                    <View>
                        {
                            notifications.length > 0 ? notifications.map((notification: {}, i) => (
                                <Notice {...notification} key={i} />

                            )) : <Text className='mt-2' style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>No Notifications</Text>
                        }

                    </View>

                }



            </ScrollView>
            {loading && <LoadingSpinner />}

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