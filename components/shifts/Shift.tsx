import ProfilePicture from '@/assets/icons/ProfilePicture'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CheckBox from '../utils/CustomCheckBox'
import { useState } from 'react'
type Props = {}
const Shift = (props: Props) => {
    const [showCheckBoxes, setShowCheckBoxes] = useState(false)
    const [isChecked, setChecked] = useState(false)

    return (
        <View className='border-t border-gray-300 py-2 flex-row justify-between'>
            <View>

                <Text style={styles.poppinsRegular} className='text-xl'>Sanusi</Text>
                {

                    !showCheckBoxes && <ProfilePicture />
                }
            </View>
            <View className=''>

                <TouchableOpacity onLongPress={() => setShowCheckBoxes(!showCheckBoxes)} className={`flex-row ${showCheckBoxes && 'bg-[#F0F0F0]'} p-1 mb-2 rounded-2xl`}>
                    <Text style={styles.poppinsRegular} className='bg-secondary px-3  text-white rounded-2xl py-3'>Permission to work at me</Text>
                    {
                        showCheckBoxes &&
                        <View className='bg-[#F0F0F0] px-4'>
                            <CheckBox
                                isCheck={isChecked}
                                onChecked={() => setChecked(!isChecked)}
                            />
                        </View>
                    }

                </TouchableOpacity>

                <TouchableOpacity onLongPress={() => setShowCheckBoxes(!showCheckBoxes)} className={`flex-row ${showCheckBoxes && 'bg-[#F0F0F0]'} p-1 mb-2 rounded-2xl`}>
                    <Text style={styles.poppinsRegular} className='bg-secondary px-3  text-white rounded-2xl py-3'>Permission to work at me</Text>
                    {
                        showCheckBoxes &&
                        <View className='bg-[#F0F0F0] px-4'>
                            <CheckBox
                                isCheck={isChecked}
                                onChecked={() => setChecked(!isChecked)}
                            />
                        </View>
                    }

                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Shift

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },



})