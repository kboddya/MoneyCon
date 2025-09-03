import {Link, router, Stack} from "expo-router";
import {Alert, useColorScheme} from "react-native";
import {updateData} from "@/app/services/apiService";
import {Image} from "expo-image";
import ToastProvider, {Toast} from "toastify-react-native"
import {errorDescription} from "@/app/services/helper";
import {useState} from "react";
import * as Network from "expo-network";
import * as SplashScreen from "expo-splash-screen"

export const unstable_settings = {
    initialRouteName: "/pages", // Set the initial route to the index page
}


export default function RootLayout() {
    const [networkStatus, setNetworkStatus] = useState({
        type: Network.NetworkStateType.UNKNOWN,
        isConnected: false,
        isInternetReachable: false,
        isChanged: false
    });

    Network.getNetworkStateAsync().then(state => {
        setNetworkStatus({
            type: state.type ?? Network.NetworkStateType.UNKNOWN,
            isConnected: state.isConnected ?? false,
            isInternetReachable: state.isInternetReachable ?? false,
            isChanged: true
        });
    });

    const theme = useColorScheme();
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme === 'light' ? "white" : "black", // Dark gray background
            },
            headerTintColor: theme === 'light' ? "#4C4C4C" : "#ABABAB", // White text color for the header
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShadowVisible: false,
        }}>
            <Stack.Screen name={"index"} options={{
                title: "MoneyCon",
                headerRight: () => <Link href={"/pages/ApiKeySettings"}
                                         style={{width: 40, height: 40, justifyContent: "center"}}><Image
                    style={{
                        width: 25,
                        height: 25,
                        padding: 14
                    }}
                    source={theme === 'light' ? require("../assets/images/Settings-light.png") : require("../assets/images/Settings-dark.png")}
                /></Link>,
                headerTitleAlign: "center",
            }}/>
            <Stack.Screen name={"pages/ApiKeySettings"} options={{
                title: "Settings",
                headerTitleAlign: "center",
                headerRight: () =>
                    <Image style={{width: 25, height: 25, padding: 11}}
                           source={theme === 'light' ? require("../assets/images/reload-light.png") : require("../assets/images/reload-dark.png")}
                           onTouchEnd={event => {
                               if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
                                   Toast.show({
                                       text1: "No internet connection",
                                       text2: "Please check your connection and try again",
                                       type: "error",
                                       position: "bottom",
                                       visibilityTime: 3000
                                   });
                                   return;
                               }

                               Toast.show({
                                   text1: "Updating data...",
                                   text2: "Please wait",
                                   type: "info",
                                   position: "bottom",
                                   visibilityTime: 5000,
                                   theme: theme === 'light' ? "light" : "dark",
                                   closeIcon: null
                               });

                               updateData(true).then(data => {
                                   if (data.success) {
                                       Toast.hide();
                                       router.dismissTo("/?updated=true");
                                   } else {
                                       Toast.hide();
                                       Alert.alert("Error updating data", errorDescription(data.error));
                                   }
                               })
                           }}/>
            }}/>
            <Stack.Screen name={"pages/ValPicker"} options={{
                title: "Change Value",
                headerTitleAlign: "center",
                headerBackTitle: "Back",
                presentation: "modal",
            }}/>
            <Stack.Screen name={"pages/welcome/index"} options={{
                headerShown: false,
                presentation: "modal"
            }}/>
            <Stack.Screen name={"pages/welcome/Signup"} options={{
                headerShown: false,
                presentation: "modal"
            }}/>
            <Stack.Screen name={"pages/welcome/Settings"} options={{
                headerShown: false,
                presentation: "modal"
            }}/>
        </Stack>
    );
}
