import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";

function ListFooter() {
    const { colors } = useThemeContext()
    return (
        <SafeAreaView style={{ alignItems: "center" }} edges={["bottom"]}>
            <Text
                style={{
                    color: colors?.mainText,
                    fontSize: sizes?.fontSizeMedium
                }}
            >Select a value to change it</Text>
        </SafeAreaView>
    );
}

export default ListFooter;