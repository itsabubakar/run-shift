import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Person from '@/assets/icons/header/Person';
import { useAppContext } from '@/context/AppContext';
import Settings from '@/assets/icons/drawer/Settings';
import CalenderIcon from '@/assets/icons/CalenderIcon';
import WeatherIcon from '@/assets/icons/WeatherIcon';
import Help from '@/assets/icons/Help';
import { usePathname } from 'expo-router';
import EyeClose from '@/assets/icons/EyeClose';
import CheckBox from './settings/CheckBox';
import Slider from '@react-native-community/slider';



const FontSlider = () => {
    const { fontSize, setFontSize, showFontSlider,
        setShowFontSlider } = useAppContext()


    const pathname = usePathname();

    return (
        <View className=''>

            <Modal visible={showFontSlider} transparent={true} onRequestClose={() => setShowFontSlider!(!showFontSlider)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowFontSlider!(!showFontSlider)}>
                    <View style={styles.modalContent}>


                        <Slider
                            // style={{ width: 340, height: 80 }}
                            minimumValue={10}
                            maximumValue={20}
                            value={fontSize}
                            thumbTintColor="#fefefe"
                            minimumTrackTintColor="#21D0C6"
                            maximumTrackTintColor="#fefefe"
                            onValueChange={value => setFontSize!(value)}
                        />
                    </View>
                </TouchableOpacity>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        // paddingTop: 80,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.158)',
    },
    modalContent: {
        backgroundColor: '#175B57',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginBottom: 40,
    },

    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    poppinsSemiBold: {
        fontFamily: 'PoppinsSemiBold',
    },
});

export default FontSlider