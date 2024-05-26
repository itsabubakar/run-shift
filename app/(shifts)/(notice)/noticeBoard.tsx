import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Animated, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Cancel from '@/assets/icons/Cancel';
import Check from '@/assets/icons/Check';
import Upload from '@/assets/icons/Upload';
import Header from '@/components/header/Header';
import Notice from '@/components/noticeBoard/Notice';

const { height: screenHeight } = Dimensions.get('window');

const Screen = () => {
    const [showAddPost, setShowAddPost] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        if (showAddPost) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showAddPost]);

    return (
        <>

            <SafeAreaView className='bg-primary pb-7'>
            </SafeAreaView>

            <Header title='notifications'
                moreOptions={true}
            />
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
                <View className='p-6 flex-1bg-white  h-screen'>
                    <Link asChild className='w-full' href={'/(shifts)/(notice)/id'}>
                        <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>
                            <Notice notification='hello' />
                        </TouchableOpacity>
                    </Link>
                    <Link asChild className='w-full' href={'/(shifts)/(notice)/id'}>
                        <TouchableOpacity onLongPress={() => setShowDelete(!showDelete)}>
                            <Notice notification='hello' />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity onPress={() => setShowAddPost(true)} className='self-end mt-[50%]'>
                        <Upload />
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>

            {showDelete && (
                <View style={styles.overlay}>
                    <View style={styles.deleteContainer}>
                        <Text style={styles.deleteText}>Are you sure you want to delete the selected message?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowDelete(false)}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowDelete(false)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <Animated.View style={[styles.slideUpContainer, { transform: [{ translateY: slideAnim }] }]}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flexContainer}>
                    <View style={styles.addPostContainer}>
                        <Text style={styles.modalTitle}>New noticeboard post</Text>
                        <TextInput
                            style={[styles.poppinsRegular, styles.input]}
                            placeholderTextColor="#FFF"
                            placeholder='Title'
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowAddPost(false)}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowAddPost(false)}>
                                <Cancel />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: 'PoppinsRegular',
    },
    flexContainer: {
        flex: 1,
    },
    slideUpContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '40%',
        backgroundColor: '#175B57',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    addPostContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    modalTitle: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'PoppinsRegular',
    },
    input: {
        backgroundColor: '#27736E',
        borderRadius: 12,
        padding: 12,
        color: 'white',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000b0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteContainer: {
        backgroundColor: '#27736E',
        padding: 20,
        borderRadius: 20,
    },
    deleteText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    },
});

export default Screen;
