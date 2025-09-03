import {StyleSheet, Text, TextInput, View, useColorScheme, BackHandler, Alert, Modal} from "react-native";
import {Link, router, Stack, useLocalSearchParams} from "expo-router";
import {Row, Rows, Table} from "react-native-table-component";
import {getTime, getValue} from "@/app/services/cacheService";
import {updateData} from "@/app/services/apiService";
import React, {useEffect, useState} from "react";
import {calculate, exchangeRateTable} from "@/app/services/calcService";
import {calcData} from "@/app/entities/calcData";
import ToastProvider, {Toast} from "toastify-react-native"
import {formatNumber} from "@/app/services/helper";
import * as Network from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const [values, setValues] = useState({
        firstVal: "",
        secondVal: "",
        thirdVal: "",
        fourthVal: "",
    });

    const [table, setTable] = useState({
        secondVal: {
            currentVal: "",
            percentVal: ""
        },
        thirdVal: {
            currentVal: "",
            percentVal: ""
        },
        fourthVal: {
            currentVal: "",
            percentVal: ""
        },
    });

    const [data, setData] = useState({
        firstData: "",
        secondData: "",
        thirdData: "",
        fourthData: "",
    })

    useEffect(() => {
        setData({
            firstData: "",
            secondData: "",
            thirdData: "",
            fourthData: "",
        })
    }, [values.firstVal, values.secondVal, values.thirdVal, values.fourthVal]);

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
            setTable(data ?? {
                secondVal: {
                    currentVal: "",
                    percentVal: ""
                },
                thirdVal: {
                    currentVal: "",
                    percentVal: ""
                },
                fourthVal: {
                    currentVal: "",
                    percentVal: ""
                },
            });
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


        <View style={styles.textBoxAndValPicker}>

            <View style={styles.valuePicker}>
                <Link href={"/pages/ValPicker?ID=1"}>
                    <View
                        style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.valueButtonText}>
                            {values.firstVal ?? "?"}
                        </Text>
                    </View>

                </Link>
            </View>

            <View style={styles.border}/>


            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder={"Enter amount"}
                value={data.firstData !== "NaN" ? data.firstData : ""}
                onChangeText={text => {
                    if (!toUpdate(text)) return;
                    data.firstData = text;
                    setData(data)
                    calculate(new calcData(values, text, 1)).then(data => {
                        if (data == null) Toast.show({
                            text1: "Exchange rates are not available. Please try again later.",
                            type: "error"
                        });
                        else {
                            setData(data)
                        }
                    });
                }}
                onSubmitEditing={e => {
                    data.firstData = Number.parseFloat(e.nativeEvent.text).toFixed(2);
                    setData(data)
                }}

            />
        </View>


        <View style={styles.textBoxAndValPicker}>

            <View style={styles.valuePicker}>
                <Link href={"/pages/ValPicker?ID=2"}>
                    <View
                        style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.valueButtonText}>
                            {values.secondVal ?? "?"}
                        </Text>
                    </View>

                </Link>
            </View>

            <View style={styles.border}/>

            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder={"Enter amount"}
                value={data.secondData !== "NaN" ? data.secondData : ""}
                onChangeText={text => {
                    if (!toUpdate(text)) return;
                    data.secondData = text;
                    setData(data);
                    calculate(new calcData(values, text, 2)).then(d => {
                        if (d == null) Toast.show({
                            text1: "Exchange rates are not available. Please try again later.",
                            type: "error"
                        });
                        else {
                            setData(d);
                        }
                    });
                }}
                onSubmitEditing={e => {
                    data.secondData = Number.parseFloat(e.nativeEvent.text).toFixed(2);
                    setData(data)
                }}
            />
        </View>

        <View style={styles.textBoxAndValPicker}>

            <View style={styles.valuePicker}>
                <Link href={"/pages/ValPicker?ID=3"}>
                    <View
                        style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.valueButtonText}>
                            {values.thirdVal ?? "?"}
                        </Text>
                    </View>
                </Link>
            </View>

            <View style={styles.border}/>

            <TextInput
                style={styles.textInput}
                keyboardType={"numeric"}
                placeholder={"Enter amount"}
                value={data.thirdData !== "NaN" ? data.thirdData : ""}
                onChangeText={text => {
                    if (!toUpdate(text)) return;
                    data.thirdData = text;
                    setData(data);
                    calculate(new calcData(values, text, 3)).then(d => {
                        if (d == null) Toast.show({
                            text1: "Exchange rates are not available. Please try again later.",
                            type: "error"
                        });
                        else {
                            setData(d);
                        }
                    });
                }}
                onSubmitEditing={e => {
                    data.thirdData = Number.parseFloat(e.nativeEvent.text).toFixed(2);
                    setData(data)
                }}
            />
        </View>

        <View style={styles.textBoxAndValPicker}>

            <View style={styles.valuePicker}>
                <Link href={"/pages/ValPicker?ID=4"}>
                    <View
                        style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Text style={styles.valueButtonText}>
                            {values.fourthVal ?? "?"}
                        </Text>
                    </View>

                </Link>
            </View>

            <View style={styles.border}/>

            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder={"Enter amount"}
                value={data.fourthData !== "NaN" ? data.fourthData : ""}
                onChangeText={text => {
                    if (!toUpdate(text)) return;
                    data.fourthData = text;
                    setData(data);
                    calculate(new calcData(values, text, 4)).then(d => {
                        if (d == null) Toast.show({
                            text1: "Exchange rates are not available. Please try again later.",
                            type: "error"
                        });
                        else {
                            setData(d);
                        }
                    });
                }}
                onSubmitEditing={e => {
                    data.fourthData = Number.parseFloat(e.nativeEvent.text).toFixed(2);
                    setData(data)
                }}
            />
        </View>

        <View style={styles.excangeRateTabdle}>

            <View style={styles.excangeRateTableHeader}>
                <Text style={styles.tableHeader}>Exchange Rates</Text>
            </View>

            <Table style={styles.placeExchangeRateTableTablet}>
                <Row data={["", "Rate", "Percent", values.firstVal]}
                     textStyle={styles.tableText}
                     style={{marginBottom: "5.3%"}}
                />
                <Rows
                    data={[[values.secondVal, table.secondVal.currentVal, (table.secondVal.percentVal.includes("-") ? "" : "+") + table.secondVal.percentVal, ""]]}
                    textStyle={styles.tableText}
                    style={{
                        paddingBottom: "4.5%",
                        borderBottomWidth: 1,
                        borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                    }}
                />
                <Rows
                    data={[[values.thirdVal, table.thirdVal.currentVal, (table.thirdVal.percentVal.includes("-") ? "" : "+") + table.thirdVal.percentVal, ""]]}
                    textStyle={styles.tableText} style={{
                    paddingTop: "4.5%",
                    paddingBottom: "4.5%",
                    borderBottomWidth: 1,
                    borderBottomColor: colorScheme === 'light' ? "#DDDDDD" : "#ABABAB"
                }}
                />
                <Rows
                    data={[[values.fourthVal, table.fourthVal.currentVal, (table.fourthVal.percentVal.includes("-") ? "" : "+") + table.fourthVal.percentVal, ""]]}
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