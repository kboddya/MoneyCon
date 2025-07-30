import {Link, router} from 'expo-router';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {setApiKey, getApiKey, setHistoryDiapason, getHistoryDiapason} from "@/app/sevices/cacheService";
import React, {useState} from "react";
import {errorDescription} from "@/app/sevices/helper";
import ToastManager from "toastify-react-native/components/ToastManager";

export default function ApiKeySettings() {

    const [apiKey, setApiKeyState] = useState("");
    getApiKey().then(setApiKeyState)

    const [history, setHistory] = useState(0);
    getHistoryDiapason().then(data => data !== 0 ? setHistory(data.history) : setHistory(0));

    const [value, setValue] = useState("");

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}>
            <Text style={{marginTop: 15, fontSize: 19, fontWeight: "semibold"}}>Exchange history interval</Text>
            <View style={styles.historyContainer}>
                <View style={history === 1 ? styles.historyActiveLeft : styles.historyInactive} onTouchEnd={event => {
                    if (history === 1) return;
                    setHistory(1);
                    setHistoryDiapason(1).then(result => {
                        if (!result) {
                            setHistory(0)
                            Alert.alert("Error saving history diapason. Please try again.");
                        }
                    });
                }}>
                    <Text style={{fontSize: 18}}>1 day</Text>
                </View>
                <View style={history === 7 ? styles.historyActiveCenter : styles.historyInactive} onTouchEnd={event => {
                    if (history === 7) return;
                    setHistory(7);
                    setHistoryDiapason(7).then(result => {
                        if (!result) {
                            setHistory(0)
                            Alert.alert("Error saving history diapason. Please try again.");
                        }
                    });
                }}>
                    <Text style={{fontSize: 18}}>7 days</Text>
                </View>
                <View style={history === 30 ? styles.historyActiveRight : styles.historyInactiveLast}
                      onTouchEnd={event => {
                          if (history === 30) return;
                          setHistory(30);
                          setHistoryDiapason(30).then(result => {
                              if (!result) {
                                  setHistory(0)
                                  Alert.alert("Error saving history diapason. Please try again.");
                              }
                          });
                      }}>
                    <Text style={{fontSize: 18}}>30 days</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    style={{paddingLeft: 10, fontSize: 18, justifyContent: "center"}}
                    placeholder={apiKey === "" ? "Enter your API key" : apiKey}
                    keyboardType="default"
                    onSubmitEditing={e => {
                        setApiKey(e.nativeEvent.text)
                            .then(result => {
                                console.log(result);
                                if (result === false) {
                                    Alert.alert("Invalid API key. Please try again.");
                                } else if (result === "Error: HTTP error status: 401") {
                                    Alert.alert(result);
                                } else if (typeof result === "string") {
                                    Alert.alert("Error", errorDescription(result), [
                                        {
                                            text: "Try again",
                                            onPress: () => setValue("")
                                        }
                                    ]);
                                } else {
                                    setValue("");
                                    Alert.alert("Success", "API key was saved success" , [{
                                        text: "Close"
                                    },{
                                        text: "Go Home",
                                        onPress: () => router.replace("/")
                                    }])
                                }
                            })
                    }
                    }
                />
            </View>

            <Text style={{marginTop: 10, color: "#4C4C4C"}}>
                You can get your API key from <Link href={"https://exchangeratesapi.io/"}
                                                    style={{color: "blue"}}>exchangerates</Link>
            </Text>
            <ToastManager/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 17,
        height: 50,
        width: 330,
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        justifyContent: "center"
    },

    historyContainer: {
        width: 330,
        height: 48,
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
        width: 330 / 3,
        height: 48,
        borderWidth: 3,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveLeft: {
        width: 330 / 3,
        height: 48,
        borderWidth: 3,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyActiveRight: {
        width: 330 / 3,
        height: 48,
        borderWidth: 3,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#EFEFEF",
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactive: {
        width: 330 / 3,
        height: 48,
        borderRightWidth: 2,
        paddingLeft: 2,
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

    historyInactiveLast: {
        width: 330 / 3,
        height: 48,
        borderColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
    },

});