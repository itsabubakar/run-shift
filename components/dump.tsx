import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
type Props = {
    myShifts: boolean | undefined
    setMyShifts: React.Dispatch<React.SetStateAction<boolean>> | undefined
}
const MyShifts = ({ myShifts, setMyShifts }: Props) => {
    return (
        <View>

            <Modal visible={myShifts} transparent={true} onRequestClose={() => setMyShifts!(false)}>
                <View style={styles.modalOverlay} >
                    <View style={styles.modalContent}>

                        <TouchableOpacity>
                            <Text className="text-white text-sm" style={styles.poppinsRegular}>My Shifts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-white text-sm" style={styles.poppinsRegular}>All Shifts</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        height: '100%',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#175B57',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginTop: 50,
        marginRight: 10,
    },
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
})
export default MyShifts