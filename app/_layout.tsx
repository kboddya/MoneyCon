import {Link, router, Stack} from "expo-router";
import {Alert} from "react-native";
import {updateData} from "@/app/sevices/apiService";
import {Image} from "expo-image";
import {Toast} from "toastify-react-native";
import {errorDescription} from "@/app/sevices/helper";
import ToastManager from "toastify-react-native/components/ToastManager";
import {dismissTo} from "expo-router/build/global-state/routing";

export const unstable_settings = {
    initialRouteName: "/pages", // Set the initial route to the index page
    // Ensure that the app is always in dark mode
    appearance: "light",
}

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{
                title: "MoneyCon",
                headerRight: () => <Link href={"/pages/ApiKeySettings"}><Image
                    style={{
                        width: 25,
                        height: 25,
                        padding: 14
                    }}
                    source={require("../assets/images/Settings.svg")}
                /></Link>,
                headerTitleAlign: "center"
            }}/>
            <Stack.Screen name={"pages/ApiKeySettings"} options={{
                title: "Settings",
                headerTitleAlign: "center",
                headerRight: () =>
                    <Image style={{width: 20, height: 20, padding: 11}}
                           source={require("../assets/images/reload.png")}
                           onTouchEnd={event => {
                               updateData(true).then(data => {
                                   if (data === true) {
                                        Toast.show({
                                            text1: "Data updated successfully",
                                            type: "success",
                                            visibilityTime: 3000
                                        });
                                       dismissTo("/");
                                   } else if (typeof data === "string") {
                                       Alert.alert("Error updating data", errorDescription(data));
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
