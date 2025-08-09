import {Link, router} from 'expo-router';
import {Text, View, StyleSheet, TextInput, Alert, useColorScheme} from 'react-native';
import {setApiKey, getApiKey, setHistoryDiapason, getHistoryDiapason} from "@/app/services/cacheService";
import React, {useState} from "react";
import {errorDescription} from "@/app/services/helper";

export default function ApiKeySettings() {

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
            <View style={styles.historyContainer}>
                <View style={history === 1 ? styles.historyActiveLeft : styles.historyInactive} onTouchEnd={() => {
                    if (history === 1) return;
                    setHistory(1);
                    setHistoryDiapason(1).then(result => {
                        if (!result) {
                            setHistory(0)
                            Alert.alert("Error saving history diapason. Please try again.");
                        }
                    });
                }}>
                    <Text style={styles.historyValue}>1 day</Text>
                </View>
                <View style={history === 7 ? styles.historyActiveCenter : styles.historyInactive} onTouchEnd={() => {
                    if (history === 7) return;
                    setHistory(7);
                    setHistoryDiapason(7).then(result => {
                        if (!result) {
                            setHistory(0)
                            Alert.alert("Error saving history diapason. Please try again.");
                        }
                    });
                }}>
                    <Text style={styles.historyValue}>7 days</Text>
                </View>
                <View style={history === 30 ? styles.historyActiveRight : styles.historyInactiveLast}
                      onTouchEnd={() => {
                          if (history === 30) return;
                          setHistory(30);
                          setHistoryDiapason(30).then(result => {
                              if (!result) {
                                  setHistory(0)
                                  Alert.alert("Error saving history diapason. Please try again.");
                              }
                          });
                      }}>
                    <Text style={styles.historyValue}>30 days</Text>
                </View>
            </View>
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
        borderWidth: 2,
        borderColor: "#EFEFEF",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveCenter: {
        width: "33.333333333%",
        height: "100%",
        borderWidth: 3,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveLeft: {
        width: "33.333333333%",
        height: "100%",
        borderWidth: 3,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveRight: {
        width: "33.333333333%",
        height: "100%",
        borderWidth: 3,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactive: {
        width: "33.333333333%",
        height: "100%",
        borderRightWidth: 2,
        paddingLeft: 2,
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactiveLast: {
        width: "33.333333333%",
        height: "100%",
        borderColor: "#EFEFEF",
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
        borderWidth: 2,
        borderColor: "#272525",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveCenter: {
        width: "33.333333333%",
        height: "101%",
        borderWidth: 3,
        backgroundColor: "#272525",
        borderColor: "#272525",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveLeft: {
        width: "33.333333333%",
        height: "101%",
        borderWidth: 3,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: "#272525",
        borderColor: "#272525",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveRight: {
        width: "33.333333333%",
        height: "101%",
        borderWidth: 3,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "#272525",
        borderColor: "#272525",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactive: {
        width: "33.333333333%",
        height: "100%",
        borderRightWidth: 2,
        paddingLeft: 2,
        borderColor: "#272525",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactiveLast: {
        width: "33.333333333%",
        height: "100%",
        borderColor: "#272525",
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