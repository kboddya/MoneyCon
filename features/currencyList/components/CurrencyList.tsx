import { VirtualizedList, Text, Pressable, StyleSheet, View, TextStyle } from "react-native";
import { useCallback, memo } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import useCurrencyContext from "@/stores/CurrencyStore";
import { sizes } from "@/constants/sizes";
import RefreshCurrencyList from "./RefreshCurrencyList";
import ListFooter from "./ListFooter";
import NotFoundAnyResult from "./NotFoundAnyResult";

type CurrencyList = {
    data: string[][];
    onSelect: (item: string[]) => void;
    isSearching: boolean;
};

const CurrencyList = memo(({ data, onSelect, isSearching }: CurrencyList) => {
    const { colors } = useThemeContext();
    const { selectedCurrencyCodes } = useCurrencyContext()

    const renderFunction = useCallback(({ item }: { item: string[] }) => {
        const isSelected = selectedCurrencyCodes.includes(item[0].toUpperCase());
        return (
            <Pressable
                onPress={() => onSelect(item)}
                disabled={isSelected}
                style={({ pressed }) => [
                    pressed ? { opacity: 0.8, transform: [{ scale: 0.99 }] } : { opacity: 1 }
                ]}
            >
                <View
                    style={[
                        styles.item,
                        { borderBottomColor: colors?.border, },
                    ]}
                >
                    <View style={[styles.fullNamePart, { opacity: isSelected ? 0.5 : 1, }]}>
                        <Text
                            style={{
                                color: colors?.mainText,
                                fontSize: sizes?.fontSizeMedium
                            }}
                        >{item[1]}</Text>
                    </View>
                    <View style={[styles.codePart, { opacity: isSelected ? 0.5 : 1, }]}>
                        <Text
                            style={{
                                color: colors?.mainText,
                                fontSize: sizes?.fontSizeMedium
                            }}
                        >{item[0].toUpperCase()}</Text>
                    </View>
                </View>
            </Pressable >
        )
    }, [colors])


    const getItemCount = (data: string[][]) => data.length;

    const getItem = (data: string[][], index: number) => data[index];


    if (isSearching) {
        if (!data.length) {
            return <NotFoundAnyResult />
        }
        return (
            <VirtualizedList
                data={data}
                keyExtractor={(item) => item[0]}
                getItem={getItem}
                getItemCount={getItemCount}
                renderItem={renderFunction}
                style={{ marginBottom: 12, width: "95%", height: "100%" }}
            />
        )
    }

    if (!data.length) return (
        <RefreshCurrencyList />
    );

    return (
        <VirtualizedList
            data={data}
            keyExtractor={(item) => item[0]}
            renderItem={renderFunction}
            getItem={getItem}
            getItemCount={getItemCount}
            style={{ marginBottom: 12, width: "95%", height: "100%" }}
            ListFooterComponent={<ListFooter />}
        />
    )
});

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        display: "flex",
        paddingInline: "5%",
        gap: "10%"
    },
    fullNamePart: {
        flexShrink: 1
    },
    codePart: {
        justifyContent: 'center',
        flexShrink: 0
    },
});


export default CurrencyList;