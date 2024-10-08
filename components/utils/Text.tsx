import { View, Text, StyleSheet } from 'react-native'
type Props = {}
const Calender = (props: Props) => {
    return (
        <View className=' bg-[#1D504D]  py-5  px-6 flex-row justify-between rounded-3xl -mt-12'>
            <View>

                <Text style={styles.poppinsRegular} className='text-white pb-3'>FEBRUARY 2024</Text>
                <View className='flex-row gap-2'>
                    <View className='bg-[#FFFFFF40] rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>FR</Text>
                        <Text style={styles.poppinsRegular} className='bg-secondary text-white px-2 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2 '>SA</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>SU</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>SU</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>Mo</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>


                </View>
            </View>
            <View className='border-l border-gray-500 pl-4'>
                <Text style={styles.poppinsRegular} className='text-white pb-3'>MARCH 2024</Text>

                <View className='flex-row gap-2'>
                    <View className='rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>FR</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>SA</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>
                    <View className=' rounded-xl'>
                        <Text style={styles.poppinsRegular} className='text-[#FFFFFF99] p-2'>SU</Text>
                        <Text style={styles.poppinsRegular} className=' text-white px-1 py-1 rounded-xl'>23</Text>
                    </View>




                </View>

            </View>
        </View>
    )
}
export default Calender

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
    daysContainer: {
        // Your days container styles, make sure it allows wrapping for the days
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayContainer: {
        // Your day container styles
        padding: 10,
        margin: 5,
        // ... other styles
    },
    activeDay: {
        backgroundColor: '#FFD700', // Replace with your highlight color
        // ... other active day styles
    },
    dayOfWeek: {
        // Styles for the day of the week text
    },
    dayOfMonth: {
        // Styles for the day of the month text
    },
})