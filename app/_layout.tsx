import {Link, router, Stack} from "expo-router";
import {Alert, useColorScheme} from "react-native";
import {updateData} from "@/app/services/apiService";
import {Image} from "expo-image";
import Toast from "react-native-toast-message"
import {errorDescription} from "@/app/services/helper";
import {useState} from "react";
import {useNetworkState, NetworkStateType} from "expo-network";
import * as Network from "expo-network";

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
                           source={networkStatus.isChanged && (!networkStatus.isConnected || networkStatus.isInternetReachable) === null ? null : (theme === 'light' ? require("../assets/images/reload-light.png") : require("../assets/images/reload-dark.png"))}
                           onTouchEnd={event => {
                               if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
                                   Toast.show({
                                       text1: "No internet connection",
                                       type: "error",
                                       position: "bottom"
                                   });
                                   return;
                               }

                               Toast.show({
                                   text1: "Updating data...",
                                   type: "info",
                                   position: "bottom"
                               });
                               updateData(true).then(data => {
                                   if (data.success) {
                                       Toast.show({
                                           text1: "Data updated successfully",
                                           type: "success",
                                           position: "bottom"
                                       });
                                       router.dismissTo("/");
                                   } else {
                                       Alert.alert("Error updating data", errorDescription(data.error));
                                   }
                               })
                           }}/>
            }}/>
            <Stack.Screen name={"pages/ValPicker"} options={{
                title: "Change Value",
                headerTitleAlign: "center"
            }}/>
        </Stack>
    );
}
