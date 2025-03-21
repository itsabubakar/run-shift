import Header from "@/components/header/Header";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import { useAppContext } from "@/context/AppContext";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { Cancel, Check } from "@/assets/icons";
import {
  applyFreeShift,
  getAcceptedOpenShifts,
  getAppliedOpenShifts,
  getOpenShifts,
} from "@/api/shifts";
import { useAuth } from "@/context/AuthContext";
import { parse, format } from "date-fns"; // Import date-fns functions

type Props = {};

const TABS = ["Open Shifts", "Applied", "Accepted"];

const Screen = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Open Shifts");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const { fontSize } = useAppContext();
  const { authState } = useAuth();
  const [openShifts, setOpenShifts] = useState([]);
  const [appliedShifts, setAppliedShifts] = useState([]);
  const [acceptedShifts, setAcceptedShifts] = useState([]);

  // Group shifts by date
  const groupShiftsByDate = (shifts: any) => {
    return shifts.reduce((acc: any, shift: any) => {
      const date = shift.date; // Use the date as the key
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(shift);
      return acc;
    }, {});
  };

  const groupedOpenShifts = groupShiftsByDate(openShifts);
  const groupedAppliedShifts = groupShiftsByDate(appliedShifts);
  const groupedAcceptedShifts = groupShiftsByDate(acceptedShifts);

  // Fetch open shifts
  const fetchOpenShifts = async () => {
    try {
      const res = await getOpenShifts(authState?.companyId || "");
      console.log(res);
      setOpenShifts(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

  const fetchAppliedShifts = async () => {
    try {
      const res = await getAppliedOpenShifts(authState?.staffId || "");
      setAppliedShifts(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

  const fetchAcceptedShifts = async () => {
    try {
      const res = await getAcceptedOpenShifts(authState?.staffId || "");
      setAcceptedShifts(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing indicator
    if (activeTab === "Open Shifts") {
      await fetchOpenShifts();
    } else if (activeTab === "Applied") {
      await fetchAppliedShifts();
    } else if (activeTab === "Accepted") {
      await fetchAcceptedShifts();
    }
    console.log("fetching");
  };

  useEffect(() => {
    setLoading(true);
    if (activeTab === "Open Shifts") {
      fetchOpenShifts();
    } else if (activeTab === "Applied") {
      fetchAppliedShifts();
    } else if (activeTab === "Accepted") {
      fetchAcceptedShifts();
    }
    console.log("notifications screen mounted");
  }, [authState?.companyId, activeTab]);

  return (
    <View className="flex-1 justify-between">
      <SafeAreaView className="bg-primary pb-7" />
      <Header title="Open Shifts" />

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
      <ScrollView
        className="flex-1 bg-white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && (
          <View className="pr-4 flex-1 pl-4">
            {activeTab === "Open Shifts" && (
              <View className="pl-4">
                {Object.entries(groupedOpenShifts).map(
                  ([date, shifts]: any) => {
                    // Parse the date string using date-fns
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
                    // Format the parsed date for display
                    const formattedDate = format(parsedDate, "EEE dd MMM");

                    return (
                      <View
                        key={date}
                        className="mb-4 border-b pb-4 border-b-[#E9E9E9]"
                      >
                        <Text className="text-[#27736E] text-xl mb-4">
                          {formattedDate}
                        </Text>
                        <View className="gap-4">
                          {shifts.map((shift: any, index: any) => (
                            <OpenShift
                              staffId={authState?.staffId || ""}
                              key={index}
                              shift={shift}
                              tab={activeTab}
                            />
                          ))}
                        </View>
                      </View>
                    );
                  }
                )}
              </View>
            )}
            {activeTab === "Applied" && (
              <View className="pl-4">
                {Object.entries(groupedAppliedShifts).map(
                  ([date, shifts]: any) => {
                    // Parse the date string using date-fns
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
                    // Format the parsed date for display
                    const formattedDate = format(parsedDate, "EEE dd MMM");

                    return (
                      <View
                        key={date}
                        className="mb-4 border-b pb-4 border-b-[#E9E9E9]"
                      >
                        <Text className="text-[#27736E] text-xl mb-4">
                          {formattedDate}
                        </Text>
                        <View className="gap-4">
                          {shifts.map((shift: any, index: any) => (
                            <OpenShift
                              staffId={authState?.staffId || ""}
                              key={index}
                              shift={shift}
                              tab={activeTab}
                            />
                          ))}
                        </View>
                      </View>
                    );
                  }
                )}
              </View>
            )}
            {activeTab === "Accepted" && (
              <View className="pl-4">
                {Object.entries(groupedAcceptedShifts).map(
                  ([date, shifts]: any) => {
                    // Parse the date string using date-fns
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
                    // Format the parsed date for display
                    const formattedDate = format(parsedDate, "EEE dd MMM");

                    return (
                      <View
                        key={date}
                        className="mb-4 border-b pb-4 border-b-[#E9E9E9]"
                      >
                        <Text className="text-[#27736E] text-xl mb-4">
                          {formattedDate}
                        </Text>
                        <View className="gap-4">
                          {shifts.map((shift: any, index: any) => (
                            <OpenShift
                              staffId={authState?.staffId || ""}
                              key={index}
                              shift={shift}
                              tab={activeTab}
                            />
                          ))}
                        </View>
                      </View>
                    );
                  }
                )}
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

const OpenShift = ({
  shift,
  tab,
  staffId,
}: {
  shift?: any;
  tab: string;
  staffId?: string;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleShiftApplication = async () => {
    setLoading(true);
    try {
      const res = await applyFreeShift(shift.id, staffId);
      console.log(res);
      Alert.alert("Success", "Shift application successful");
      toggleModal();
      setLoading(false);
    } catch (error: any) {
      console.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <View className="flex-row mt-2 mb-4 justify-between bg-[#F1F1F1] py-4 rounded-2xl px-3 items-center">
      <View className="flex-row gap-7">
        <Text className="text-sm text-[#175B57]">{shift?.time}</Text>
        <Text className="text-sm text-[#175B57]">{shift?.date}</Text>
      </View>
      {tab == "Open Shifts" && (
        <Pressable
          onPress={toggleModal}
          className="bg-[#ACACAC] text-white px-7 py-2 rounded-lg"
        >
          <Text className="text-sm  text-white">Apply</Text>
        </Pressable>
      )}
      <Modal
        className="items-center justify-center  "
        isVisible={isModalVisible}
      >
        <View className="justify-between h-[320px]  bg-[#175B57] px-8 py-12 rounded-[20px]">
          <Text className="text-white text-2xl">
            Are you sure you want to apply for this shift ?
          </Text>

          <View className="flex-row justify-end gap-16">
            <Pressable
              onPress={handleShiftApplication}
              className="items-center justify-center "
            >
              {loading ? <ActivityIndicator /> : <Check />}
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
