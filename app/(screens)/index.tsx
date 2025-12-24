import { StyleSheet, Text, TextInput, View, useColorScheme, useWindowDimensions } from "react-native";
import { Link, Stack } from "expo-router";
import { Row, Rows, Table } from "react-native-table-component";
import React, { useContext, useEffect, useState } from "react";
import { CalcService, CalcData } from "@/services/CalcService";
import ToastProvider, { Toast } from "toastify-react-native"
import { ExchangeRateContext } from "@/context/ExchangeRateContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const toUpdate = (text: string): boolean => {
    if (text.includes("-") ||
        (text.split(".").length - 1) + (text.split(",").length - 1) > 1) return false;
    return true;
}

export default function Index() {
    const { exchangeRateUpdateTimestamp, values, table, exchangeRates } = useContext(ExchangeRateContext);

    const { fontScale } = useWindowDimensions();

    const [data, setData] = useState<string[]>(["", "", "", ""]);

    const [lastFocusedBox, setLastFocusedBox] = useState(-1);

    useEffect(() => {
        if (lastFocusedBox !== -1) {
            CalcService.calculate({
                data,
                values,
                exchangeRates,
                enterVal: lastFocusedBox
            }).then(result => {
                if (result == null) Toast.show({
                    text1: "Exchange rates are not available. Please try again later.",
                    type: "error"
                });
                else {
                    setData(result.data)
                }
            });
        }
    }, [values[0], values[1], values[2], values[3]]);

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create(colorScheme === 'dark' ? stylesDark : stylesLight);

    const ValAndDataBox = (enterVal: number) => {
        return (
            <View style={styles.textBoxAndValPicker}>

                <View style={styles.valuePicker}>
                    <Link href={`/(screens)/ValPicker?ID=${enterVal}`}>
                        <View
                            style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            {!values[enterVal] || values[enterVal] === "C" ? <MaterialCommunityIcons name="currency-usd-off" size={24} color={colorScheme === "light" ? "black" : "white"} /> :
                                <Text style={styles.valueButtonText}>
                                    {values[enterVal]}
                                </Text>}
                        </View>

                    </Link>
                </View>

                <View style={styles.border} />

                {!values[enterVal] || values[enterVal] === "C" ? <View style={styles.textInput}>
                    <Text style={styles.text}>
                        <MaterialCommunityIcons name="arrow-left" size={14 * fontScale} color={colorScheme === "light" ? "black" : "white"} />
                        Change currency
                    </Text>
                </View> : <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                    value={data[enterVal] !== "NaN" ? data[enterVal] : ""}
                    onChangeText={text => {
                        setLastFocusedBox(enterVal);
                        if (!toUpdate(text)) return;
                        const updatedData = data.map((val, i) => {
                            if (i === enterVal) val = text;
                            return val;
                        })
                        setData(updatedData);
                        CalcService.calculate({
                            data: updatedData,
                            values,
                            exchangeRates,
                            enterVal: enterVal
                        }).then(result => {
                            if (result == null) Toast.show({
                                text1: "Exchange rates are not available. Please try again later.",
                                type: "error"
                            });
                            else {
                                setData(result.data)
                            }
                        });
                    }}
                    onSubmitEditing={e => {
                        const updatedData = data.map((val, i) => {
                            if (i === enterVal) val = Number.parseFloat(e.nativeEvent.text).toFixed(2);
                            return val;
                        })
                        setData(updatedData)
                    }}
                    returnKeyType={"done"}
                />}

            </View>
        )
    }


    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: useColorScheme() === 'dark' ? "black" : "white",
            }}
        >
            <Stack.Screen options={{
                headerShown: true
            }} />

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
            }} />

            {exchangeRateUpdateTimestamp && <Text
                style={styles.updated}>Updated: {exchangeRateUpdateTimestamp ? ((Date.now() - Date.parse(exchangeRateUpdateTimestamp)) / (1000 * 60 * 60)).toFixed(0) : "?"} hours
                ago</Text>}

            {ValAndDataBox(0)}
            {ValAndDataBox(1)}
            {ValAndDataBox(2)}
            {ValAndDataBox(3)}

            {table && <View style={styles.excangeRateTabdle}>

                <View style={styles.excangeRateTableHeader}>
                    <Text style={styles.tableHeader}>Exchange Rates</Text>
                </View>

                <Table style={styles.placeExchangeRateTableTablet}>
                    <Row data={["", "Rate", "Percent", values[0]]}
                        textStyle={styles.tableText}
                        style={{ marginBottom: "5.3%" }}
                    />
                    <Rows
                        data={[[values[1], table.secondVal.currentVal, (table.secondVal.percentVal.includes("-") ? "" : "+") + table.secondVal.percentVal, ""]]}
                        textStyle={styles.tableText}
                        style={{
                            paddingBottom: "4.5%",
                            borderBottomWidth: 1,
                            borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                        }}
                    />
                    <Rows
                        data={[[values[2], table.thirdVal.currentVal, (table.thirdVal.percentVal.includes("-") ? "" : "+") + table.thirdVal.percentVal, ""]]}
                        textStyle={styles.tableText} style={{
                            paddingTop: "4.5%",
                            paddingBottom: "4.5%",
                            borderBottomWidth: 1,
                            borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                        }}
                    />
                    <Rows
                        data={[[values[3], table.fourthVal.currentVal, (table.fourthVal.percentVal.includes("-") ? "" : "+") + table.fourthVal.percentVal, ""]]}
                        textStyle={styles.tableText}
                        style={{ paddingTop: "4.5%", marginBottom: "8.3%" }}
                    />
                </Table>
            </View>}
            <ToastProvider
                position="bottom"
                showCloseIcon={false}
                showProgressBar={false}
                theme={colorScheme === "light" ? "light" : "dark"}
            />
        </View>
    );
}

