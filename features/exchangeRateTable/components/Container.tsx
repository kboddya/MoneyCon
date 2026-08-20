import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from 'expo-blur';


function Container({ children }: { children: ReactNode }) {
    const { colors } = useThemeContext();
    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.containerBg,
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 10,
                shadowOpacity: 0.25,
                marginBottom: 20,
                shadowColor: colors.headerTint
            },
        ]}>
            {children}
            <BlurView />
        </View>
    );
}

export default Container;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: "4.6%",
        borderRadius: 10,
        paddingHorizontal: "6%",
        paddingVertical: "5.2%",
    },
})