import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Person from '@/assets/icons/header/Person';
import CheckBox from '../settings/CheckBox';
import Persons from '@/assets/icons/header/Persons';
import { useAppContext } from '@/context/AppContext';
import Settings from '@/assets/icons/drawer/Settings';
import CalenderIcon from '@/assets/icons/CalenderIcon';
import WeatherIcon from '@/assets/icons/WeatherIcon';
import Help from '@/assets/icons/Help';
import { usePathname } from 'expo-router';
import EyeClose from '@/assets/icons/EyeClose';



const MoreOptions = () => {
    const {
        showMoreOptions,
        setMoreOptions, showProfilePicture, setShowProfilePicture } = useAppContext()

    const pathname = usePathname();
    console.log(pathname);

    return (
        <View className=''>

            <Modal visible={showMoreOptions} transparent={true} onRequestClose={() => setMoreOptions!(!showMoreOptions)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setMoreOptions!(!showMoreOptions)}>
                    <View style={styles.modalContent}>

                        {/* Home page */}

                        {
                            pathname === '/' && <>
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
                                    <WeatherIcon />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>weather forecast</Text>
                                    <CheckBox
                                        color={'white'}
                                        isCheck={true}
                                        onChecked={() => console.log('hello')
                                        }
                                    />
                                </TouchableOpacity>

                            </>
                        }

                        {/* Notifications */}

                        {
                            pathname === '/notifications' && <>
                                <TouchableOpacity className='py-3 flex-row '>
                                    <CalenderIcon />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>push notifications</Text>
                                    <CheckBox
                                        color={'white'}
                                        isCheck={true}
                                        onChecked={() => console.log('hello')
                                        }
                                    />
                                </TouchableOpacity>

                            </>
                        }

                        {/* Notice board */}
                        {
                            pathname === '/noticeBoard' && <>
                                <TouchableOpacity className='py-3 flex-row '>
                                    <EyeClose />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>hide read messages</Text>
                                    <CheckBox
                                        color={'white'}
                                        isCheck={true}
                                        onChecked={() => console.log('hello')
                                        }
                                    />
                                </TouchableOpacity>


                            </>
                        }


                        {
                            pathname === "/facilities" && <>
                                <TouchableOpacity className='py-3 flex-row '>
                                    <Person />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>show facility colours</Text>
                                    <CheckBox
                                        color={'white'}
                                        isCheck={true}
                                        onChecked={() => console.log('hello')
                                        }
                                    />
                                </TouchableOpacity>
                            </>
                        }


                        {
                            pathname !== "/settings" && pathname !== "/facilities" && <>
                                <TouchableOpacity className='py-3 flex-row '>
                                    <Person />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>show profile pictures</Text>
                                    <CheckBox
                                        color={'white'}
                                        isCheck={showProfilePicture}
                                        onChecked={() => setShowProfilePicture!(!showProfilePicture)}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity className='py-3 flex-row '>
                                    <Help />
                                    <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>help</Text>

                                </TouchableOpacity>
                            </>
                        }


                        <TouchableOpacity className='py-3 flex-row '>
                            <Settings color={'white'} />
                            <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>settings</Text>

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