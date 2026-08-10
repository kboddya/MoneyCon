import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import { Text } from "react-native";

function CurrentCount({ currentCount }: { currentCount: string | number }) {
    const { colors } = useThemeContext();
    return (
        <Text style={{
            color: colors.mainText,
            fontSize: sizes.fontSizeMedium,
            flex: 1,
            textAlign: "center",
            alignSelf: "center"
        }}>
            {currentCount}
        </Text>
    );
}

export default CurrentCount;