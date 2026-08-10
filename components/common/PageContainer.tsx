import { useThemeContext } from "@/context/ThemeContext";
import { useHeaderHeight } from "expo-router/react-navigation";
import { ReactNode } from "react";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PageContainer({ children }: { children: ReactNode }) {
    const { colors } = useThemeContext();
    const headerHeight = useHeaderHeight()
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.appColor,
            paddingTop: headerHeight,
        }} edges={["bottom"]}>
            <KeyboardAvoidingView behavior={"padding"}
                style={{ flex: 1 }}
                contentContainerStyle={{
                }}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView >);
}

export default PageContainer;