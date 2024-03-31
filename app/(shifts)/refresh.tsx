import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ color = '#000000b0' }) => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // semi-transparent white overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Spinner;
