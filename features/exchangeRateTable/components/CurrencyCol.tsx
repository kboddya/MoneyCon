import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import { View, Text, TextStyle } from "react-native";

function CurrencyCol({ currency, currencyStyle }: { currency?: string, currencyStyle?: TextStyle }) {
    const { colors } = useThemeContext();
    return (
        <View style={{ flex: 1 }}>
            <Text style={{
                ...currencyStyle,
                color: colors.mainText,
                fontSize: sizes.fontSizeMedium,
            }}>
                {currency?.toUpperCase()}
            </Text>
        </View>
    );
}

export default CurrencyCol;