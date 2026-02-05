import { View, Pressable, Text, TextInput, StyleSheet, useColorScheme, ViewStyle, TextStyle } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { memo, PropsWithChildren, useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import useKeyboard from "@/hooks/useKeyboard";

type CurrencyInputRowProps = {
    currencyCode: string | null | undefined;
    data: string;
    onCurrencyPress: () => void;
    onTextChange: (text: string) => Promise<void>;
    onSubmitEditing: () => Promise<void>;
    onFocus: () => void;
    isFocused: boolean;
}

const CurrencyPicker = memo(({ children, onPress }: PropsWithChildren<{ onPress: () => void }>) => (
    <View style={styles.currencyPicker}>
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.currencyHitBox,
                pressed ? { opacity: 0.6 } : { opacity: 1 }
            ]}
        >
            {children}
        </Pressable>
    </View>
))

const CurrencyInputRow = memo((prop: CurrencyInputRowProps) => {
    const { theme, windowDimensions } = useContext(ThemeContext);

    if (!prop.currencyCode || prop.currencyCode === "?") return (
        <View style={[
            styles.container,
            {
                maxHeight: 50 * windowDimensions.fontScale,
                maxWidth: 330 * windowDimensions.fontScale,
            },
            theme.containerBG as ViewStyle,
        ]}>
            <CurrencyPicker onPress={prop.onCurrencyPress}>
                <MaterialCommunityIcons
                    name="currency-usd-off"
                    size={24}
                    color={(theme.mainTextColor as TextStyle).color}
                />
            </CurrencyPicker>

            <View style={[
                styles.border,
                theme.borderColor as ViewStyle
            ]} />

            <View style={styles.inputBox}>
                <Text style={[
                    theme.mainTextColor as TextStyle,
                ]}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={(theme.smallTextSize as TextStyle).fontSize}
                        color={(theme.mainTextColor as TextStyle).color}
                    />
                    Change currency
                </Text>
            </View>
        </View>
    )

    return (
        <View style={[
            styles.container,
            {
                maxHeight: 50 * windowDimensions.fontScale,
                maxWidth: 330 * windowDimensions.fontScale,
            },
            prop.isFocused ? {
                height: "10%",
                width: "83%",
            } : undefined,
            theme.containerBG as ViewStyle,
        ]}>
            <CurrencyPicker onPress={prop.onCurrencyPress}>
                <Text
                    style={[
                        theme.mainTextColor as TextStyle,
                        theme.mediumTextSize as TextStyle
                    ]}
                >{prop.currencyCode}</Text>
            </CurrencyPicker>

            <View style={[
                styles.border,
                theme.borderColor as ViewStyle
            ]} />

            <TextInput
                style={[
                    styles.inputBox,
                    theme.mediumTextSize as TextStyle,
                    theme.mainTextColor as TextStyle
                ]}
                keyboardType="numeric"
                placeholder={"Enter amount"}
                value={prop.data !== "NaN" ? prop.data : ""}
                onFocus={prop.onFocus}
                onChangeText={prop.onTextChange}
                onEndEditing={prop.onSubmitEditing}
            />

        </View >
    )
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: "4%",
        width: "80%",
        borderRadius: 10,
        height: "7%",
        alignItems: "center",
        justifyContent: "center",
    },

    currencyHitBox: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    currencyPicker: {
        width: "18%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    border: {
        width: 1,
        height: "70%"
    },

    inputBox: {
        width: "82%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: "3%",
    }
});


export default CurrencyInputRow;