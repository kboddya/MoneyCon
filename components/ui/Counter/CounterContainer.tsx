import { View } from "react-native";
import { SettingsControlStyles } from "@/constants/styles";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";

function CounterContainer({ children }: { children: ReactNode }) {
    const { colors } = useThemeContext();
    return (
        <View style={[
            SettingsControlStyles.selectionControlStyle,
            {
                flexDirection: "row",
                padding: "1%",
                backgroundColor: colors.segmentControlBg,
            },
        ]}>
            {children}
        </View>
    );
}

export default CounterContainer;