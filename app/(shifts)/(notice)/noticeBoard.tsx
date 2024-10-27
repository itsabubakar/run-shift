import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Cancel from "@/assets/icons/Cancel";
import Check from "@/assets/icons/Check";
import Upload from "@/assets/icons/Upload";
import Header from "@/components/header/Header";
import Notice from "@/components/noticeBoard/Notice";
import { ScrollView } from "react-native-gesture-handler";
import { useAppContext } from "@/context/AppContext";

const { height: screenHeight } = Dimensions.get("window");

const Screen = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [posts, setPosts] = useState([
    { id: "id1", title: "hello" },
    { id: "id2", title: "hello my neibour!!! I sabi this code thing" },
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const { fontSize } = useAppContext();

  const handleAddPost = () => {
    const newPost = { id: Date.now().toString(), title: newPostTitle };
    setPosts([...posts, newPost]);
    setNewPostTitle(""); // Clear the input field
    setShowAddPost(false); // Close the add post modal
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
      <SafeAreaView className="bg-primary pb-7"></SafeAreaView>

      <Header title="notice board" moreOptions={true} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <ScrollView className="p-6 flex-1 bg-white max-h-full">
          {posts ? (
            posts.map((post) => (
              <Link
                key={post.id}
                asChild
                className="w-full"
                href={`/(shifts)/(notice)/${post.title}` as any}
              >
                <TouchableOpacity
                  onLongPress={() => setShowDelete(!showDelete)}
                >
                  <Notice notification={post.title} />
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <Text style={[styles.poppinsRegular, { fontSize: fontSize! + 2 }]}>
              There are no read messages.
            </Text>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={() => setShowAddPost(true)}
          className="self-end absolute top-[80%] right-6"
        >
          <Upload />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </KeyboardAwareScrollView>

      {showDelete && (
        <View style={styles.overlay}>
          <View style={styles.deleteContainer}>
            <Text style={styles.deleteText}>
              Are you sure you want to delete the selected message?
            </Text>
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

      <Animated.View
        style={[
          styles.slideUpContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flexContainer}
        >
          <View style={styles.addPostContainer}>
            <Text style={styles.modalTitle}>New noticeboard post</Text>
            <TextInput
              style={[styles.poppinsRegular, styles.input]}
              placeholderTextColor="#FFF"
              placeholder="Title"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />
            <View style={styles.modalButtons}>
              {/* Add post */}
              <TouchableOpacity onPress={handleAddPost}>
                <Check />
              </TouchableOpacity>

              {/* Cancel post */}
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
    fontFamily: "PoppinsRegular",
  },
  flexContainer: {
    flex: 1,
  },
  slideUpContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    backgroundColor: "#175B57",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  addPostContainer: {
    flex: 1,
    justifyContent: "center",
  },
  modalTitle: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "PoppinsRegular",
  },
  input: {
    backgroundColor: "#27736E",
    borderRadius: 12,
    padding: 12,
    color: "white",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000b0",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    backgroundColor: "#27736E",
    padding: 20,
    borderRadius: 20,
  },
  deleteText: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
});

export default Screen;
