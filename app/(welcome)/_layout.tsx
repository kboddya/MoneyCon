import { Stack } from "expo-router"

export default function WelcomeLayout() {
    return (
        <Stack>
            <Stack.Screen name={"index"} options={{
                headerShown: false,
                presentation: "modal"
            }} />
            <Stack.Screen name={"Signup"} options={{
                headerShown: false,
                presentation: "modal"
            }} />
            <Stack.Screen name={"Settings"} options={{
                headerShown: false,
                presentation: "modal"
            }} />
        </Stack>
    )
}