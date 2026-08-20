import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import useRatesUpdater from "@/hooks/useRatesUpdater";
import { View, Text, Pressable } from "react-native";

function RefreshCurrencyList() {
    const [isLoading, updateExchangeRate] = useRatesUpdater()
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
            <Pressable onPress={() => updateExchangeRate()} disabled={isLoading}>
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