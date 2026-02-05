import { View, useColorScheme } from 'react-native';
import { useLocalSearchParams, Stack } from "expo-router";
import React, { useState } from "react";
import { useContext } from "react";
import { CurrencyContext } from '@/context/CurrencyContext';
import CurrencyList from '@/components/CurrencyList';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

export default function ValPicker() {

    const { ID } = useLocalSearchParams<{ ID: string }>();

    const { headerTheme, isLightMode } = useContext(ThemeContext);

    const { currencyList, updateCurrencyValue, searchCurrencyHandler } = useContext(CurrencyContext);
    const colorScheme = useColorScheme();

    const [searchedCurrencyResult, setSearchedCurrencyResult] = useState<string[][] | undefined>(undefined);

    const theme = useColorScheme();
    const [searching, setSearching] = useState<boolean>(false);

    return (

        <View
            style={[{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isLightMode ? "white" : "black",
            }, StyleSheet.absoluteFill]}
        >

            <Stack.Screen options={{
                title: "Change Currency",
                headerTitleAlign: "center",
                ...headerTheme,
                headerSearchBarOptions: currencyList !== null && currencyList.length > 0 ? {
                    placeholder: "Search currency...",
                    onChangeText: async (e) => {
                        setSearching(true);
                        searchCurrencyHandler && searchCurrencyHandler(e.nativeEvent.text, setSearchedCurrencyResult)
                    },
                    onCancelButtonPress: () => {
                        setSearchedCurrencyResult([]);
                        setSearching(false);
                    },
                    onClose: () => {
                        setSearchedCurrencyResult([]);
                        setSearching(false);
                    },
                    textColor: theme === 'light' ? "#4C4C4C" : "#ABABAB",
                    headerIconColor: theme === 'light' ? "#4C4C4C" : "#ABABAB"
                } : undefined
            }} />

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

            {currencyList && <CurrencyList
                data={searching && searchedCurrencyResult !== undefined ? searchedCurrencyResult : currencyList}
                onSelect={async (toUpdate) => updateCurrencyValue(toUpdate, Number.parseInt(ID.toString()))}
                isSearching={searching && searchedCurrencyResult !== undefined}
            />}
        </View>
    );
}

