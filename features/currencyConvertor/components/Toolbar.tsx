import { router, Stack } from "expo-router";
import { Platform } from "react-native";
import MoreHoriz from "@expo/material-symbols/more_horiz.xml";


function Toolbar() {
    return (
        <Stack.Toolbar placement="right">
            <Stack.Toolbar.Button
                icon={Platform.OS === "android" ? MoreHoriz : 'ellipsis'}
                onPress={() => router.push("/Settings")}
            />
        </Stack.Toolbar>
    );
}

export default Toolbar;