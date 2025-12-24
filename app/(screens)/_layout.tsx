import { Link, Redirect, router, Stack } from "expo-router";
import { useColorScheme, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useContext } from "react";
import { ExchangeRateProvider } from "@/context/ExchangeRateContext";
import { AuthContext } from "@/context/AuthContext";
import { Pressable } from "react-native"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function TabsLayout() {
    const { isReady, apiKey } = useContext(AuthContext);
    const theme = useColorScheme();
    const { fontScale } = useWindowDimensions();

    if (!isReady) return null;
    if (!apiKey) return <Redirect href={"/(welcome)"} />;


    return (
        <ExchangeRateProvider>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: theme === 'light' ? "white" : "black"
                },
                headerTintColor: theme === 'light' ? "#4C4C4C" : "#ABABAB", // White text color for the header
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerShadowVisible: false,
            }}>
                <Stack.Screen name={"index"} options={{
                    title: "MoneyCon",
                    headerRight: () =>
                        <Pressable onResponderEnd={() => router.push("/(screens)/ApiKeySettings")} style={{ padding: 4 * fontScale, justifyContent: "center", alignItems: "center" }}>
                            <MaterialCommunityIcons name="account" size={2 * fontScale * 14} color={theme === 'light' ? "#4C4C4C" : "#ABABAB"} />
                        </Pressable>

                    ,
                    headerTitleAlign: "center",
                }} />
                <Stack.Screen name={"ApiKeySettings"} options={{
                    title: "Settings",
                    headerTitleAlign: "center",
                    headerBackTitle: "Back",
                }} />
                <Stack.Screen name={"ValPicker"} options={{
                    title: "Change Value",
                    headerTitleAlign: "center",
                    presentation: "modal",
                }} />
            </Stack>
        </ExchangeRateProvider>
    )
}