const stylesLight = StyleSheet.create({
    updated: {
        color: "#A5A5A5",
        fontSize: 14,
        marginTop: "2%",
        marginBottom: "2%",
    },
    textBoxAndValPicker: {
        flexDirection: "row",
        marginBottom: "4%",
        width: "80%",
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        height: "5.9%",
        alignItems: "center",
        justifyContent: "center",
    },
    valuePicker: {
        width: "18%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    valueButtonText: {
        color: "#4C4C4C",
        fontSize: 18
    },
    textInput: {
        width: "82%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        fontSize: 18,
        paddingLeft: "3%",
        color: "#4C4C4C",
    },
    excangeRateTabdle: {
        backgroundColor: "#EFEFEF",
        width: "80%",
        height: "30%",
        borderRadius: 10,
        marginTop: "4.7%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    excangeRateTableHeader: {
        marginTop: "5.5%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#4C4C4C",
    },
    placeExchangeRateTableTablet: {
        justifyContent: "center",
        height: "70%",
        width: "100%",
    },
    tableText: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#4C4C4C"
    },
    tableHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#4C4C4C",
        marginBottom: "8%",
    },
    border: {
        width: 1,
        backgroundColor: "#DDDDDD",
        height: "70%"
    }
});

const stylesDark = StyleSheet.create({
    updated: {
        color: "#ABABAB",
        fontSize: 14,
        marginTop: "2%",
        marginBottom: "2%",
    },
    textBoxAndValPicker: {
        flexDirection: "row",
        marginBottom: "4%",
        width: "80%",
        backgroundColor: "#272525",
        borderRadius: 10,
        height: "5.9%",
        alignItems: "center",
        justifyContent: "center",
    },
    valuePicker: {
        width: "18%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    valueButtonText: {
        color: "#ABABAB",
        fontSize: 18
    },
    textInput: {
        width: "82%",
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        fontSize: 18,
        paddingLeft: "3%",
        color: "#ABABAB",
    },
    excangeRateTabdle: {
        backgroundColor: "#272525",
        width: "80%",
        height: "30%",
        borderRadius: 10,
        marginTop: "4.7%",
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    excangeRateTableHeader: {
        marginTop: "5.5%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#ABABAB",
    },
    placeExchangeRateTableTablet: {
        justifyContent: "center",
        height: "70%",
        width: "100%",
    },
    tableText: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#ABABAB"
    },
    tableHeader: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#ABABAB",
        marginBottom: "8%",
    },
    border: {
        width: 1,
        backgroundColor: "#ABABAB",
        height: "70%"
    }
});