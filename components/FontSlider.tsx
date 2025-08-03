import React from "react";
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "expo-router";
import Slider from "@react-native-community/slider";

const FontSlider = () => {
  const { fontSize, setFontSize, showFontSlider, setShowFontSlider } =
    useAppContext();

  return (
    <View>
      <Modal
        visible={showFontSlider}
        transparent={true}
        onRequestClose={() => setShowFontSlider!(!showFontSlider)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowFontSlider!(!showFontSlider)}
        >
          <View style={styles.modalContent}>
            <Slider
              // style={{ width: 340, height: 80 }}
              minimumValue={10}
              maximumValue={20}
              value={fontSize}
              thumbTintColor="#fefefe"
              minimumTrackTintColor="#21D0C6"
              maximumTrackTintColor="#fefefe"
              onValueChange={(value) => setFontSize!(value)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // paddingTop: 80,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.158)",
  },
  modalContent: {
    backgroundColor: "#175B57",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    marginBottom: 40,
  },

  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default FontSlider;
