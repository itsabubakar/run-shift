import ProfilePicture from "@/assets/icons/ProfilePicture";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, Key } from "react";

type Props = {
  user?: {
    name: string;
  };
  info: string[];
};

const Shift = ({ user, info }: Props) => {
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.poppinsRegular, styles.userName]}>
          {user?.name}
        </Text>
        {!showCheckBoxes && <ProfilePicture />}
      </View>

      <View>
        {info.map((item, index: Key) => (
          <TouchableOpacity
            key={index}
            style={[styles.infoItem, showCheckBoxes && styles.infoItemActive]}
            // onLongPress={() => setShowCheckBoxes(!showCheckBoxes)}
          >
            <Text style={[styles.poppinsRegular, styles.infoText]}>{item}</Text>

            {/* Uncomment below if you want checkboxes later */}
            {/* {showCheckBoxes && (
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  isCheck={isChecked}
                  onChecked={() => setChecked(!isChecked)}
                />
              </View>
            )} */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Shift;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB", // Tailwind's gray-300
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 20,
  },
  infoItem: {
    flexDirection: "row",
    padding: 4,
    marginBottom: 8,
    borderRadius: 16,
  },
  infoItemActive: {
    backgroundColor: "#F0F0F0",
  },
  infoText: {
    backgroundColor: "#FF9F1C", // assuming secondary
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  checkBoxWrapper: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});
