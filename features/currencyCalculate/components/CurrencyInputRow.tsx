import { Text, TextInput, StyleSheet, Animated, useAnimatedValue, FocusEvent } from "react-native";
import { memo, useEffect } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";
import { sizes } from "@/constants/sizes";
import Border from "./Border";

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

    useEffect(() => {
        Animated.timing(scaleAnimation, {
            toValue: isFocused ? 1.04 : 1,
            useNativeDriver: true,
            duration: 75
        }).start()
    }, [isFocused]);

    return (
        <Animated.View style={[
            styles.container,
            {
                transform: [{ scale: scaleAnimation }],
                backgroundColor: colors.containerBg,
                shadowColor: colors.headerTint,
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 5,
                shadowOpacity: 0.25
            },
        ]}
        >
            <CurrencyPickerTrigger onPress={props.onCurrencyPress}>
                <Text
                    style={{
                        fontSize: sizes.fontSizeMedium,
                        color: colors.mainText
                    }}
                >{props.currencyCode?.toUpperCase()}</Text>
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