import {Link, router} from 'expo-router';
import {Text, View, StyleSheet, TextInput, Alert, useColorScheme} from 'react-native';
import {
    setApiKey,
    getApiKey,
    setHistoryDiapason,
    getHistoryDiapason,
    getExchangeRatesProvider, setExchangeRatesProvider
} from "@/app/services/cacheService";
import React, {useState} from "react";
import {errorDescription} from "@/app/services/helper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import ToastProvider, {Toast} from "toastify-react-native";
import * as Network from "expo-network";
import {stylesLight, stylesDark} from "@/assets/styles/ApiKeySettings";

export default function ApiKeySettings() {
    const [networkStatus, setNetworkStatus] = useState({
        type: Network.NetworkStateType.UNKNOWN,
        isConnected: false,
        isInternetReachable: false,
        isChanged: false
    });

    Network.getNetworkStateAsync().then(state => {
        setNetworkStatus({
            type: state.type ?? Network.NetworkStateType.UNKNOWN,
            isConnected: state.isConnected ?? false,
            isInternetReachable: state.isInternetReachable ?? false,
            isChanged: true
        });
    });


    const [apiKey, setApiKeyState] = useState("");
    getApiKey().then(setApiKeyState)

    const [history, setHistory] = useState(0);
    getHistoryDiapason().then(data => data !== 0 ? setHistory(data.history) : setHistory(0));

    const [value, setValue] = useState("");

    const [provider, setProvider] = useState(-1);

    getExchangeRatesProvider().then(res => setProvider(res));

    const colorScheme = useColorScheme();

    const styles = colorScheme === 'light' ? stylesLight : stylesDark;

    const renderApiKeyInput = () => {
        return (
            <>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={value}
                        onChangeText={setValue}
                        style={colorScheme === "light" ? {
                            paddingLeft: 10,
                            fontSize: 18,
                            justifyContent: "center",
                            color: "#4C4C4C"
                        } : {paddingLeft: 10, fontSize: 18, justifyContent: "center", color: "#ABABAB"}}
                        placeholder={apiKey === "" ? "Enter your API key" : apiKey}
                        keyboardType="default"
                        autoCorrect={false}
                        scrollEnabled={false}
                        editable={networkStatus.isChanged && !(!networkStatus.isConnected || !networkStatus.isInternetReachable)}
                        onTouchEnd={() => {
                            if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
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
                            setApiKey(e.nativeEvent.text)
                                .then(result => {
                                    Toast.hide();
                                    if ((typeof result === "object" && !result.success) || result === false) {
                                        Alert.alert("Error", errorDescription(!result ? "" : result.error), [
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

                <Text style={colorScheme === "light" ? {marginTop: "2%", color: "#4C4C4C"} : {
                    marginTop: "2%",
                    color: "#ABABAB"
                }}>
                    You can get your API key from <Link href={"https://exchangeratesapi.io/"}
                                                        style={colorScheme === "light" ? {color: "blue"} : {color: "#6599ff"}}>exchangerates</Link>
                </Text>
            </>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: colorScheme === 'light' ? "white" : 'black',
            }}>

            <View style={colorScheme === "light" ? {
                width: "100%",
                height: 0.2,
                backgroundColor: "#4C4C4C",
                opacity: 0.5
            } : {
                width: "100%",
                backgroundColor: "#ABABAB",
                height: 0.2,
                opacity: 0.5
            }}/>
            <Text style={styles.headerText}>Exchange rates provider</Text>
            <SegmentedControl
                values={["fawazahmed0", "exchangeratesapi"]}
                selectedIndex={provider}
                style={styles.historyContainer}
                fontStyle={styles.historyValue}
                backgroundColor={colorScheme === "light" ? "#ffffff" : "#000000"}
                tintColor={colorScheme === "light" ? "#EFEFEF" : "#272525"}
                activeFontStyle={styles.historyValue}
                sliderStyle={{borderRadius: 10}}
                tabIndex={-1}
                onChange={event => setExchangeRatesProvider(event.nativeEvent.selectedSegmentIndex)}
            />

            <Text style={styles.headerText}>Exchange history
                interval</Text>

            <SegmentedControl
                values={["1 day", "7 days", "30 days"]}
                selectedIndex={history === 1 ? 0 : history === 7 ? 1 : history === 30 ? 2 : -1}
                style={styles.historyContainer}
                fontStyle={styles.historyValue}
                backgroundColor={colorScheme === "light" ? "#ffffff" : "#000000"}
                tintColor={colorScheme === "light" ? "#EFEFEF" : "#272525"}
                activeFontStyle={styles.historyValue}
                sliderStyle={{borderRadius: 10}}
                tabIndex={-1}
                onChange={event => {
                    switch (event.nativeEvent.selectedSegmentIndex) {
                        case 0: {
                            if (history === 1) return;
                            setHistory(1);
                            setHistoryDiapason(1).then(result => {
                                if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
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
                            });
                            break;
                        }
                        case 1: {
                            if (history === 7) return;
                            setHistory(7);
                            setHistoryDiapason(7).then(result => {
                                if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
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
                            });
                            break;
                        }
                        case 2: {
                            if (history === 30) return;
                            setHistory(30);
                            setHistoryDiapason(30).then(result => {
                                if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
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
                            });
                            break;
                        }
                        default: {
                            Alert.alert("Error", "Unknown history interval selected");
                        }
                    }
                }}
            />

            {provider === 1 ? renderApiKeyInput(): null}

            <ToastProvider
                showCloseIcon={false}
                position="bottom"
                theme={colorScheme === "light" ? "light" : "dark"}
            />
        </View>
    );
}