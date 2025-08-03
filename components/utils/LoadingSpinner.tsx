import { View, ActivityIndicator, StyleSheet } from "react-native";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#175B57" />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#000000b0", // semi-transparent black
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // ensure it overlays content
  },
});
