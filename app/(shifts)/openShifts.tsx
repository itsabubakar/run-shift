import Header from "@/components/header/Header";
import Notice from "@/components/noticeBoard/Notice";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import { useAppContext } from "@/context/AppContext";
import axiosInstance from "@/services";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { Cancel, Check } from "@/assets/icons";

type Props = {};

const TABS = ["Open Shifts", "Applied", "Accepted"];

const Screen = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Open Shifts");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fontSize, refreshKey } = useAppContext();

  // useEffect(() => {
  //   console.log(`${activeTab} screen mounted`);

  //   const fetchNotifications = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.get(
  //         `/notifications?type=${activeTab.toLowerCase()}`
  //       );
  //       setNotifications(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotifications();
  // }, [ activeTab]);

  return (
    <View className="flex-1 justify-between">
      <SafeAreaView className="bg-primary pb-7" />
      <Header title="Open Shifts" moreOptions={true} />

      {/* Tab Buttons */}
      <View className="bg-white ">
        <View className="flex-row mb-6 bg-[#F1F1F1] rounded-xl justify-around mt-4 mx-4 py-[5px] px-[4px]">
          {TABS.map((tab, index) => (
            <Pressable key={index} onPress={() => setActiveTab(tab)}>
              <Text
                className="py-4 px-4 rounded-2xl text-sm"
                style={[
                  styles.poppinsRegular,
                  {
                    fontSize: fontSize! + 2,
                    color: activeTab === tab ? "#FFFFFF" : "#606060",
                    fontWeight: activeTab === tab ? "600" : "400",
                    backgroundColor:
                      activeTab === tab ? "#27736E" : "transparent",
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 bg-white px-6">
        {!loading && (
          <View>
            {activeTab === "Open Shifts" && (
              <View>
                <OpenShift tab={activeTab} />
                <OpenShift tab={activeTab} />
              </View>
            )}
            {activeTab === "Applied" && (
              <View>
                <OpenShift tab={activeTab} />
                <OpenShift tab={activeTab} />
              </View>
            )}
            {activeTab === "Accepted" && (
              <View>
                <OpenShift tab={activeTab} />
                <OpenShift tab={activeTab} />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {loading && <LoadingSpinner />}
      <StatusBar style="auto" />
    </View>
  );
};

const OpenShift = ({ tab }: { tab: string }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("hello morgan");
    setModalVisible(!isModalVisible);
  };
  return (
    <View className="mb-4  border-b pb-4 border-b-[#E9E9E9]">
      <Text className="text-[#27736E] text-xl mb-4">
        WED <Text className="font-bold">14</Text> FEB
      </Text>
      <View className="gap-4">
        <View className="flex-row justify-between bg-[#F1F1F1] py-4 rounded-2xl px-3 items-center">
          <View className="flex-row gap-7">
            <Text className="text-sm text-[#175B57]">3:00 - 5:00 PM</Text>
            <Text className="text-sm text-[#175B57]">15-Feb-2024</Text>
          </View>
          {tab == "Open Shifts" && (
            <Pressable
              onPress={toggleModal}
              className="bg-[#ACACAC] text-white px-7 py-2 rounded-lg"
            >
              <Text className="text-sm  text-white">Apply</Text>
            </Pressable>
          )}
        </View>
        <View className="flex-row justify-between bg-[#F1F1F1] py-4 rounded-2xl px-3 items-center">
          <View className="flex-row gap-7">
            <Text className="text-sm text-[#175B57]">3:00 - 5:00 PM</Text>
            <Text className="text-sm text-[#175B57]">15-Feb-2024</Text>
          </View>
          {tab == "Open Shifts" && (
            <Pressable
              onPress={toggleModal}
              className="bg-[#ACACAC] text-white px-7 py-2 rounded-lg"
            >
              <Text className="text-sm  text-white">Apply</Text>
            </Pressable>
          )}
        </View>
      </View>

      <Modal
        className="items-center justify-center  "
        isVisible={isModalVisible}
      >
        <View className="justify-between h-[320px]  bg-[#175B57] px-8 py-12 rounded-[20px]">
          <Text className="text-white text-2xl">
            Are you sure you want to apply for this shift ?
          </Text>

          <View className="flex-row justify-end gap-16">
            <Pressable>
              <Check />
            </Pressable>
            <Pressable onPress={toggleModal}>
              <Cancel />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
});

export default Screen;
