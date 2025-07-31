import Header from "@/components/header/Header";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import { useAppContext } from "@/context/AppContext";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
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
import { parse, format } from "date-fns";

type Props = {};

const TABS = ["Open Shifts", "Applied", "Accepted"];

const Screen = (props: Props) => {
  const [activeTab, setActiveTab] = useState("Open Shifts");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { fontSize } = useAppContext();
  const { authState } = useAuth();
  const [openShifts, setOpenShifts] = useState([]);
  const [appliedShifts, setAppliedShifts] = useState([]);
  const [acceptedShifts, setAcceptedShifts] = useState([]);
  const [hasFetched, setHasFetched] = useState({
    open: false,
    applied: false,
    accepted: false,
  });

  // Memoized function to group shifts by date
  const groupShiftsByDate = useCallback((shifts: any) => {
    if (!Array.isArray(shifts)) return {};
    return shifts.reduce((acc: any, shift: any) => {
      const date = shift.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(shift);
      return acc;
    }, {});
  }, []);

  // Filter out applied shifts from open shifts
  const filteredOpenShifts = openShifts.filter(
    (openShift) =>
      !appliedShifts.some((appliedShift) => appliedShift.id === openShift.id) &&
      !acceptedShifts.some((acceptedShift) => acceptedShift.id === openShift.id)
  );

  const groupedOpenShifts = groupShiftsByDate(filteredOpenShifts);
  const groupedAppliedShifts = groupShiftsByDate(appliedShifts);
  const groupedAcceptedShifts = groupShiftsByDate(acceptedShifts);

  // Fetch open shifts
  const fetchOpenShifts = useCallback(async () => {
    try {
      const res = await getOpenShifts(authState?.companyId || "");
      setOpenShifts(res);
      setHasFetched((prev) => ({ ...prev, open: true }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authState?.companyId]);

  const fetchAppliedShifts = useCallback(async () => {
    try {
      const res = await getAppliedOpenShifts(authState?.staffId || "");
      setAppliedShifts(res);
      setHasFetched((prev) => ({ ...prev, applied: true }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authState?.staffId]);

  const fetchAcceptedShifts = useCallback(async () => {
    try {
      const res = await getAcceptedOpenShifts(authState?.staffId || "");
      setAcceptedShifts(res);
      setHasFetched((prev) => ({ ...prev, accepted: true }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authState?.staffId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (activeTab === "Open Shifts") {
      await fetchOpenShifts();
    } else if (activeTab === "Applied") {
      await fetchAppliedShifts();
    } else if (activeTab === "Accepted") {
      await fetchAcceptedShifts();
    }
  }, [activeTab, fetchOpenShifts, fetchAppliedShifts, fetchAcceptedShifts]);

  // Handle tab change
  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      setLoading(true);

      // Only fetch if we haven't fetched this tab before
      if (tab === "Open Shifts" && !hasFetched.open) {
        fetchOpenShifts();
      } else if (tab === "Applied" && !hasFetched.applied) {
        fetchAppliedShifts();
      } else if (tab === "Accepted" && !hasFetched.accepted) {
        fetchAcceptedShifts();
      } else {
        setLoading(false);
      }
    },
    [hasFetched, fetchOpenShifts, fetchAppliedShifts, fetchAcceptedShifts]
  );

  // Initial load
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchOpenShifts(),
          fetchAppliedShifts(),
          fetchAcceptedShifts(),
        ]);
      } catch (error) {
        console.error("Failed to fetch initial shift data", error);
        Alert.alert("Error", "Could not load shift data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initialFetch();
  }, [fetchOpenShifts, fetchAppliedShifts, fetchAcceptedShifts]);

  return (
    <View className="flex-1 justify-between">
      <SafeAreaView className="bg-primary pb-7" />
      <Header title="Open Shifts" />

      {/* Tab Buttons */}
      <View className="bg-white ">
        <View className="flex-row mb-6 bg-[#F1F1F1] rounded-xl justify-around mt-4 mx-4 py-[5px] px-[4px]">
          {TABS.map((tab, index) => (
            <Pressable key={index} onPress={() => handleTabChange(tab)}>
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
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
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
                              onApplySuccess={() => {
                                // Add to applied shifts and remove from open shifts
                                setAppliedShifts((prev) => [...prev, shift]);
                                setOpenShifts((prev) =>
                                  prev.filter((s) => s.id !== shift.id)
                                );
                              }}
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
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
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
                    const parsedDate = parse(date, "MM-dd-yyyy", new Date());
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
  onApplySuccess,
}: {
  shift?: any;
  tab: string;
  staffId?: string;
  onApplySuccess?: () => void;
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleShiftApplication = async () => {
    try {
      setLoading(true);
      const res = await applyFreeShift(shift.id, staffId);
      Alert.alert("Success", "Shift application successful");
      toggleModal();
      if (onApplySuccess) {
        onApplySuccess();
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "Failed to apply for shift");
    } finally {
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
            Are you sure you want to apply for this shift?
          </Text>

          <View className="flex-row justify-end gap-16">
            <Pressable
              onPress={handleShiftApplication}
              className="items-center justify-center "
            >
              {loading ? <ActivityIndicator color="white" /> : <Check />}
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
