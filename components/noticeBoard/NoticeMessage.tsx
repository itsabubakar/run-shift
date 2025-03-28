import ProfilePicture from "@/assets/icons/ProfilePicture";
import { useAuth } from "@/context/AuthContext";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
type Props = {
  message: string;
};
const NoticeMessage = ({ message }: Props) => {
  const { authState, setAuthState } = useAuth();

  return (
    <View className="pt-10">
      <View className="flex-row justify-between">
        <View className="  max-w-[90px] mr-2 ">
          <Text
            className="text-xl text-[#175B57] pb-1"
            style={styles.poppinsRegular}
          >
            {authState?.firstName}
          </Text>
          <ProfilePicture />
          <Text
            className="text-[12px] pt-2  text-[#175B57]"
            style={styles.poppinsRegular}
          >
            Email and push
          </Text>
        </View>
        <View className="">
          <Text
            style={styles.poppinsRegular}
            className="bg-[#A4A705] text-white px-3 py-3 rounded-xl text-[14px] max-w-[240px]"
          >
            {message}
          </Text>
          <Text
            className="text-[12px]   self-end pt-2  text-[#175B57]"
            style={styles.poppinsRegular}
          >
            2 minutes ago
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default NoticeMessage;
