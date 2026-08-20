import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import { ReactNode } from "react";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";

interface SectionHeaderProps {
    children: string;
    onPress?: () => void;
    icon?: string | ReactNode;
    disabled?: boolean;
    textStyle?: TextStyle
    style?: ViewStyle
}

function SectionHeader({ children, onPress, disabled, icon, textStyle, style }: SectionHeaderProps) {
    const { colors } = useThemeContext();
    return (
        <Pressable onPress={onPress} disabled={disabled} style={
            {
                ...style,
                flexDirection: "row",
                alignItems: "center",
                gap: "1%",
            }
        }>
            <Text style={{
                ...textStyle,
                fontSize: sizes.headerFontSize,
                color: disabled ? colors.tint : colors.mainText,
                // fontWeight: "500",
            }}>
                {children}
            </Text>
            {icon}
        </Pressable>
    );
}

export default SectionHeader;