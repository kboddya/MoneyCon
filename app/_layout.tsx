import {Link, router, Stack} from "expo-router";
import {Alert} from "react-native";
import {updateData} from "@/app/sevices/apiService";
import {Image} from "expo-image";
import Toast from "react-native-simple-toast"
import {errorDescription} from "@/app/sevices/helper";
import {dismissTo} from "expo-router/build/global-state/routing";
import {getApiKey} from "@/app/sevices/cacheService";

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
                               Toast.show("Updating data...", Toast.SHORT);
                               updateData(true).then(data => {
                                   if (data.success) {
                                       Toast.show("Data updated successfully", Toast.SHORT);
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
