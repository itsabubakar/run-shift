import Chevron from "@/assets/icons/Chevron";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import CheckBox from "./CustomCheckBox";

type Option = {
  label: string;
  value: any;
};

type Props = {
  options: Option[];
  onSelect: (value: any) => void;
  header: string;
};

const CustomSelect = ({ options, onSelect, header }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}
      >
        <Text style={[styles.poppinsRegular, styles.text]}>
          {selectedOption ? selectedOption.label : header}
        </Text>
        <Chevron />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.closeButton}
            >
              <Chevron />
            </TouchableOpacity>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.poppinsRegular, styles.optionText]}>
                    {item.label}
                  </Text>
                  <CheckBox
                    isCheck={selectedOption?.value === item.value}
                    onChecked={() => handleSelect(item)}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: "#27736E",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#A4A705",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff30",
  },
  optionText: {
    color: "white",
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default CustomSelect;
