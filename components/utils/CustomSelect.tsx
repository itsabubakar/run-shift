import Chevron from '@/assets/icons/Chevron';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import CheckBox from './CustomCheckBox';

type Option = {
    label: string;
    value: any;
};

type Props = {
    options: Option[];
    onSelect: (value: any) => void;
    header: string;

};

const CustomSelect = ({ options, onSelect, header }: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        onSelect(option.value);
        setIsVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={styles.button}
            >
                <Text
                    className='text-white'
                    style={styles.poppinsRegular}
                >
                    {selectedOption ? selectedOption.label : header}
                </Text>
                <View>
                    <Chevron />

                </View>
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                transparent={true}
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setIsVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity className='items-end pr-2'>
                            <Chevron />
                        </TouchableOpacity>
                        <FlatList
                            data={options}
                            keyExtractor={item => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text
                                        className='text-white'
                                        style={styles.poppinsRegular}
                                    >{item.label}</Text>
                                    <CheckBox />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // Add your Native Wind styles here
    button: {
        // Example style
        padding: 16,
        backgroundColor: '#27736E',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalOverlay: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#A4A705',
        padding: 20,
        borderRadius: 5,
        height: 'auto',
        width: '90%',
        margin: 242,

    },
    option: {
        padding: 10,
        flexDirection: 'row'
        // borderBottomWidth: 1,
        // borderBottomColor: '#f7f7f72b',
    },
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
});

export default CustomSelect;