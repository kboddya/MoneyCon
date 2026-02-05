import { Text, View, StyleSheet, TextStyle, ViewStyle, ScrollView, Pressable } from 'react-native';
import { useContext } from "react";
import SegmentControlComponent from '@/components/SegmentControl';
import { ExchangeRateContext } from '@/context/ExchangeRateContext';
import { ThemeContext } from '@/context/ThemeContext';
import { Link, Stack } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CurrencyContext } from '@/context/CurrencyContext';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ApiKeySettings() {
    const {
        mode,
        modeToggle,
        headerTheme,
        isLightMode,
        theme,
        windowDimensions
    } = useContext(ThemeContext);

    const { historyDiapason, changeDiapasonHandler } = useContext(ExchangeRateContext);
    const { currencyCount, setCurrencyCount, currencyListLength } = useContext(CurrencyContext);

    const lesserCount = async (): Promise<void> => {
        if (currencyCount <= 2) return;
        setCurrencyCount(currencyCount - 1);
    }

    const moreCount = async (): Promise<void> => {
        setCurrencyCount(currencyCount + 1);
    }


    return (
        <SafeAreaView style={theme.flexContainerWithBG as ViewStyle} edges={["bottom"]}>
            <ScrollView>
                <Stack.Screen options={{
                    ...headerTheme,
                    headerTitleAlign: "center",
                    headerBackTitle: "Back",
                }} />

                <View style={theme.topBorder as ViewStyle} />

                <View style={styles.parameterContainer}>
                    <Text style={
                        [
                            theme.headerTextSize,
                            theme.mainTextColor,
                            styles.parameterHeader,
                        ] as TextStyle[]}
                        onPress={currencyCount !== 0 ? () => setCurrencyCount(4) : undefined}
                    >
                        Currency count {currencyCount !== 4 ?
                            <MaterialCommunityIcons
                                name="lock-reset"
                                size={(theme.headerTextSize as TextStyle).fontSize}
                                color={(theme.mainTextColor as TextStyle).color}
                            /> : undefined}
                    </Text>
                    <View style={[
                        styles.segmentControl,
                        {
                            flexDirection: "row",
                            padding: 3 * windowDimensions.fontScale,
                            height: 45 * windowDimensions.fontScale,
                            backgroundColor: isLightMode ? "#EEEEF0" : "#1C1C1F",
                        },
                    ]}>
                        <Pressable style={({ pressed }) =>
                            [{
                                flex: 2,
                                paddingHorizontal: "auto",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 17,
                                backgroundColor: pressed ? (isLightMode ? "#CCCCCC" : "#5C5C5C") : (isLightMode ? "#ABABAB" : "#4C4C4C"),
                                opacity: currencyCount <= 2 ? 0.7 : 1,
                            }]}
                            disabled={currencyCount <= 2}
                            onPress={lesserCount}
                        >
                            <Text style={[
                                theme.mainTextColor,
                                { fontWeight: "bold" },
                                theme.mediumTextSize,
                            ] as TextStyle[]}>
                                less
                            </Text>
                        </Pressable>
                        <Text style={[
                            theme.mainTextColor,
                            theme.mediumTextSize,
                            { flex: 1, textAlign: "center", alignSelf: "center" }
                        ] as TextStyle[]}>
                            {currencyCount}
                        </Text>
                        <Pressable style={({ pressed }) =>
                            [{
                                flex: 2,
                                paddingHorizontal: "auto",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 17,
                                backgroundColor: pressed ? (isLightMode ? "#CCCCCC" : "#5C5C5C") : (isLightMode ? "#ABABAB" : "#4C4C4C"),
                                opacity: currencyCount >= currencyListLength ? 0.7 : 1,
                            }]}
                            disabled={currencyCount >= currencyListLength}
                            onPress={moreCount}
                        >
                            <Text style={[
                                theme.mainTextColor,
                                { fontWeight: "bold" },
                                theme.mediumTextSize,
                            ] as TextStyle[]}>
                                more
                            </Text>
                        </Pressable>

                    </View>
                </View>

                <View style={styles.parameterContainer}>
                    <Text style={
                        [
                            theme.headerTextSize,
                            theme.mainTextColor,
                            styles.parameterHeader,
                        ] as TextStyle[]}
                        onPress={historyDiapason !== 0 ? () => changeDiapasonHandler("0") : undefined}
                    >
                        Exchange history interval {historyDiapason !== 0 ?
                            <MaterialCommunityIcons
                                name="lock-reset"
                                size={(theme.headerTextSize as TextStyle).fontSize}
                                color={(theme.mainTextColor as TextStyle).color}
                            /> : undefined}
                    </Text>

                    <SegmentControlComponent
                        key={"history-diapason-control"}
                        values={["1 day", "7 days", "30 days"]}
                        selectedIndex={historyDiapason === 1 ? 0 : historyDiapason === 7 ? 1 : historyDiapason === 30 ? 2 : -1}
                        style={styles.segmentControl}
                        onChange={event => changeDiapasonHandler(event.nativeEvent.value)}
                    />

                </View>

                <View style={styles.parameterContainer}>
                    <Text style={
                        [
                            theme.headerTextSize,
                            theme.mainTextColor,
                            styles.parameterHeader,
                        ] as TextStyle[]}>
                        Appearance mode
                    </Text>

                    <SegmentControlComponent
                        key={"appearance-mode-control"}
                        values={["Light", "System", "Dark"]}
                        selectedIndex={mode === null ? 1 : mode === "light" ? 0 : 2}
                        style={styles.segmentControl}
                        onChange={event => {
                            const selectedIndex = event.nativeEvent.selectedSegmentIndex;
                            modeToggle && modeToggle(selectedIndex);
                        }}
                    />
                </View>
            </ScrollView >
            <Link style={[
                theme.smallTextSize,
                theme.mainTextColor,
                { textAlign: "center" }
            ] as TextStyle[]}
                href="https://github.com/kboddya/MoneyCon"
            >
                Made with 🫶 by kboddya
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    parameterContainer: {
        marginHorizontal: "10%",
        marginVertical: "3%"
    },

    parameterHeader: { fontWeight: "semibold", paddingLeft: "4%" },

    segmentControl: {
        width: "100%",
        marginTop: 5,
        borderRadius: 20,
        alignSelf: "center",
    }
});