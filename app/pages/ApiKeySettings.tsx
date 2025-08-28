import {Link, router} from 'expo-router';
import {Text, View, StyleSheet, TextInput, Alert, useColorScheme} from 'react-native';
import {setApiKey, getApiKey, setHistoryDiapason, getHistoryDiapason} from "@/app/services/cacheService";
import React, {useState} from "react";
import {errorDescription} from "@/app/services/helper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Toast from "react-native-simple-toast";
import * as Network from "expo-network";

export default function ApiKeySettings() {
    const [networkStatus, setNetworkStatus] = useState({
        type: Network.NetworkStateType.UNKNOWN,
        isConnected: false,
        isInternetReachable: false
    });

    Network.getNetworkStateAsync().then(state => {
        setNetworkStatus({
            type: state.type ?? Network.NetworkStateType.UNKNOWN,
            isConnected: state.isConnected ?? false,
            isInternetReachable: state.isInternetReachable ?? false
        });
    });


    const [apiKey, setApiKeyState] = useState("");
    getApiKey().then(setApiKeyState)

    const [history, setHistory] = useState(0);
    getHistoryDiapason().then(data => data !== 0 ? setHistory(data.history) : setHistory(0));

    const [value, setValue] = useState("");

    const colorScheme = useColorScheme();

    const styles = colorScheme === 'light' ? stylesLight : stylesDark;
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
            <Text style={colorScheme === "light" ? {
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
                                if (!networkStatus.isConnected || networkStatus.isInternetReachable === null) {
                                    Toast.show("Exchange rates will be updated when you have internet connection", Toast.LONG);
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
                                if (!networkStatus.isConnected || networkStatus.isInternetReachable === null) {
                                    Toast.show("Exchange rates will be updated when you have internet connection", Toast.LONG);
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
                                if (!networkStatus.isConnected || networkStatus.isInternetReachable === null) {
                                    Toast.show("Exchange rates will be updated when you have internet connection", Toast.LONG);
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
                    editable={false}
                    onSubmitEditing={e => {
                        setApiKey(e.nativeEvent.text)
                            .then(result => {
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
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#EFEFEF",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
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
        backgroundColor: "#000000",
        borderWidth: 1,
        borderColor: "#272525",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
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