import { memo, useContext } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import useExchangeRateTable from "@/features/currencyConvertor/hooks/useExchangeRateTable";
import { sizes } from "@/constants/sizes";

const ExchangeRateTable = memo(() => {
    const { colors, isLightMode } = useThemeContext();
    const { table, mainCurrencyCode } = useExchangeRateTable();

    if (!table) return undefined;

    return (
        <View style={[
            style.container,
            {
                backgroundColor: colors.containerBg,
            },
        ]}>
            <Text style={[
                style.header,
                {
                    color: colors.mainText,
                    fontSize: sizes.headerFontSize
                }
            ]}>Exchange Rates</Text>

            <View style={[
                style.tableContainer,
                {
                    paddingBottom: 0,
                    borderTopWidth: 0,
                    borderTopColor: colors.border,
                }
            ]}>
                <View style={{ alignItems: "flex-start", flex: 2 }} />
                <View style={{ alignItems: "center", flex: 3 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        {
                            color: colors.mainText,
                            fontSize: sizes.fontSizeMedium,
                            fontWeight: "semibold",
                        }
                    ]}>Rates</Text>
                </View>
                <View style={{ alignItems: "center", flex: 3 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        {
                            color: colors.mainText,
                            fontSize: sizes.fontSizeMedium,
                            fontWeight: "semibold",
                        }
                    ]}>Changed</Text>
                </View>
                <View style={{ alignItems: "flex-end", flex: 2 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        {
                            color: colors.mainText,
                            fontSize: sizes.fontSizeMedium,
                            fontWeight: "semibold",
                        }
                    ]}>{mainCurrencyCode}</Text>
                </View>
            </View>

            {table.map((item, index) => item.currencyCode !== "?" ? (
                <View key={index + item.currencyCode} style={[
                    style.tableContainer,
                    {
                        paddingVertical: 12,
                        borderTopWidth: 1,
                        borderColor: colors.border,
                    },
                    index === 0 ? { borderTopWidth: 0 } : {}
                ]}>
                    <View style={{ alignItems: "flex-start", flex: 2 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            {
                                color: colors.mainText,
                                fontSize: sizes.fontSizeMedium,
                                fontWeight: "semibold",
                            }
                        ]}>{item.currencyCode}</Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 3 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            {
                                color: colors.mainText,
                                fontSize: sizes.fontSizeMedium
                            }
                        ]}>{item.currentVal}</Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 3 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            {
                                color: colors.mainText,
                                fontSize: sizes.fontSizeMedium
                            }
                        ]}>{item.percentVal}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", flex: 2 }} />
                </View>
            ) : null)}
        </View>
    );
})

const style = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: "4.6%",
        borderRadius: 10,
        paddingHorizontal: "6%",
        paddingVertical: "5.2%",
    },
    header: {
        fontWeight: "bold",
        textAlign: "center"
    },
    tableContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    secondaryHeaderText: {
        textAlign: "center"
    },
});

export default ExchangeRateTable;