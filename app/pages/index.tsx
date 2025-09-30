import {StyleSheet, Text, TextInput, View, useColorScheme, BackHandler, Alert} from "react-native";
import {Link, router, Stack, useLocalSearchParams} from "expo-router";
import {Row, Rows, Table} from "react-native-table-component";
import {getTime, getValue} from "@/app/services/cacheService";
import {updateData} from "@/app/services/apiService";
import React, {useEffect, useState} from "react";
import {calculate, exchangeRateTable} from "@/app/services/calcService";
import {calcData} from "@/app/entities/calcData";
import ToastProvider, {Toast} from "toastify-react-native"
import * as Network from "expo-network";
import {stylesLight, stylesDark} from "@/assets/styles";

const toUpdate = (text: string): boolean => {
    if (text.includes("-") ||
        (text.split(".").length - 1) + (text.split(",").length - 1) > 1) return false;
    return true;
}

export default function Index() {
    const [networkStatus, setNetworkStatus] = useState({
        type: Network.NetworkStateType.UNKNOWN,
        isConnected: false,
        isInternetReachable: false,
        isChanged: false
    });

    Network.getNetworkStateAsync().then(state => {
        setNetworkStatus({
            type: state.type ?? Network.NetworkStateType.UNKNOWN,
            isConnected: state.isConnected ?? false,
            isInternetReachable: state.isInternetReachable ?? false,
            isChanged: true
        });
    });

    const [errorStatus, setErrorStatus] = useState("");

    const [values, setValues] = useState(["", "", "", ""]);

    const [table, setTable] = useState([
        {
            currentVal: "",
            percentVal: ""
        }, {
            currentVal: "",
            percentVal: ""
        }, {
            currentVal: "",
            percentVal: ""
        }
    ]);

    const [data, setData] = useState<string[]>(["", "", "", ""]);

    const [lastFocusedBox, setLastFocusedBox] = useState(-1);

    useEffect(() => {
        if (lastFocusedBox !== -1) {
            calculate(new calcData(values, data[lastFocusedBox], lastFocusedBox)).then(result => {
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

    const [time, setTime] = useState("");

    getValue().then(setValues)

    getTime().then(setTime);

    useEffect(() => {
        if (networkStatus.isChanged && (!networkStatus.isConnected || !networkStatus.isInternetReachable)) {
            setErrorStatus("No internet connection");
            if (time === "") {
                Alert.alert("No internet connection", "You have not saved any exchange rates. Please connect to the internet.", [
                    {text: "Close app", onPress: () => BackHandler.exitApp()},
                    {text: "Try again", onPress: () => null}
                ]);
            }
            return;
        }
        updateData().then(d => {
            if (!d.success) {
                setErrorStatus(d.error);
            } else if (d.success && errorStatus !== "") {
                setErrorStatus("");
            }
        });
    }, [time, networkStatus.isConnected, networkStatus.isInternetReachable, networkStatus.type]);

    useEffect(() => {
        console.log(errorStatus)
        if (errorStatus === "Update already in progress") Toast.show({
            text1: "Update already in progress",
            type: "info",
        });
        else if (errorStatus.includes("1000")) Toast.show({
            text1: "Error updating data",
            text2: "You can still use the app with the old data.",
            type: "warn",
        });
        else if (errorStatus.includes("101")) router.push("/pages/welcome")
        else if (errorStatus === "No internet connection") Toast.show({
            text1: "App work's in offline mode",
            type: "warn"
        });
        else if (errorStatus === "Data updated successfully") Toast.show({
            text1: "Data updated successfully",
            type: "success"
        });
    }, [errorStatus]);

    exchangeRateTable().then(data => {
            setTable(data ?? [
                {
                    currentVal: "?",
                    percentVal: "?"
                }, {
                    currentVal: "?",
                    percentVal: "?"
                }, {
                    currentVal: "?",
                    percentVal: "?"
                }
            ]);
        }
    )

    const colorScheme = useColorScheme();
    const styles = StyleSheet.create(colorScheme === 'dark' ? stylesDark : stylesLight);

    const {updated} = useLocalSearchParams();
    useEffect(() => {
        if (updated?.toString() === "true") {
            router.setParams({updated: null});
            setErrorStatus("Data updated successfully");
        }
    });

    const ValAndDataBox = (enterVal: number) => {
        return (
            <View style={styles.textBoxAndValPicker}>

                <View style={styles.valuePicker}>
                    <Link href={`/pages/ValPicker?ID=${enterVal + 1}`}>
                        <View
                            style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Text style={styles.valueButtonText}>
                                {values[enterVal] ?? "?"}
                            </Text>
                        </View>

                    </Link>
                </View>

                <View style={styles.border}/>


                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                    value={data[enterVal] !== "NaN" ? data[enterVal] : ""}
                    onChangeText={text => {
                        setLastFocusedBox(enterVal);
                        if (!toUpdate(text)) return;
                        setData(prevState => prevState.map((val, i) => val = i === enterVal ? text : val));
                        calculate(new calcData(values, text, enterVal)).then(result => {
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
                />
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
            }}/>

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
            }}/>

            <Text
                style={styles.updated}>Updated: {time ? ((Date.now() - Date.parse(time)) / (1000 * 60 * 60)).toFixed(0) : "?"} hours
                ago</Text>

            {ValAndDataBox(0)}
            {ValAndDataBox(1)}
            {ValAndDataBox(2)}
            {ValAndDataBox(3)}

            <View style={styles.excangeRateTabdle}>

                <View style={styles.excangeRateTableHeader}>
                    <Text style={styles.tableHeader}>Exchange Rates</Text>
                </View>

                <Table style={styles.placeExchangeRateTableTablet}>
                    <Row data={["", "Rate", "Percent", values[0]]}
                         textStyle={styles.tableText}
                         style={{marginBottom: "5.3%"}}
                    />
                    <Rows
                        data={[[values[1], table[0].currentVal, (table[0].percentVal.includes("-") ? "" : "+") + table[0].percentVal, ""]]}
                        textStyle={styles.tableText}
                        style={{
                            paddingBottom: "4.5%",
                            borderBottomWidth: 1,
                            borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                        }}
                    />
                    <Rows
                        data={[[values[2], table[1].currentVal, (table[1].percentVal.includes("-") ? "" : "+") + table[1].percentVal, ""]]}
                        textStyle={styles.tableText} style={{
                        paddingTop: "4.5%",
                        paddingBottom: "4.5%",
                        borderBottomWidth: 1,
                        borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                    }}
                    />
                    <Rows
                        data={[[values[3], table[2].currentVal, (table[2].percentVal.includes("-") ? "" : "+") + table[2].percentVal, ""]]}
                        textStyle={styles.tableText}
                        style={{paddingTop: "4.5%", marginBottom: "8.3%"}}
                    />
                </Table>
            </View>
            <ToastProvider
                position="bottom"
                showCloseIcon={false}
                showProgressBar={false}
                theme={colorScheme === "light" ? "light" : "dark"}
            />
        </View>
    );
}