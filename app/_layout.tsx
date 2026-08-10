import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack screenOptions={{
                headerShown: true,
                headerBlurEffect: "none",
                headerTransparent: true,
                headerTitleAlign: "center"
            }}>
                <Stack.Screen name={"index"} />
                <Stack.Screen name={"Settings"} />
                <Stack.Screen name={"CurrencyPicker/[ID]"} options={{ presentation: "modal" }} />
            </Stack>
        </ThemeProvider >
    );
}