import {Link, Stack} from 'expo-router';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {setApiKey, getApiKey} from "@/app/sevices/cacheService";
import React, {useEffect, useState} from "react";

export default function ApiKeySettings() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{paddingLeft: 10, fontSize: 18}}
                    placeholder={"Enter your API key here"}
                    keyboardType="default"
                    onSubmitEditing={e => {
                        if (!setApiKey(e.nativeEvent.text)) {
                            alert("Invalid API key. Please try again.");
                        }
                    }}
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