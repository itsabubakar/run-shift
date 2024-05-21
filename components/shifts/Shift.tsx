import ProfilePicture from '@/assets/icons/ProfilePicture'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CheckBox from '../utils/CustomCheckBox'
import { Key, useState } from 'react'
type Props = {}
const Shift = (props: Props) => {
    const [showCheckBoxes, setShowCheckBoxes] = useState(false)
    const [isChecked, setChecked] = useState(false)

    console.log(props.info);


    return (
        <View className='border-t border-gray-300 py-2 flex-row justify-between'>
            <View>

                <Text style={styles.poppinsRegular} className='text-xl'>{props?.user?.name}</Text>
                {

                    !showCheckBoxes && <ProfilePicture />
                }
            </View>
            <View className=''>
                {props?.info.map((info: any, index: Key | null | undefined) => (
                    <TouchableOpacity key={index} onLongPress={() => setShowCheckBoxes(!showCheckBoxes)} className={`flex-row ${showCheckBoxes && 'bg-[#F0F0F0]'} p-1 mb-2 rounded-2xl`}>
                        <Text style={styles.poppinsRegular} className='bg-secondary px-3  text-white rounded-2xl py-3'>{info}</Text>
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
                ))}


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