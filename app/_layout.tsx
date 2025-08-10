import {Link, router, Stack} from "expo-router";
import {Alert, useColorScheme} from "react-native";
import {updateData} from "@/app/services/apiService";
import {Image} from "expo-image";
import Toast from "react-native-simple-toast"
import {errorDescription} from "@/app/services/helper";

export const unstable_settings = {
    initialRouteName: "/pages", // Set the initial route to the index page
}

export default function RootLayout() {
    const theme = useColorScheme();
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: theme === 'light' ? "white" : "black", // Dark gray background
            },
            headerTintColor: theme === 'light' ? "#4C4C4C": "#ABABAB", // White text color for the header
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerShadowVisible: false,
        }}>
            <Stack.Screen name={"index"} options={{
                title: "MoneyCon",
                headerRight: () => <Link href={"/pages/ApiKeySettings"} style={{backgroundSize: 40}}><Image
                    style={{
                        width: 25,
                        height: 25,
                        padding: 14
                    }}
                    source={theme === 'light'? require("../assets/images/Settings-light.png"): require("../assets/images/Settings-dark.png")}
                /></Link>,
                headerTitleAlign: "center",
            }}/>
            <Stack.Screen name={"pages/ApiKeySettings"} options={{
                title: "Settings",
                headerTitleAlign: "center",
                headerRight: () =>
                    <Image style={{width: 25, height: 25, padding: 11}}
                           source={theme === 'light'? require("../assets/images/reload-light.png"): require("../assets/images/reload-dark.png")}
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
