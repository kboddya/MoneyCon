import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, Animated, useAnimatedValue, FocusEvent } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { memo, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";
import { sizes } from "@/constants/sizes";
import Border from "./Border";
import useScalable from "@/hooks/useScalable";

type CurrencyInputRowProps = {
    currencyCode: string | null | undefined;
    data: string;
    onCurrencyPress: () => void;
    onTextChange: (text: string) => Promise<void>;
    onSubmitEditing: () => Promise<void>;
    onFocus: (e: FocusEvent) => void;
    isFocused: boolean;
}

const CurrencyInputRow = memo(({ isFocused, onFocus, ...props }: CurrencyInputRowProps) => {
    const { colors } = useThemeContext();

    const scaleAnimation = useAnimatedValue(1);

    const { scaleFont } = useScalable()

    useEffect(() => {
        Animated.timing(scaleAnimation, {
            toValue: isFocused ? 1.04 : 1,
            useNativeDriver: true,
            duration: 75
        }).start()
    }, [isFocused]);

    if (!props.currencyCode || props.currencyCode === "?") return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.containerBg
            },
        ]}>
            <CurrencyPickerTrigger onPress={props.onCurrencyPress}>
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
        </View>
    )

    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [{ scale: scaleAnimation }],
                backgroundColor: colors.containerBg
            },
        ]}
        >
            <CurrencyPickerTrigger onPress={props.onCurrencyPress}>
                <Text
                    style={{
                        fontSize: sizes.fontSizeMedium,
                        color: colors.mainText
                    }}
                >{props.currencyCode}</Text>
            </CurrencyPickerTrigger>

            <Border />

            <TextInput
                style={[
                    styles.inputBox,
                    {
                        fontSize: sizes.fontSizeMedium,
                        color: colors.mainText
                    },
                ]}
                keyboardType="numeric"
                placeholder={"Enter amount"}
                value={props.data !== "NaN" ? props.data : ""}
                onFocus={onFocus}
                onChangeText={props.onTextChange}
                onEndEditing={props.onSubmitEditing}
            />

        </Animated.View >
    )
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: "4%",
        width: "80%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
    },

    inputBox: {
        flex: 1,
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: "3%",
    }
});

export default CurrencyInputRow;