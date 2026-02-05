import { Stack } from "expo-router";
import { ExchangeRateProvider } from "@/context/ExchangeRateContext";
import { NetworkProvider } from "@/context/NetworkContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { ThemeProvider } from "@/context/ThemeContext";
export default function TabsLayout() {

    return (
        <ThemeProvider>
            <NetworkProvider>
                <CurrencyProvider>
                    <ExchangeRateProvider>
                        <Stack>
                            <Stack.Screen name={"index"} />
                            <Stack.Screen name={"Settings"} />
                            <Stack.Screen name={"CurrencyPicker/[ID]"} options={{ presentation: "modal" }} />
                        </Stack>
                    </ExchangeRateProvider>
                </CurrencyProvider>
            </NetworkProvider>
        </ThemeProvider>
    )
}