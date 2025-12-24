import { Link, router, Stack } from 'expo-router';
import { Text, View, StyleSheet, TextInput, Alert, useColorScheme, useWindowDimensions, Pressable } from 'react-native';
import { getApiKey, setHistoryDiapason, getHistoryDiapason } from "@/services/cacheService";
import React, { useContext, useState } from "react";
import { errorDescription } from "@/services/helper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import ToastProvider, { Toast } from "toastify-react-native";
import { ApiService } from '@/services/ApiService';
import { ExchangeRateContext } from '@/context/ExchangeRateContext';
import { NetworkContext } from '@/context/NetworkContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function ApiKeySettings() {
    const theme = useColorScheme();

    const { isConnected, isChanged, isInternetReachable } = useContext(NetworkContext);

    const { fontScale } = useWindowDimensions();

    const { updateExchangeRate, updateHistoryExchangeRate } = useContext(ExchangeRateContext);

    const [apiKey, setApiKeyState] = useState("");
    getApiKey().then(setApiKeyState)

    const [history, setHistory] = useState(0);
    getHistoryDiapason().then(data => data !== 0 ? setHistory(data.history) : setHistory(0));

    const changeDiapasonHandler = (diapason: string) => {
        const diapasonInNumber = Number.parseInt(diapason.split(" ")[0]);
        if (history === diapasonInNumber) return;
        setHistory(diapasonInNumber);
        setHistoryDiapason(diapasonInNumber).then(result => {
            if (isChanged && (!isConnected || !isInternetReachable)) {
                Toast.show({
                    text1: "Exchange rates will be updated when you have internet connection",
                    type: "warn",
                    position: "bottom"
                });
                return;
            }
            if (!result) {
                setHistory(0);
                Alert.alert("Error saving history diapason. Please try again.");
            }
            updateHistoryExchangeRate();
        });
    }

    const [value, setValue] = useState("");

    const styles = theme === 'light' ? stylesLight : stylesDark;
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: theme === 'light' ? "white" : 'black',
            }}>

            <Stack.Screen options={{
                headerRight: () =>
                    <Pressable style={{ padding: 4 * fontScale, justifyContent: "center", alignItems: "center" }} onPress={() => {
                        updateExchangeRate();
                    }}>
                        <MaterialCommunityIcons name="refresh" size={2 * fontScale * 14} color={theme === 'light' ? "#4C4C4C" : "#ABABAB"} />
                    </Pressable>,
            }} />

            <View style={theme === "light" ? {
                width: "100%",
                height: 0.2,
                backgroundColor: "#4C4C4C",
                opacity: 0.5
            } : {
                width: "100%",
                backgroundColor: "#ABABAB",
                height: 0.2,
                opacity: 0.5
            }} />
            <Text style={theme === "light" ? {
                marginTop: 15,
                fontSize: 19,
                fontWeight: "semibold",
                color: "#4C4C4C"
            } : {
                marginTop: 15,
                fontSize: 19,
                fontWeight: "semibold",
                color: "#ABABAB"
            }}>Exchange history
                interval</Text>

            <SegmentedControl
                values={["1 day", "7 days", "30 days"]}
                selectedIndex={history === 1 ? 0 : history === 7 ? 1 : history === 30 ? 2 : -1}
                style={styles.historyContainer}
                fontStyle={styles.historyValue}
                tintColor={theme === 'light' ? "#ABABAB" : "#4C4C4C"}
                // backgroundColor={theme === 'light' ? "#EFEFEF" : "#272525"}
                activeFontStyle={styles.historyValue}
                sliderStyle={{ borderRadius: 20 }}
                tabIndex={-1}
                onChange={event => changeDiapasonHandler(event.nativeEvent.value)}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={theme === "light" ? {
                        paddingLeft: 10,
                        fontSize: 18,
                        justifyContent: "center",
                        color: "#4C4C4C"
                    } : { paddingLeft: 10, fontSize: 18, justifyContent: "center", color: "#ABABAB" }}
                    placeholder={apiKey === "" ? "Enter your API key" : apiKey}
                    keyboardType="default"
                    autoCorrect={false}
                    scrollEnabled={false}
                    editable={isChanged && !(!isConnected || !isInternetReachable)}
                    onTouchEnd={() => {
                        if (isChanged && (!isConnected || !isInternetReachable)) {
                            Toast.show({
                                text1: "No internet connection",
                                type: "error",
                                position: "bottom"
                            });
                        }
                    }}
                    onSubmitEditing={e => {
                        Toast.show({
                            text1: "Saving API key...",
                            text2: "We'll verify your key and save it",
                            type: "info",
                            visibilityTime: 4000,
                            useModal: true
                        })
                        ApiService.UpdateApiKey(e.nativeEvent.text)
                            .then(result => {
                                Toast.hide();
                                if (!result.ok) {
                                    Alert.alert("Error", errorDescription(!result.error ? "" : result.error), [
                                        {
                                            text: "Try again",
                                            onPress: () => setValue("")
                                        }
                                    ]);
                                } else {
                                    Alert.alert("Success", "API key was saved success",
                                        [
                                            {
                                                text: "Close",
                                                onPress: () => setValue("")
                                            },
                                            {
                                                text: "Go Home",
                                                onPress: () => router.replace("/")
                                            }
                                        ])
                                }
                            })
                    }
                    }
                />
            </View>

            <Text style={theme === "light" ? { marginTop: "2%", color: "#4C4C4C" } : {
                marginTop: "2%",
                color: "#ABABAB"
            }}>
                You can get your API key from <Link href={"https://exchangeratesapi.io/"}
                    style={theme === "light" ? { color: "blue" } : { color: "#6599ff" }}>exchangerates</Link>
            </Text>
            <ToastProvider
                showCloseIcon={false}
                position="bottom"
                theme={theme === "light" ? "light" : "dark"}
            />
        </View>
    );
}

const stylesLight = StyleSheet.create({
    inputContainer: {
        marginTop: 17,
        height: "5.9%",
        width: "80%",
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        justifyContent: "center"
    },

    historyContainer: {
        width: "80%",
        height: "5.8%",
        marginTop: 5,
        backgroundColor: "#EFEFEF",
        borderRadius: 20,
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    historyValue: {
        fontSize: 18,
        color: "#4C4C4C",
    },

    text: {
        color: "#4C4C4C",
    }
});

const stylesDark = StyleSheet.create({
    inputContainer: {
        marginTop: 17,
        height: "5.9%",
        width: "80%",
        backgroundColor: "#272525",
        borderRadius: 10,
        justifyContent: "center"
    },

    historyContainer: {
        width: "80%",
        height: "5.8%",
        backgroundColor: "#272525",
        borderRadius: 20,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    historyValue: {
        fontSize: 18,
        color: "#ABABAB",
    },

    text: {
        color: "#ABABAB",
    }
});