import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import useExchangeRateContext from "@/stores/ExchangeRateStore";
import { View, Text, Pressable } from "react-native";

function RefreshCurrencyList() {
    const { updateExchangeRate } = useExchangeRateContext()
    const { colors } = useThemeContext()

    return (
        <View
            style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
        >
            <Text
                style={{
                    color: colors?.mainText,
                    fontSize: sizes?.fontSizeMedium
                }}
            >
                Could't load currency list
            </Text>
            <Pressable onPress={updateExchangeRate}>
                <Text
                    style={{
                        color: colors?.mainText,
                        fontSize: sizes?.fontSizeMedium
                    }}
                >
                    Retry
                </Text>
            </Pressable>
        </View>
    );
}

export default RefreshCurrencyList;