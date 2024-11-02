import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Cancel from "@/assets/icons/Cancel";
import Check from "@/assets/icons/Check";
import Send from "@/assets/icons/Send";
import Header from "@/components/header/Header";
import NoticeMessage from "@/components/noticeBoard/NoticeMessage";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Screen = () => {
  const [showError, setShowError] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  const { authState, setAuthState } = useAuth();
  const [newMessage, setNewMessage] = useState(""); // State for new message input
  const [messages, setMessages] = useState([]); // State to hold all messages
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null); // State for the index of the message to delete
  const { notice } = useLocalSearchParams();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]); // Add new message to messages array
      setNewMessage(""); // Clear the input field
    }
  };

  const handleLongPressMessage = (index) => {
    setSelectedMessageIndex(index); // Set the selected message index
    setShowDelete(true); // Show delete confirmation modal
  };

  const handleDeleteMessage = () => {
    if (selectedMessageIndex !== null) {
      const updatedMessages = messages.filter(
        (_, index) => index !== selectedMessageIndex
      );
      setMessages(updatedMessages); // Update messages state
      setShowDelete(false); // Close delete modal
      setSelectedMessageIndex(null); // Reset selected index
    }
  };

  return (
    <>
      <SafeAreaView className={`bg-primary `}></SafeAreaView>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          title="notice board"
          calendar={true}
          filter={true}
          moreOptions={true}
          subhead={notice}
        />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 120,
          }}
          className="px-6"
        >
          {/* Display all messages */}
          {messages.map((message, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => handleLongPressMessage(index)}
            >
              <NoticeMessage message={message} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input field and send button */}
        <View className="pb-4 flex-1 px-5 absolute bottom-0 bg-white">
          <View className="flex-1 w-full border-t border-[#E9E9E9]">
            <View className="bg-[#27736E] flex-row justify-between items-center w-full mt-10 px-4 rounded-2xl">
              <TextInput
                style={styles.poppinsRegular}
                className="bg-[#27736E] rounded-2xl py-3 px-4 placeholder:text-white text-white flex-1 w-full"
                placeholderTextColor="#FFF"
                placeholder="Your message"
                value={newMessage}
                onChangeText={setNewMessage} // Update newMessage state
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <Send />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Delete confirmation modal */}
        {selectedMessageIndex !== null && (
          <View className="h-full absolute w-full flex-col flex-1 bg-[#000000b0]">
            <View className="h-[60%] bottom-0 w-full rounded-t-[20px] justify-center items-center"></View>
            <View className="bg-primary h-full bottom-0 w-full rounded-t-[60px] justify-center px-8">
              <Text
                style={styles.poppinsRegular}
                className="text-white text-2xl pb-8 -mt-[500px]"
              >
                Are you sure you want to delete the selected message?
              </Text>
              <View className="justify-end flex-row gap-x-[76px]">
                <TouchableOpacity
                  className="flex-row"
                  onPress={handleDeleteMessage}
                >
                  <Check />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row"
                  onPress={() => setSelectedMessageIndex(null)}
                >
                  <Cancel />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default Screen;
