import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import useKeyboard from "@/hooks/useKeyboard";
import { View, Text, Animated } from "react-native";

function NotFoundAnyResult() {
    const keyboardMargin = useKeyboard();
    const { colors } = useThemeContext();
    return (
        <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Animated.View style={{ alignItems: "center", paddingBottom: keyboardMargin }}>
                <Text
                    style={{
                        color: colors?.mainText,
                        fontSize: sizes?.fontSizeMedium
                    }}
                >Not results found</Text>
            </Animated.View>
        </View>
    );
}

export default NotFoundAnyResult;