import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Person from '@/assets/icons/header/Person';
import CheckBox from '../settings/CheckBox';
import Persons from '@/assets/icons/header/Persons';
import { useAppContext } from '@/context/AppContext';



const MyShifts = () => {
    const {
        showAllShifts,
        setShowAllShifts } = useAppContext()

    return (
        <View>

            <Modal visible={showAllShifts} transparent={true} onRequestClose={() => setShowAllShifts!(!showAllShifts)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowAllShifts!(!showAllShifts)}>
                    <View style={styles.modalContent}>

                        <TouchableOpacity className='py-3 flex-row '>
                            <Person />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>My Shifts</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className='py-3 flex-row '>
                            <Persons />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>All Shifts</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#175B57',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginRight: 10,
    },

    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
});

export default MyShifts;