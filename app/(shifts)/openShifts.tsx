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

const TABS = ["Open Shifts", "Applied", "Accepted"];

const Screen = () => {
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

  const groupShiftsByDate = useCallback((shifts: any) => {
    if (!Array.isArray(shifts)) return {};
    return shifts.reduce((acc: any, shift: any) => {
      const date = shift.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(shift);
      return acc;
    }, {});
  }, []);

  const filteredOpenShifts = openShifts.filter(
    (s) =>
      !appliedShifts.some((a) => a.id === s.id) &&
      !acceptedShifts.some((a) => a.id === s.id)
  );

  const groupedOpenShifts = groupShiftsByDate(filteredOpenShifts);
  const groupedAppliedShifts = groupShiftsByDate(appliedShifts);
  const groupedAcceptedShifts = groupShiftsByDate(acceptedShifts);

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

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      setLoading(true);
      if (tab === "Open Shifts" && !hasFetched.open) fetchOpenShifts();
      else if (tab === "Applied" && !hasFetched.applied) fetchAppliedShifts();
      else if (tab === "Accepted" && !hasFetched.accepted)
        fetchAcceptedShifts();
      else setLoading(false);
    },
    [hasFetched, fetchOpenShifts, fetchAppliedShifts, fetchAcceptedShifts]
  );

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
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <Header title="Open Shifts" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {TABS.map((tab, index) => {
            const isActive = activeTab === tab;
            return (
              <Pressable key={index} onPress={() => handleTabChange(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      backgroundColor: isActive ? "#27736E" : "transparent",
                      color: isActive ? "#fff" : "#606060",
                      fontWeight: isActive ? "600" : "400",
                      fontSize: fontSize! + 2,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && (
          <View style={styles.content}>
            {["Open Shifts", "Applied", "Accepted"].map((type) => {
              const grouped =
                type === "Open Shifts"
                  ? groupedOpenShifts
                  : type === "Applied"
                  ? groupedAppliedShifts
                  : groupedAcceptedShifts;

              if (activeTab !== type) return null;

              return (
                <View key={type} style={styles.section}>
                  {Object.keys(grouped).length === 0 ? (
                    <Text style={styles.emptyText}>
                      {type === "Open Shifts"
                        ? "No open shifts available."
                        : type === "Applied"
                        ? "You haven't applied to any shifts yet."
                        : "No accepted shifts."}
                    </Text>
                  ) : (
                    Object.entries(grouped).map(([date, shifts]: any) => {
                      const parsedDate = parse(date, "MM-dd-yyyy", new Date());
                      const formattedDate = isNaN(parsedDate.getTime())
                        ? "Invalid Date"
                        : format(parsedDate, "EEE dd MMM");

                      return (
                        <View key={date} style={styles.shiftGroup}>
                          <Text style={styles.dateText}>{formattedDate}</Text>
                          <View style={styles.shiftList}>
                            {shifts.map((shift: any, index: any) => (
                              <OpenShift
                                staffId={authState?.staffId || ""}
                                key={index}
                                shift={shift}
                                tab={type}
                                onApplySuccess={() => {
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
                    })
                  )}
                </View>
              );
            })}
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
      await applyFreeShift(shift.id, staffId);
      Alert.alert("Success", "Shift application successful");
      toggleModal();
      if (onApplySuccess) onApplySuccess();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "Failed to apply for shift");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.shiftCard}>
      <View style={styles.shiftDetails}>
        <Text style={styles.shiftText}>{shift?.time}</Text>
        <Text style={styles.shiftText}>{shift?.date}</Text>
      </View>
      {tab === "Open Shifts" && (
        <Pressable onPress={toggleModal} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </Pressable>
      )}
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        onBackButtonPress={toggleModal}
        isVisible={isModalVisible}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to apply for this shift?
          </Text>
          <View style={styles.modalActions}>
            <Pressable
              onPress={handleShiftApplication}
              style={styles.modalIcon}
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
  container: { flex: 1, justifyContent: "space-between" },
  safeArea: { backgroundColor: "#175B57", paddingBottom: 28 },
  tabContainer: { backgroundColor: "white" },
  tabRow: {
    flexDirection: "row",
    marginBottom: 24,
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    justifyContent: "space-around",
    marginHorizontal: 16,
    paddingVertical: 5,
    paddingHorizontal: 4,
    marginTop: 16,
  },
  tabText: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    fontSize: 14,
  },
  scrollContainer: { flex: 1, backgroundColor: "white" },
  content: { paddingHorizontal: 16, flex: 1 },
  section: { paddingLeft: 16 },
  shiftGroup: {
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderColor: "#E9E9E9",
  },
  dateText: { color: "#27736E", fontSize: 20, marginBottom: 16 },
  shiftList: { gap: 16 },
  shiftCard: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 16,
    justifyContent: "space-between",
    backgroundColor: "#F1F1F1",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  shiftDetails: { flexDirection: "row", gap: 28 },
  shiftText: { fontSize: 14, color: "#175B57" },
  applyButton: {
    backgroundColor: "#ACACAC",
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyButtonText: { color: "white", fontSize: 14 },
  modalContent: {
    justifyContent: "space-between",
    height: 320,
    backgroundColor: "#175B57",
    paddingHorizontal: 32,
    paddingVertical: 48,
    borderRadius: 20,
  },
  modalText: { color: "white", fontSize: 24 },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 64,
  },
  modalIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
});

export default Screen;
