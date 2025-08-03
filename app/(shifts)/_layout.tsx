import { BackHandler, Linking, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProfilePicture from "@/assets/icons/drawer/ProfilePicture";
import RunShiftIcon from "@/assets/icons/drawer/RunShiftIcon";
import Settings from "@/assets/icons/drawer/Settings";
import Font from "@/assets/icons/drawer/Font";
import Terms from "@/assets/icons/drawer/Terms";
import Privacy from "@/assets/icons/drawer/Privacy";
import Contact from "@/assets/icons/drawer/Contact";
import Bug from "@/assets/icons/drawer/Bug";
import Rate from "@/assets/icons/drawer/Rate";
import Desktop from "@/assets/icons/drawer/Desktop";
import Logout from "@/assets/icons/drawer/Logout";
import Exit from "@/assets/icons/drawer/Exit";
import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import * as SecureStore from "expo-secure-store";
import { OpenDoor } from "@/assets/icons";
import { useNavigation } from "expo-router";

const Layout = () => {
  const navigation = useNavigation();
  const { authState, setAuthState } = useAuth();
  const {
    showProfilePicture,
    showFontSlider,
    setShowFontSlider,
    setRefreshKey,
  } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("password");

    setAuthState!({
      authenticated: false,
      role: null,
      email: "",
      firstName: "",
      lastName: "",
      token: "",
      companyId: "",
      shift: [],
      staffId: "",
    });

    router.replace("/");
  };

  const handleRefresh = () => {
    setRefreshKey!((prevKey) => prevKey + 1);
  };

  function CustomDrawerContent(props: any) {
    const { top, bottom } = useSafeAreaInsets();

    return (
      <View style={styles.drawerContainer}>
        <DrawerContentScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.drawerScrollContainer}
          {...props}
        >
          <View style={styles.profileContainer}>
            {showProfilePicture && (
              <View style={styles.profileImageWrapper}>
                <ProfilePicture />
              </View>
            )}
            <View>
              <Text style={[styles.poppinsSemiBold, styles.profileName]}>
                {authState?.firstName}
              </Text>
              <Text style={[styles.poppinsSemiBold, styles.profileEmail]}>
                {authState?.email}
              </Text>
            </View>
          </View>

          <View style={styles.drawerItemWrapper}>
            <DrawerItemList {...props} />

            <DrawerItem
              icon={({ color }) => <Rate color={color} />}
              label=" Rate Us On Google Play"
              labelStyle={styles.drawerLabel}
              onPress={() => {
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=com.thetrueseeker.runshift"
                ).catch(console.error);
              }}
            />

            <DrawerItem
              icon={({ color }) => <Desktop color={color} />}
              label=" Desktop Site"
              labelStyle={styles.drawerLabel}
              onPress={() => {
                Linking.openURL("https://www.runshift360.com").catch(
                  console.error
                );
              }}
            />

            <DrawerItem
              icon={({ color }) => <Logout color={color} />}
              label=" Logout"
              labelStyle={styles.drawerLabel}
              onPress={handleLogout}
            />

            <DrawerItem
              icon={({ color }) => <Exit color={color} />}
              label=" Exit"
              labelStyle={styles.drawerLabel}
              onPress={() => BackHandler.exitApp()}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#A4A705",
          drawerActiveTintColor: "white",
          drawerLabelStyle: styles.drawerLabel,
        }}
      >
        <Drawer.Screen
          name="(shift)"
          options={{
            drawerLabel: "  Shifts",
            title: "runshift",
            drawerIcon: ({ color }) => <RunShiftIcon color={color} />,
          }}
        />
        <Drawer.Screen
          name="openShifts"
          options={{
            drawerLabel: "  Open Shifts",
            title: "Open Shifts",
            drawerIcon: ({ color }) => <OpenDoor color={color} />,
          }}
        />
        <Drawer.Screen
          name="(settings)"
          options={{
            drawerLabel: "  Settings",
            title: "settings",
            drawerIcon: ({ color }) => <Settings color={color} />,
          }}
        />
        {/* <Drawer.Screen
          name="font"
          options={{
            drawerLabel: "  Font Size",
            title: "Font Size",
            drawerIcon: ({ color }) => <Font color={color} />,
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              setShowFontSlider!(true);
              if (pathname === "/") {
                router.push(`/(shifts)/(shift)/shift`);
              } else {
                router.push(pathname as any);
              }
            },
          }}
        /> */}
        <Drawer.Screen
          name="terms"
          options={{
            drawerLabel: "  Terms & Conditions",
            title: "terms & conditions",
            drawerIcon: ({ color }) => <Terms color={color} />,
          }}
        />
        <Drawer.Screen
          name="privacy"
          options={{
            drawerLabel: "  Privacy Policy",
            title: "privacy policy",
            drawerIcon: ({ color }) => <Privacy color={color} />,
          }}
        />
        <Drawer.Screen
          name="getInTouch"
          options={{
            drawerLabel: "  Get In Touch",
            title: "getInTouch",
            drawerIcon: ({ color }) => <Contact color={color} />,
          }}
        />
        <Drawer.Screen
          name="reportABug"
          options={{
            drawerLabel: "  Report A Bug",
            title: "report a bug",
            drawerIcon: ({ color }) => <Bug color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
  },
  drawerScrollContainer: {
    // backgroundColor: "#175B57",
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
  profileContainer: {
    // paddingHorizontal: 24,
    backgroundColor: "#175B57",
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    height: 125,
    justifyContent: "center",
    gap: 10,
  },
  profileImageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "white",
    fontSize: 20,
    paddingBottom: 4,
  },
  profileEmail: {
    color: "white",
    fontSize: 14,
  },
  drawerItemWrapper: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 12,
  },
  drawerLabel: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    marginLeft: -14,
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});
