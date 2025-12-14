import { Link, Redirect, router, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Image } from "expo-image";
import { useContext } from "react";
import { ExchangeRateProvider } from "@/context/ExchangeRateContext";
import { AuthContext } from "@/context/AuthContext";
export default function TabsLayout() {
    const { isReady, apiKey } = useContext(AuthContext);
    const theme = useColorScheme();

    if (!isReady) return null;
    if (!apiKey) return <Redirect href={"/(welcome)"} />;


    return (
        <ExchangeRateProvider>
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
                    headerRight: () => <Link href={"/ApiKeySettings"}
                        style={{ width: 40, height: 40, justifyContent: "center" }}><Image
                            style={{
                                width: 25,
                                height: 25,
                                padding: 14
                            }}
                            source={theme === 'light' ? require("@/assets/images/Settings-light.png") : require("@/assets/images/Settings-dark.png")}
                        /></Link>,
                    headerTitleAlign: "center",
                }} />
                <Stack.Screen name={"ApiKeySettings"} options={{
                    title: "Settings",
                    headerTitleAlign: "center",
                }} />
                <Stack.Screen name={"ValPicker"} options={{
                    title: "Change Value",
                    headerTitleAlign: "center",
                    headerBackTitle: "Back",
                    presentation: "modal",
                }} />
            </Stack>
        </ExchangeRateProvider>
    )
}