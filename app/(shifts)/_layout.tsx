import { BackHandler, Linking, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
// import CustomDrawerContent from '@/components/header/CustomDrawerHeader';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProfilePicture from "@/assets/icons/drawer/ProfilePicture";
import RunShiftIcon from "@/assets/icons/drawer/RunShiftIcon";
import Notification from "@/assets/icons/drawer/Notification";
import Refresh from "@/assets/icons/drawer/Refresh";
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
type Props = {};

const Layout = (props: Props) => {
  const { authState, setAuthState } = useAuth();
  const { showProfilePicture } = useAppContext();
  const { showFontSlider, setShowFontSlider } = useAppContext();
  const router = useRouter();

  const pathname = usePathname();
  const { setRefreshKey } = useAppContext();

  const handleRefresh = () => {
    setRefreshKey!((prevKey) => prevKey + 1);
  };

  // Logout function
  const handleLogout = async () => {
    // Remove stored email and password
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("password");

    // Clear authentication state
    setAuthState!({
      authenticated: false,
      role: null,
      email: "",
      firstName: "",
      lastName: "",
      token: "",
      companyId: "",
      shift: [],
    });

    // Navigate to login screen
    router.replace("/"); // Replace this with the correct route to your login screen
  };

  function CustomDrawerContent(props: any) {
    const { top, bottom } = useSafeAreaInsets();
    const router = useRouter();

    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          className=""
          contentContainerStyle={{
            backgroundColor: "#175B57",
          }}
          {...props}
        >
          <View className="px-6 bg-[#175B57] rounded-b-[30px] flex-row items-center h-[125px] justify-center gap-x-[10px] ">
            {/* Profile image */}
            {showProfilePicture && (
              <View className=" h-[50] w-[50] rounded-full justify-center items-center">
                <ProfilePicture />
              </View>
            )}

            {/* name and email */}
            <View className="">
              <Text
                style={styles.poppinsSemiBold}
                className="text-white text-xl pb-1"
              >
                {authState?.firstName}
              </Text>
              <Text
                style={styles.poppinsSemiBold}
                className="font-light text-white"
              >
                {authState?.email}{" "}
              </Text>
              {/* <Text style={styles.poppinsRegular} className='font-light text-white'>alaoIfeoluwa@gmail.com </Text> */}
            </View>
          </View>

          <View className="bg-white rounded-t-md">
            <DrawerItemList {...props} />

            <DrawerItem
              icon={({ focused, color, size }) => <Desktop color={color} />}
              labelStyle={{
                fontFamily: "PoppinsRegular",
                fontSize: 14,
                marginLeft: -14,
              }}
              onPress={() => {
                Linking.openURL("https://www.runshift360.com").catch((err) => {
                  console.error("An error occurred", err);
                });
              }}
              label={"desktop site"}
            />
            <DrawerItem
              icon={({ focused, color, size }) => <Logout color={color} />}
              labelStyle={{
                fontFamily: "PoppinsRegular",
                fontSize: 14,
                marginLeft: -14,
              }}
              onPress={handleLogout}
              label={"Logout"}
            />
            <DrawerItem
              icon={({ focused, color, size }) => <Exit color={color} />}
              labelStyle={{
                fontFamily: "PoppinsRegular",
                fontSize: 14,
                marginLeft: -14,
              }}
              onPress={() => {
                BackHandler.exitApp(); // This exits the app
              }}
              label={"Exit"}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "#A4A705",
          drawerActiveTintColor: "white",

          drawerLabelStyle: {
            marginLeft: -14,
            fontFamily: "PoppinsRegular",
            fontSize: 14,
          },
        }}
      >
        <Drawer.Screen
          name="(shift)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "runshift",
            title: "runshift",
            drawerIcon: ({ color }: any) => <RunShiftIcon color={color} />,
          }}
        />

        <Drawer.Screen
          name="notifications" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "notifications",
            title: "notifications",
            drawerIcon: ({ color }: any) => <Notification color={color} />,
          }}
        />

        <Drawer.Screen
          name="openShifts" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Open Shifts",
            title: "Open Shifts",
            drawerIcon: ({ color }: any) => <OpenDoor color={color} />,
          }}
        />

        {/* <Drawer.Screen
                    name="refresh" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'refresh',
                        title: 'refresh',
                        drawerIcon: ({ color }: any) => (
                            <Refresh color={color} />
                        )
                    }}
                /> */}

        <Drawer.Screen
          name="(settings)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "settings",
            title: "settings",
            drawerIcon: ({ color }: any) => <Settings color={color} />,
          }}
        />

        {/* <Drawer.Screen
                    name="language" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'english (uk)',
                        title: 'english (uk)',
                        drawerIcon: ({ color }: any) => (
                            <Language color={color} />
                        )
                    }}
                /> */}

        <Drawer.Screen
          name="font"
          options={{
            drawerLabel: "Font Size",
            title: "Font Size",
            drawerIcon: ({ color }) => <Font color={color} />,
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault(); // Prevent navigation
              setShowFontSlider!(true);

              if (pathname === "/") {
                router.push(`/(shifts)/(shift)/shift`);
              } else {
                router.push(pathname as any);
              }
            },
          }}
        />
        <Drawer.Screen
          name="refresh"
          options={{
            drawerLabel: "Refresh",
            title: "Refresh",
            drawerIcon: ({ color }) => <Refresh color={color} />,
          }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault(); // Prevent navigation
              // setShowFontSlider!(true)
              handleRefresh();

              if (pathname === "/") {
                router.push(`/(shifts)/(shift)/shift`);
              } else {
                router.push(pathname as any);
              }
            },
          }}
        />

        {/* <Drawer.Screen
                    name="mode" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'dark mode',
                        title: 'dark mode',
                        drawerIcon: ({ color }: any) => (
                            <DarkMode color={color} />
                        )
                    }}
                /> */}

        <Drawer.Screen
          name="terms" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "terms & conditions",
            title: "terms & conditions",
            drawerIcon: ({ color }: any) => <Terms color={color} />,
          }}
        />
        <Drawer.Screen
          name="privacy" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "privacy policy",
            title: "privacy policy",
            drawerIcon: ({ color }: any) => <Privacy color={color} />,
          }}
        />
        <Drawer.Screen
          name="getInTouch" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "get in touch",
            title: "getInTouch",
            drawerIcon: ({ color }: any) => <Contact color={color} />,
          }}
        />
        <Drawer.Screen
          name="reportABug" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "report a bug",
            title: "report a bug",
            drawerIcon: ({ color }: any) => <Bug color={color} />,
          }}
        />
        <Drawer.Screen
          name="rate" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "rate us on google play",
            title: "rate us on google play",
            drawerIcon: ({ color }: any) => <Rate color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  poppinsRegular: {
    fontFamily: "PoppinsRegular",
  },
  poppinsSemiBold: {
    fontFamily: "PoppinsSemiBold",
  },
});
