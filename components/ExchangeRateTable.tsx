import { memo, useContext } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { ExchangeRateTableType } from "@/hooks/useExchangeRateTable";

type ExchangeRateTableProps = {
    table: ExchangeRateTableType | null;
    mainCurrencyCode: string;
};


const ExchangeRateTable = memo((props: ExchangeRateTableProps) => {
    const { theme, isLightMode, windowDimensions } = useContext(ThemeContext);

    if (!props.table) return null;

    const tableContainerStyle: ViewStyle = {
        ...style.tableContainer,
        paddingVertical: 12 * windowDimensions.fontScale,
        borderTopWidth: 1,
        borderColor: isLightMode ? "#DDDDDD" : "#ABABAB",
    }
    return (
        <View style={[
            style.container,
            {
                maxHeight: 50 * windowDimensions.fontScale,
                maxWidth: 330 * windowDimensions.fontScale,
            },
            theme.containerBG as ViewStyle,
        ]}>
            <Text style={[
                style.header,
                theme.mainTextColor as TextStyle,
                theme.headerTextSize as TextStyle
            ]}>Exchange Rates</Text>

            <View style={[tableContainerStyle, { paddingBottom: 0, borderTopWidth: 0 }]}>
                <View style={{ alignItems: "flex-start", flex: 2 }} />
                <View style={{ alignItems: "center", flex: 3 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        theme.mainTextColor as TextStyle,
                        theme.mediumTextSize as TextStyle,
                        { fontWeight: "semibold", }
                    ]}>Rates</Text>
                </View>
                <View style={{ alignItems: "center", flex: 3 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        theme.mainTextColor as TextStyle,
                        theme.mediumTextSize as TextStyle,
                        { fontWeight: "semibold", }
                    ]}>Changed</Text>
                </View>
                <View style={{ alignItems: "flex-end", flex: 2 }}>
                    <Text style={[
                        style.secondaryHeaderText,
                        theme.mainTextColor as TextStyle,
                        theme.mediumTextSize as TextStyle,
                        { fontWeight: "semibold", }
                    ]}>{props.mainCurrencyCode}</Text>
                </View>
            </View>

            {props.table.map((item, index) => item.currencyCode !== "?" ? (
                <View key={index + item.currencyCode} style={[tableContainerStyle, index === 0 ? { borderTopWidth: 0 } : {}]}>
                    <View style={{ alignItems: "flex-start", flex: 2 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle,
                            { fontWeight: "semibold", }
                        ]}>{item.currencyCode}</Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 3 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]}>{item.currentVal}</Text>
                    </View>
                    <View style={{ alignItems: "center", flex: 3 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]}>{item.percentVal}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", flex: 2 }}>
                        <Text style={[
                            style.secondaryHeaderText,
                            theme.mainTextColor as TextStyle,
                            theme.mediumTextSize as TextStyle
                        ]} />
                    </View>
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