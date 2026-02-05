import { VirtualizedList, Text, Pressable, StyleSheet, View, TextStyle } from "react-native";
import React, { useCallback, useMemo, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useKeyboard from "@/hooks/useKeyboard";
import { ThemeContext } from "@/context/ThemeContext";
import { CurrencyContext } from "@/context/CurrencyContext";

type CurrencyList = {
    data: string[][];
    onSelect: (item: string[]) => Promise<void>;
    isSearching: boolean;
};

const CurrencyList = (prop: CurrencyList) => {
    const { theme } = useContext(ThemeContext);
    const { currentCurrencyCodes, getCurrencyList } = useContext(CurrencyContext);
    const keyboardMargin = useKeyboard();

    const renderFunction = useCallback(({ item }: { item: string[] }) => {
        const isSelected = currentCurrencyCodes.includes(item[0].toUpperCase());
        return (
            <Pressable
                onPress={() => prop.onSelect(item)}
                disabled={isSelected}
            >
                <View
                    style={[
                        styles.item,
                        { borderBottomColor: theme.borderColor.backgroundColor as string, },
                    ]}
                >
                    <View style={[styles.fullNamePart, { opacity: isSelected ? 0.5 : 1, }]}>
                        <Text style={[
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]}>{item[1]}</Text>
                    </View>
                    <View style={[styles.codePart, { opacity: isSelected ? 0.5 : 1, }]}>
                        <Text style={[
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]}>{item[0].toUpperCase()}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }, []);


    const getItemCount = useMemo(() => (data: string[][]) => data.length, [prop.data]);

    const getItem = useCallback((data: string[][], index: number) => data[index], [prop.data]);


    if (prop.isSearching) {
        if (prop.data?.length === 0) {
            return (
                <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <View style={{ alignItems: "center", marginBottom: keyboardMargin }}>
                        <Text style={[
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]}>No results found</Text>
                    </View>
                </View>
            )
        }
        return (
            <VirtualizedList
                data={prop.data}
                keyExtractor={(item) => item[0]}
                getItem={getItem}
                getItemCount={getItemCount}
                renderItem={renderFunction}
                style={{ marginBottom: 12, width: "95%", height: "100%" }}
            />
        )
    }

    if (prop.data.length === 0) return (
        <View
            style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
        >
            <Text style={[
                theme.mainTextColor as TextStyle,
                theme.mediumTextSize as TextStyle
            ]}>
                Could't load currency list
            </Text>
            <Pressable onPress={() => getCurrencyList()}>
                <Text style={[
                    theme.linkTextColor as TextStyle,
                    theme.mediumTextSize as TextStyle,
                    { marginTop: 10 }
                ]}>
                    Retry
                </Text>
            </Pressable>
        </View>
    );

    return (
        <VirtualizedList
            data={prop.data}
            keyExtractor={(item) => item[0]}
            renderItem={renderFunction}
            getItem={getItem}
            getItemCount={getItemCount}
            style={{ marginBottom: 12, width: "95%", height: "100%" }}
            ListFooterComponent={() => (
                <SafeAreaView style={{ alignItems: "center" }} edges={["bottom"]}>
                    <Text style={[
                        theme.mainTextColor as TextStyle,
                        theme.mediumTextSize as TextStyle
                    ]}>Select a value to change it</Text>
                </SafeAreaView>
            )}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
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
});


export default CurrencyList;