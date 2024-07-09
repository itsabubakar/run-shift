import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
    isChecked: boolean;
    onCheck: () => void;
    color?: string
};

const CustomCheckbox: React.FC<Props> = ({ isChecked, onCheck, color }: Props) => {

    return (
        <TouchableOpacity style={[styles.checkbox, {
            borderColor: color === 'white' ? "#ffffff" : color
        }]} onPress={onCheck}>
            {isChecked && (
                <Svg width="15" height="11" viewBox="0 0 15 11" fill="none" >
                    <Path d="M5.03513 9.79663L5.03656 9.7952L1.16917 5.92781C1.03862 5.79283 0.966299 5.61197 0.967796 5.42418C0.969294 5.2364 1.04449 5.05672 1.17718 4.92384C1.30987 4.79095 1.48945 4.71551 1.67723 4.71374C1.86501 4.71198 2.04598 4.78404 2.18114 4.91441L6.04853 8.78251L13.6451 1.18739C13.7111 1.11899 13.7902 1.06443 13.8776 1.02689C13.9649 0.98936 14.0589 0.969603 14.154 0.968777C14.2491 0.967951 14.3434 0.986071 14.4314 1.02208C14.5194 1.05809 14.5994 1.11127 14.6666 1.17852C14.7339 1.24576 14.7871 1.32572 14.8231 1.41374C14.8591 1.50175 14.8772 1.59606 14.8764 1.69116C14.8756 1.78625 14.8558 1.88023 14.8183 1.96761C14.7807 2.05498 14.7262 2.13401 14.6578 2.20008L6.55415 10.303C6.41985 10.4372 6.23772 10.5127 6.04781 10.5127C5.85791 10.5127 5.67578 10.4372 5.54147 10.303L5.03513 9.79663Z" fill="white" />
                </Svg>


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
        // opacity: 0.5,
        backgroundColor: 'transparent', // Checkbox background color
    },

    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

const CheckBox = ({ isCheck, onChecked, color }: any) => {
    // const [isChecked, setChecked] = useState(false);
    console.log(isCheck);

    return (
        <View style={styles.container}>
            <CustomCheckbox
                color={color}
                isChecked={isCheck}
                onCheck={() => onChecked(!isCheck)}
            />
        </View>
    );
};



export default CheckBox;