import ProfilePicture from '@/assets/icons/ProfilePicture'
import Header from '@/components/header/Header'
import Staff from '@/components/staff/Staff'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import axiosInstance from '@/services'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
type Props = {}
const Screen = (props: Props) => {
    const [staff, setStaff] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('staff screen mouted');

        const fetchStaff = async () => {
            setLoading(true)
            try {
                // setLoading(false)
                const staffs = await axiosInstance.get('/staff')
                console.log(staffs.data);

                setStaff(staffs.data)
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
        <View className="flex-1 bg-white">

            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>
            <Header
                title='staff'
            // moreOptions={true}

            />

            <View className='flex-1  bg-white  '>
                {
                    staff.map((staff: {}, index) => {
                        return <Staff {...staff} key={index} />
                    })
                }


            </View>

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