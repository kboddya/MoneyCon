import {Link, Stack} from "expo-router";
import {View, Text} from "react-native";
import {Image} from "expo-image";

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
                    source={require("../../assets/images/Settings.svg")}
                /></Link>,
                headerTitleAlign: "center"
            }}/>
            <Stack.Screen name={"ApiKeySettings"} options={{
                title: "Settings",
                headerTitleAlign: "center"
            }}/>
            <Stack.Screen name={"ValPicker"} options={{
                title: "Change Value",
                headerTitleAlign: "center"
            }}/>
        </Stack>
    );
}
