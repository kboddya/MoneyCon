import {Link, Stack} from "expo-router";
import {View, Text} from "react-native";
import {Image} from "expo-image";

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
                    }}
                    source={require("../assets/images/Settings.svg")}
                /></Link>,
                headerTitleAlign: "center"
            }}/>
            <Stack.Screen name={"pages/ApiKeySettings"} options={{
                title: "Settings",
                headerTitleAlign: "center"
            }}/>
            <Stack.Screen name={"pages/ValPicker"} options={{
                title: "Change Value",
                headerTitleAlign: "center"
            }}/>
        </Stack>
    );
}
