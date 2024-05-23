import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Person from '@/assets/icons/header/Person';
import CheckBox from '../settings/CheckBox';
import Persons from '@/assets/icons/header/Persons';
import { useAppContext } from '@/context/AppContext';
import Settings from '@/assets/icons/drawer/Settings';
import CalenderIcon from '@/assets/icons/CalenderIcon';
import Weathericon from '@/assets/icons/Weathericon';
import Help from '@/assets/icons/Help';



const MoreOptions = () => {
    const {
        showMoreOptions,
        setMoreOptions } = useAppContext()

    return (
        <View className=''>

            <Modal visible={showMoreOptions} transparent={true} onRequestClose={() => setMoreOptions!(!showMoreOptions)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setMoreOptions!(!showMoreOptions)}>
                    <View style={styles.modalContent}>

                        <TouchableOpacity className='py-3 flex-row '>
                            <CalenderIcon />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>Calender</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='py-3 flex-row '>
                            <Weathericon />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>weather forecast</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='py-3 flex-row '>
                            <Person />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>show profile pictures</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className='py-3 flex-row '>
                            <Help />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>help</Text>
                            <CheckBox
                                color={'white'}
                                isCheck={true}
                                onChecked={() => console.log('hello')
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className='py-3 flex-row '>
                            <Settings color={'white'} />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>settings</Text>
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

export default MoreOptions;