import HorizontalDatePicker from "@/components/calender/HorizontalCalender";
import VerticalDateList from "@/components/calender/VerticalCalender";
import Header from "@/components/header/Header";
import { useAppContext } from "@/context/AppContext";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCalendar from "@/components/calender/HeaderCalender";
import LoadingSpinner from "@/components/utils/LoadingSpinner";
import { SetStateAction, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Props = {};

const HomeScreen = (props: Props) => {
  const {
    setShowHeaderCalendar,
    showHeaderCalendar,
    showAllShifts,
    showMoreOptions,
    showFontSlider,
    showHorizontalCalendar,
    refreshKey,
    showRequest,
    setShowRequest,
  } = useAppContext();

  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [addTimeOff, setAddTimeOff] = useState(false);

  const { authState } = useAuth();

  const options = [
    { label: "Holiday", value: "1" },
    { label: "LOA", value: "2" },
    { label: "Maternity", value: "3" },
    { label: "Personal", value: "4" },
    { label: "RDO", value: "5" },
    { label: "Sick leave", value: "6" },
  ];

  useEffect(() => {
    const getShifts = async () => {
      setLoading(true);
      try {
        const formattedShifts: any = authState?.shift?.map(
          ({ id, date, status, staffId, description }) => ({
            id,
            date,
            status,
            staffId,
            description:
              description?.length > 0
                ? description.join(", ")
                : status?.time || "No description",
          })
        );
        setShifts(formattedShifts);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      } finally {
        setLoading(false);
      }
    };

    getShifts();
  }, [authState?.companyId, refreshKey]);

  const handleSelect = (value: SetStateAction<null>) => {
    setSelectedValue(value);
  };

  const handleDateSelection = (date: Date) => {
    console.log(date, "shifts");
  };

  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.headerArea}>
        <Header transparent title="RunShift" />
      </SafeAreaView>

      {showHorizontalCalendar && <HorizontalDatePicker shifts={shifts} />}
      <VerticalDateList shifts={shifts} />

      {showHeaderCalendar && (
        <View style={styles.overlay}>
          <HeaderCalendar
            setShowHeaderCalendar={setShowHeaderCalendar}
            showHeaderCalendar={showHeaderCalendar}
            onSelect={handleDateSelection}
          />
        </View>
      )}

      {loading && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  headerArea: {
    backgroundColor: "#0F766E", // primary
    paddingBottom: 40,
  },
  overlay: {
    backgroundColor: "#00000073",
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  input: {
    backgroundColor: "#27736E",
    color: "white",
    padding: 10,
    fontFamily: "PoppinsRegular",
    borderRadius: 8,
  },
});

export default HomeScreen;
