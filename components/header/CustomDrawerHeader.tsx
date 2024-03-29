import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props: any) {
    const { top, bottom } = useSafeAreaInsets()
    const router = useRouter()
    return <View style={{ flex: 1 }}>
        <DrawerContentScrollView
            contentContainerStyle={{ backgroundColor: "#bada55" }}
            {...props}>
            <View style={{

            }}>
                <View className="bg-red-500 h-20 w-20 rounded-full justify-center items-center"></View>
                <Text>Hello</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem onPress={() => router.replace('/')} label={"Logout"} />
        </DrawerContentScrollView>
        <View
            style={{
                paddingBottom: 20 + bottom,
                padding: 20,
                borderTopColor: '#ccc',
                borderTopWidth: 1,
            }}
        >
            <Text>Footer</Text>
        </View>
    </View>

}