import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

interface SettingsHeaderProps {
    children: string;
    isResetable?: boolean;
    onPress?: () => void;
}

function SettingsHeader({ children, onPress, isResetable }: SettingsHeaderProps) {
    const { colors } = useThemeContext();
    return (
        <Pressable onPress={onPress}>
            <Text style={{
                fontSize: sizes.headerFontSize,
                color: colors.mainText,
                fontWeight: "semibold",
                paddingLeft: "4%",
            }}
            >
                {children + " "}
                {isResetable && <MaterialCommunityIcons
                    name="lock-reset"
                    size={sizes.headerFontSize}
                    color={colors.mainText}
                />}
            </Text>
        </Pressable>
    );
}

export default SettingsHeader;