import { PixelRatio, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { ExchangeRateContext } from "@/context/ExchangeRateContext";
import CurrencyInputRow from "@/components/CurrencyInputRow";
import ExchangeRateTable from "@/components/ExchangeRateTable";
import { ThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useCurrencyCalc from "@/hooks/useCurrencyCalc";
import useExchangeRateTable from "@/hooks/useExchangeRateTable";


export default function Index() {
    const {
        windowDimensions,
        theme,
        isLightMode,
        headerTheme
    } = useContext(ThemeContext)

    const {
        exchangeRateUpdateTimestamp,
        currentCurrencyCodes,
        updateExchangeRate,
        updating,
        historyDiapason
    } = useContext(ExchangeRateContext);

    const [
        data,
        focusedBox,
        onFocusHandler,
        onTextChangeHandler,
        onSubmitEditingHandler
    ] = useCurrencyCalc();

    const table = useExchangeRateTable();

    const [updatedMessage, setUpdatedMessage] = useState("never");

    useEffect(() => {
        setUpdatedMessage(exchangeRateUpdateTimestamp ? ((Date.now() - Date.parse(exchangeRateUpdateTimestamp)) / (1000 * 60 * 60)).toFixed(0) + " hours ago" : "never");
        const intervalId = setInterval(() => {
            setUpdatedMessage(exchangeRateUpdateTimestamp ? ((Date.now() - Date.parse(exchangeRateUpdateTimestamp)) / (1000 * 60 * 60)).toFixed(0) + " hours ago" : "never");
        }, 60000)

        return () => clearInterval(intervalId);
    }, [exchangeRateUpdateTimestamp])


    return (
        <View style={theme.flexContainerWithBG as ViewStyle}>

            <Stack.Screen options={{
                ...headerTheme,
                title: "MoneyCon",
                headerRight: () => (
                    <Pressable onResponderEnd={() => router.push("/(screens)/Settings")} style={{ padding: 4 * windowDimensions.fontScale, justifyContent: "center", alignItems: "center" }}>
                        <MaterialCommunityIcons name="dots-horizontal" size={PixelRatio.roundToNearestPixel(28 * windowDimensions.fontScale)} color={isLightMode ? "#4C4C4C" : "#ABABAB"} />
                    </Pressable>)
                ,
                headerTitleAlign: "center",
            }} />

            <View style={theme.topBorder as ViewStyle} />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                keyboardDismissMode={"on-drag"}
                refreshControl={< RefreshControl refreshing={updating} onRefresh={() => updateExchangeRate()} />}
            >
                <Text
                    style={[
                        styles.updated,
                        isLightMode ? styles.updatedLight : styles.updatedDark,
                        theme.smallTextSize as TextStyle
                    ]}>Updated: {updatedMessage} </Text>


                {currentCurrencyCodes.map((value, index) => (
                    <CurrencyInputRow
                        key={index}
                        currencyCode={value}
                        data={data[index]}
                        onCurrencyPress={() => router.navigate(`/(screens)/CurrencyPicker/${index}`)}
                        onTextChange={text => onTextChangeHandler(text)}
                        onFocus={() => onFocusHandler(index)}
                        onSubmitEditing={onSubmitEditingHandler}
                        isFocused={focusedBox === index}
                    />
                ))}

                {historyDiapason !== 0 && <ExchangeRateTable table={table} mainCurrencyCode={currentCurrencyCodes[0]} />}
            </ScrollView>
            <SafeAreaView edges={["bottom"]} />
        </View >
    );
}

const styles = StyleSheet.create({
    updated: {
        marginTop: "2%",
        marginBottom: "2%",
    },

    updatedLight: {
        color: "#A4A4A4",
    },

    updatedDark: {
        color: "#ACACAC",
    }
});