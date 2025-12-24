import { FlatList, View, Text, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import ToastProvider, { Toast } from "toastify-react-native"
import { useContext } from "react";
import { ExchangeRateContext } from "@/context/ExchangeRateContext";

const currencies = require("../../assets/currencies.json");

export default function ValPicker() {

    const { ID } = useLocalSearchParams();

    const { updateCurrencyValue } = useContext(ExchangeRateContext);

    const colorScheme = useColorScheme();

    const styles = colorScheme === "light" ? stylesLight : stylesDark
    // @ts-ignore
    const renderItems = useCallback(({ item }) => (
        <Pressable onPress={() => {
            updateCurrencyValue(item.code, Number.parseInt(ID.toString()));
        }}>
            <View style={styles.item}>
                <View style={styles.fullNamePart}>
                    <Text style={styles.itemText}>{item.fullName}</Text>
                </View>
                <View style={styles.codePart}>
                    <Text style={styles.itemText}>{item.code}</Text>
                </View>
            </View>
        </Pressable>
    ), []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colorScheme === "light" ? "white" : "black",
            }}
        >
            <View
                style={colorScheme === "light" ? {
                    width: "100%",
                    height: 0.2,
                    backgroundColor: "#4C4C4C",
                    opacity: 0.5,
                    alignItems: "center"
                } : {
                    width: "100%",
                    backgroundColor: "#ABABAB",
                    height: 0.2,
                    opacity: 0.5,
                    alignItems: "center"
                }}
            />

            <FlatList
                data={currencies}
                keyExtractor={(item) => item.code}
                ListFooterComponent={() => (
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.itemText}>Select a value to change it</Text>
                    </View>
                )}
                renderItem={renderItems}
                style={{ marginBottom: 12, width: "95%" }}
            />
            <ToastProvider
                position="bottom"
            />
        </View>
    );
}

const stylesLight = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
        width: "100%",
    },
    fullNamePart: {
        marginLeft: 10,
        width: "82%",
    },
    codePart: {
        width: "18%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#4C4C4C"
    },
});

const stylesDark = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ABABAB',
        flexDirection: 'row',
        width: "100%",
    },
    fullNamePart: {
        marginLeft: 10,
        width: "82%",
    },
    codePart: {
        width: "18%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#ABABAB"
    },
});