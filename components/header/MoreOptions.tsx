import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Person from "@/assets/icons/header/Person";
import CheckBox from "../settings/CheckBox";
import Settings from "@/assets/icons/drawer/Settings";
import CalenderIcon from "@/assets/icons/CalenderIcon";
import Help from "@/assets/icons/Help";
import EyeClose from "@/assets/icons/EyeClose";
import { useAppContext } from "@/context/AppContext";
import { Link, usePathname } from "expo-router";

const MoreOptions = () => {
  const {
    showMoreOptions,
    setMoreOptions,
    showHorizontalCalendar,
    setShowHorizontalCalendar,
    showProfilePicture,
    setShowProfilePicture,
    pushNotifications,
    setPushNotifications,
    hideReadMessages,
    setHideReadMessages,
  } = useAppContext();

  const pathname = usePathname();

  return (
    <View>
      <Modal
        visible={showMoreOptions}
        transparent
        onRequestClose={() => setMoreOptions?.(!showMoreOptions)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMoreOptions?.(!showMoreOptions)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {/* Home Page Options */}
            {pathname === "/" && (
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() =>
                  setShowHorizontalCalendar?.(!showHorizontalCalendar)
                }
              >
                <CalenderIcon />
                <Text style={[styles.optionText, styles.poppinsRegular]}>
                  Calendar
                </Text>
                <CheckBox
                  color="white"
                  isCheck={showHorizontalCalendar}
                  onChecked={() =>
                    setShowHorizontalCalendar?.(!showHorizontalCalendar)
                  }
                />
              </TouchableOpacity>
            )}

            {/* Notifications Page */}
            {pathname === "/notifications" && (
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setPushNotifications?.(!pushNotifications)}
              >
                <CalenderIcon />
                <Text style={[styles.optionText, styles.poppinsRegular]}>
                  Push notifications
                </Text>
                <CheckBox
                  color="white"
                  isCheck={pushNotifications}
                  onChecked={() => setPushNotifications?.(!pushNotifications)}
                />
              </TouchableOpacity>
            )}

            {/* Notice Board Page */}
            {pathname === "/noticeBoard" && (
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setHideReadMessages?.(!hideReadMessages)}
              >
                <EyeClose />
                <Text style={[styles.optionText, styles.poppinsRegular]}>
                  Hide read messages
                </Text>
                <CheckBox
                  color="white"
                  isCheck={hideReadMessages}
                  onChecked={() => setHideReadMessages?.(!hideReadMessages)}
                />
              </TouchableOpacity>
            )}

            {/* Facilities Page */}
            {pathname === "/facilities" && (
              <TouchableOpacity style={styles.optionRow}>
                <Person />
                <Text style={[styles.optionText, styles.poppinsRegular]}>
                  Show facility colours
                </Text>
                <CheckBox
                  color="white"
                  isCheck={true}
                  onChecked={() => console.log("Facility toggle")}
                />
              </TouchableOpacity>
            )}

            {/* General Options */}
            {pathname !== "/settings" && pathname !== "/facilities" && (
              <>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setShowProfilePicture?.(!showProfilePicture)}
                >
                  <Person />
                  <Text style={[styles.optionText, styles.poppinsRegular]}>
                    Show profile pictures
                  </Text>
                  <CheckBox
                    color="white"
                    isCheck={showProfilePicture}
                    onChecked={() =>
                      setShowProfilePicture?.(!showProfilePicture)
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionRow}>
                  <Help />
                  <Text style={[styles.optionText, styles.poppinsRegular]}>
                    Help
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Settings Link */}
            <Link href="/settings" asChild>
              <TouchableOpacity style={styles.optionRow}>
                <Settings color="white" />
                <Text style={[styles.optionText, styles.poppinsRegular]}>
                  Settings
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    paddingTop: 80,
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#175B57",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    marginRight: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
  },
  optionText: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default MoreOptions;
