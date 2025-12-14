import { Stack, SplashScreen } from "expo-router";
import { NetworkProvider } from "@/context/NetworkContext";
import { AuthProvider } from "@/context/AuthContext";
import { ExchangeRateProvider } from "@/context/ExchangeRateContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <NetworkProvider>
            <AuthProvider>
                <Stack screenOptions={{
                    headerShown: false,
                    animation: "none"
                }}>
                    <Stack.Screen name="(screens)" />
                    <Stack.Screen name="(welcome)" />
                </Stack>
            </AuthProvider>
        </NetworkProvider>
    )
}
