import {Link, Redirect, router, Stack} from 'expo-router';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {setApiKey, getApiKey} from "@/app/sevices/cacheService";
import React, {useEffect, useState} from "react";
import {errorDescription} from "@/app/sevices/helper";

export default function ApiKeySettings() {

    const [apiKey, setApiKeyState] = useState("");

    useEffect(() => {
        getApiKey().then(setApiKeyState);
    }, []);

    const [inputValue, setInputValue] = useState('');

    const clearInput = () => {
        setInputValue("");
    }
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={inputValue}
                    onChangeText={setInputValue}
                    style={{paddingLeft: 10, fontSize: 18}}
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
                                } else if (typeof result === "object") {
                                    Alert.alert("Error", errorDescription(result.toString()), [
                                        {
                                            text: "Try again",
                                            onPress: () => clearInput()
                                        }
                                    ]);
                                } else {
                                    Alert.alert("API key saved successfully!", "" , [
                                        {
                                            text: "Home",
                                            onPress: () => router.replace("/pages")
                                        }
                                    ]);
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
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 31,
        height: 50,
        width: 330,
        backgroundColor: "#EFEFEF",
        borderRadius: 10
    }
});