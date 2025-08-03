import { tick } from "@/assets/images";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  errorField: string;
  resetError: () => void;
};

const ErrorModal = ({ resetError, errorField }: Props) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.spacer} />
      <View style={styles.modalContent}>
        <Text style={[styles.poppinsRegular, styles.errorText]}>
          {errorField}
        </Text>
        <TouchableOpacity onPress={resetError}>
          <Image style={styles.tickIcon} source={tick} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000b0",
  },
  spacer: {
    height: "67%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#0F766E", // "bg-primary"
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 32,
    marginTop: -500,
    maxWidth: 208,
  },
  tickIcon: {
    width: 51,
    height: 51,
  },
});
