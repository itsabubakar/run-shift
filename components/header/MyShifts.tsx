import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Person from '@/assets/icons/header/Person';
import CheckBox from '../settings/CheckBox';
import Persons from '@/assets/icons/header/Persons';
import { useAppContext } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const MyShifts = () => {
  const {
    showAllShifts,
    setShowAllShifts, 
    setEmailFilter, 
    showAllShiftsBoolean, 
    setShowAllShiftsBoolean 
  } = useAppContext();

  const { authState } = useAuth();

  const handleCheck = () => {
    setShowAllShiftsBoolean!(!showAllShiftsBoolean);
    if (showAllShiftsBoolean) {
      setEmailFilter!('');
    } else {
      setEmailFilter!(authState?.email as any);
    }
  }

  

  return (
    <View>
      <Modal visible={showAllShifts} transparent={true} onRequestClose={() => setShowAllShifts!(!showAllShifts)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowAllShifts!(!showAllShifts)}>
          <View style={styles.modalContent}>
            <TouchableOpacity className='py-3 flex-row '>
              <Persons />
              <Text className="ml-4 text-white text-sm" style={styles.poppinsRegular}>All Shifts</Text>
              <CheckBox
                color={'white'}
                isCheck={showAllShiftsBoolean}
                onChecked={handleCheck}
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
    paddingHorizontal: 16,
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
