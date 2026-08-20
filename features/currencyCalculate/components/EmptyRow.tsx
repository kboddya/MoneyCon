import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet, View, Text } from "react-native";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useScalable from "@/hooks/useScalable";
import { sizes } from "@/constants/sizes";
import Border from "./Border";

function EmptyRow({ onCurrencyPress }: { onCurrencyPress: () => void }) {
    const { colors } = useThemeContext();
    const { scaleFont } = useScalable();
    return (<View style={[styles.container, { borderColor: colors.containerBg, opacity: 0.7 }]}>
        <CurrencyPickerTrigger onPress={onCurrencyPress}>
            <MaterialCommunityIcons
                name="currency-usd-off"
                size={scaleFont(sizes.fontSizeMedium)}
                color={colors.mainText}
            />
        </CurrencyPickerTrigger>

        <Border />

        <View style={styles.inputBox}>
            <Text style={{ fontSize: sizes.fontSizeMedium, color: colors.mainText }}>
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={sizes.fontSizeMedium}
                    color={colors.mainText}
                />
                Change currency
            </Text>
        </View>
    </View >);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: "4%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderStyle: "dashed",
        borderWidth: 3
    },

    inputBox: {
        flex: 1,
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: "3%",
    }
})

export default EmptyRow;