import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

type Props = {
    isChecked: boolean;
    onCheck: () => void;
};

const CustomCheckbox: React.FC<Props> = ({ isChecked, onCheck }: Props) => {
    return (
        <TouchableOpacity style={styles.checkbox} onPress={onCheck}>
            {isChecked && (
                <Image className='w-[19.98px] h-[14px] object-contain' source={require('../../assets/images/checkbox.png')} />

            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 32,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff5a',
        borderRadius: 4,
        opacity: 0.5,
        backgroundColor: 'transparent', // Checkbox background color
    },

    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

const CheckBox = ({ isCheck, onChecked }: any) => {
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <CustomCheckbox
                isChecked={isChecked}
                onCheck={() => setChecked(!isChecked)}
            />
        </View>
    );
};



export default CheckBox;