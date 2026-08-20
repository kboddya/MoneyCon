import { useThemeContext } from "@/context/ThemeContext";
import { View } from "react-native";

function Border() {
    const { colors } = useThemeContext()
    return (
        <View style={
            {
                width: 1,
                height: "70%",
                backgroundColor: colors.border
            }} />);
}

export default Border;