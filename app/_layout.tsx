import {Stack} from "expo-router";
import {View, Text} from "react-native";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{title: "Home"}}/>
            <Stack.Screen name={"apiKeySettings"} options={{title: "Settings"}}/>
            <Stack.Screen name={"valPicker"} options={{title: "Val Picker"}}/>
        </Stack>
    );
}
