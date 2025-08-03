import Calender from "@/assets/icons/header/Calender";
import Filter from "@/assets/icons/header/Filter";
import MoreOptions from "@/assets/icons/header/MoreOptions";
import Persons from "@/assets/icons/header/Persons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import ArrowLarge from "@/assets/icons/ArrowLarge";

type Props = {
  title?: string;
  calendar?: boolean;
  filter?: boolean;
  moreOptions?: boolean;
  persons?: boolean;
  subhead?: string | string[];
  transparent?: boolean;
};

const Header = ({
  title,
  calendar,
  filter,
  moreOptions,
  persons,
  subhead,
  transparent,
}: Props) => {
  const navigation = useNavigation();

  const {
    setShowHeaderCalendar,
    showHeaderCalendar,
    showAllShifts,
    setShowAllShifts,
    setMoreOptions,
    showMoreOptions,
    showFilter,
    setShowFilter,
    emailFilter,
    setEmailFilter,
  } = useAppContext();

  const [localEmail, setLocalEmail] = useState(emailFilter || "");
  const [filterApplied, setFilterApplied] = useState(false);

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleArrowClick = () => {
    setEmailFilter!(localEmail.toLowerCase());
    setShowFilter!(!showFilter);
    setFilterApplied(!!localEmail);
  };

  const handleRemoveFilter = () => {
    setEmailFilter!("");
    setLocalEmail("");
    setFilterApplied(false);
  };

  return (
    <View
      style={[
        styles.header,
        transparent && styles.transparentBackground,
        !subhead && { paddingBottom: 40 },
      ]}
    >
      <View style={styles.rowBetween}>
        <TouchableOpacity onPress={onToggle} style={styles.rowStart}>
          <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <Path
              d="M10 15H10.0112M15.0063 15H15.0162M19.9888 15H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M2.5 15C2.5 9.1075 2.5 6.16125 4.33 4.33C6.1625 2.5 9.1075 2.5 15 2.5C20.8925 2.5 23.8387 2.5 25.6687 4.33C27.5 6.1625 27.5 9.1075 27.5 15C27.5 20.8925 27.5 23.8387 25.6687 25.6687C23.84 27.5 20.8925 27.5 15 27.5C9.1075 27.5 6.16125 27.5 4.33 25.6687C2.5 23.84 2.5 20.8925 2.5 15Z"
              stroke="white"
              strokeWidth="1.5"
            />
          </Svg>
          {!showFilter && (
            <Text style={[styles.poppinsRegular, styles.title]}>
              {title || "RunShift"}
            </Text>
          )}
        </TouchableOpacity>

        {!showFilter && (
          <View style={styles.rowGap}>
            {calendar && (
              <TouchableOpacity
                onPress={() => setShowHeaderCalendar!(!showHeaderCalendar)}
              >
                <Calender />
              </TouchableOpacity>
            )}
            {persons && (
              <TouchableOpacity
                onPress={() => setShowAllShifts!(!showAllShifts)}
              >
                <Persons />
              </TouchableOpacity>
            )}
            {filter && (
              <TouchableOpacity onPress={() => setShowFilter!(!showFilter)}>
                <View
                  style={filterApplied ? styles.filterIconActive : undefined}
                >
                  <Filter />
                </View>
              </TouchableOpacity>
            )}
            {moreOptions && (
              <TouchableOpacity
                onPress={() => setMoreOptions!(!showMoreOptions)}
              >
                <MoreOptions />
              </TouchableOpacity>
            )}
          </View>
        )}

        {showFilter && (
          <View style={styles.filterInputRow}>
            <TextInput
              style={[styles.poppinsRegular, styles.filterInput]}
              placeholder="filter"
              placeholderTextColor="white"
              value={localEmail}
              onChangeText={setLocalEmail}
            />
            <TouchableOpacity onPress={handleArrowClick}>
              <ArrowLarge />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {filterApplied && (
        <View style={styles.filterNotice}>
          <Text style={[styles.poppinsRegular, styles.whiteText]}>
            Your view is being filtered
          </Text>
          <TouchableOpacity onPress={handleRemoveFilter}>
            <Text
              style={[
                styles.poppinsRegular,
                styles.whiteText,
                styles.underline,
              ]}
            >
              Remove filter
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {subhead && (
        <Text style={[styles.poppinsRegular, styles.subhead]}>{subhead}</Text>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  transparentBackground: {
    backgroundColor: "transparent",
  },

  header: {
    backgroundColor: "#175B57",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    width: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowGap: {
    flexDirection: "row",
    gap: 16,
  },
  title: {
    color: "white",
    fontSize: 24,
    paddingLeft: 4,
  },
  filterInputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  filterInput: {
    flex: 1,
    color: "white",
    fontSize: 18,
    paddingTop: 8,
  },
  filterIconActive: {
    backgroundColor: "#FF9F1C", // Replace with your 'bg-secondary' if different
    borderRadius: 999,
    padding: 4,
  },
  filterNotice: {
    flexDirection: "row",
    paddingTop: 16,
    marginBottom: -16,
    gap: 8,
  },
  whiteText: {
    color: "white",
  },
  underline: {
    textDecorationLine: "underline",
  },
  subhead: {
    color: "white",
    paddingTop: 24,
    paddingLeft: 4,
    fontSize: 16,
  },
});
