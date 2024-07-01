import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Animated, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Cancel from '@/assets/icons/Cancel';
import Check from '@/assets/icons/Check';
import Upload from '@/assets/icons/Upload';
import Header from '@/components/header/Header';
import Notice from '@/components/noticeBoard/Notice';
import { ScrollView } from 'react-native-gesture-handler';
import { useAppContext } from '@/context/AppContext';

const { height: screenHeight } = Dimensions.get('window');

const Screen = () => {
    const [showAddPost, setShowAddPost] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [posts, setPosts] = useState([{ id: 'id1', title: 'hello' }, { id: 'id2', title: 'hello my neighbour!!! I sabi this code thing' }]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [postToDelete, setPostToDelete] = useState(null);
    const slideAnim = useRef(new Animated.Value(screenHeight)).current;
    const { fontSize } = useAppContext()

    const handleAddPost = () => {
        const newPost = { id: Date.now().toString(), title: newPostTitle };
        setPosts([...posts, newPost]);
        setNewPostTitle(''); // Clear the input field
        setShowAddPost(false); // Close the add post modal
        Keyboard.dismiss();
    };

    const handleDeletePost = () => {
        setPosts(posts.filter(post => post.id !== postToDelete));
        setShowDelete(false);
        setPostToDelete(null);
    };

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
            <SafeAreaView className='bg-primary pb-7' />
            <Header title='notice board' moreOptions={true} />
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} resetScrollToCoords={{ x: 0, y: 0 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 24 }} className='flex-1 bg-white max-h-full'>
                    {posts ? posts.map(post => (
                        <Link key={post.id} asChild className='w-full' href={`/(shifts)/(notice)/${post.title}`}>
                            <TouchableOpacity onLongPress={() => { setShowDelete(true); setPostToDelete(post.id); }}>
                                <Notice notification={post.title} />
                            </TouchableOpacity>
                        </Link>
                    )) : <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>There are no read messages.</Text>}
                </ScrollView>
                <TouchableOpacity onPress={() => setShowAddPost(true)} className='self-end absolute top-[80%] right-6'>
                    <Upload />
                </TouchableOpacity>
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>

            {showDelete && (
                <View className="h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
                    <View className="h-[60%] bottom-0 w-full rounded-t-[20px] justify-center items-center"></View>
                    <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-8">
                        <Text style={styles.poppinsRegular} className="text-white text-2xl pb-8 -mt-[500px]">
                            Are you sure you want to delete the selected message?
                        </Text>
                        <View className='justify-end flex-row gap-x-[76px]'>
                            <TouchableOpacity className='flex-row' onPress={handleDeletePost}>
                                <Check />
                            </TouchableOpacity>
                            <TouchableOpacity className='flex-row' onPress={() => setShowDelete(false)}>
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
                            value={newPostTitle}
                            onChangeText={setNewPostTitle}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleAddPost}>
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
        justifyContent: 'flex-end',
        gap: 60,
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
