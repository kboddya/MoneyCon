import {Text, View, StyleSheet, TextInput, Alert} from "react-native";
import {Link, router} from "expo-router";
import {Table, Row, Rows} from "react-native-table-component";
import {getValue, getTime, getApiKey} from "@/app/sevices/cacheService";
import {updateData} from "@/app/sevices/apiService";
import React, {useState} from "react";
import {calculate, exchangeRateTable} from "@/app/sevices/calcService";
import {calcData} from "@/app/entities/calcData";
import {errorDescription} from "@/app/sevices/helper";
import {Toast} from "toastify-react-native";
import ToastManager from "toastify-react-native/components/ToastManager";

export default function Index() {
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

    const [time, setTime] = useState("");

    new Promise(async resolve => {
        setTimeout(resolve, 5000)
        await updateData(false).then(d => {
            if (d !== true) {
                if (!d.includes("101") && !d.includes(" 1000")) Alert.alert("Update failed", errorDescription(d));
                else if (d.includes(" 1000")) Toast.info("The data is out of date")
                else if (d.includes("101")) router.replace("/pages/ApiKeySettings")
            }
        });
    });


    const date = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));

    getValue().then(setValues)

    getTime().then(setTime);

    exchangeRateTable().then(data => {
            setTable(data??{
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

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}
        >

            <Text
                style={styles.updated}>Updated: {time ? ((Date.now() - Date.parse(time)) / (1000 * 60 * 60)).toFixed(0) : "?"} hours
                ago</Text>
            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <Link href={"/pages/ValPicker?ID=1"} style={styles.valueButton}>
                        <View style={styles.valueButton}><Text
                            style={styles.valueButtonText}>{values.firstVal ?? "?"}</Text>
                        </View>
                    </Link>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                    value={data.firstData != "NaN" ? data.firstData : ""}
                    onChangeText={text => {
                        setData({
                            firstData: text,
                            secondData: data.secondData,
                            thirdData: data.thirdData,
                            fourthData: data.fourthData,
                        });
                        calculate(new calcData(values, text, 1)).then(d => {
                            if (d == null) Toast.error("Exchange rates are not available. Please try again later.");
                            else {
                                setData({
                                    firstData: d.firstData,
                                    secondData: d.secondData,
                                    thirdData: d.thirdData,
                                    fourthData: d.fourthData,
                                });
                            }
                        });
                    }}
                    onSubmitEditing={e => {
                        setData({
                            firstData: Number.parseFloat(e.nativeEvent.text).toFixed(4),
                            secondData: data.secondData,
                            thirdData: data.thirdData,
                            fourthData: data.fourthData,
                        })
                    }}

                />
            </View>


            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <Link href={"/pages/ValPicker?ID=2"} style={styles.valueButton}>
                        <View style={styles.valueButton}><Text
                            style={styles.valueButtonText}>{values.secondVal ?? "?"}</Text>
                        </View>
                    </Link>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                    value={data.secondData != "NaN" ? data.secondData : ""}
                    onChangeText={text => {
                        setData({
                            firstData: data.firstData,
                            secondData: text,
                            thirdData: data.thirdData,
                            fourthData: data.fourthData,
                        });
                        calculate(new calcData(values, text, 2)).then(d => {
                            if (d == null) Toast.error("Exchange rates are not available. Please try again later.");
                            else {
                                setData({
                                    firstData: d.firstData,
                                    secondData: d.secondData,
                                    thirdData: d.thirdData,
                                    fourthData: d.fourthData,
                                });
                            }
                        });
                    }}
                    onSubmitEditing={e => {
                        setData({
                            firstData: data.firstData,
                            secondData: Number.parseFloat(e.nativeEvent.text).toFixed(4),
                            thirdData: data.thirdData,
                            fourthData: data.fourthData,
                        })
                    }}
                />
            </View>

            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <Link href={"/pages/ValPicker?ID=3"} style={styles.valueButton}>
                        <View style={styles.valueButton}>
                            <Text
                                style={styles.valueButtonText}>{values.thirdVal ?? "?"}</Text>
                        </View>
                    </Link>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    placeholder={"Enter amount"}
                    value={data.thirdData != "NaN" ? data.thirdData : ""}
                    onChangeText={text => {
                        setData({
                            firstData: data.firstData,
                            secondData: data.secondData,
                            thirdData: text,
                            fourthData: data.fourthData,
                        });
                        calculate(new calcData(values, text, 3)).then(d => {
                            if (d == null) Toast.error("Exchange rates are not available. Please try again later.");
                            else {
                                setData({
                                    firstData: d.firstData,
                                    secondData: d.secondData,
                                    thirdData: d.thirdData,
                                    fourthData: d.fourthData,
                                });
                            }
                        });
                    }}
                    onSubmitEditing={e => {
                        setData({
                            firstData: data.firstData,
                            secondData: data.secondData,
                            thirdData: Number.parseFloat(e.nativeEvent.text).toFixed(4),
                            fourthData: data.fourthData,
                        })
                    }}
                />
            </View>

            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <Link href={"/pages/ValPicker?ID=4"} style={styles.valueButton}>
                        <View style={styles.valueButton}>
                            <Text
                                style={styles.valueButtonText}>{values.fourthVal ?? "?"}</Text>
                        </View>
                    </Link>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                    value={data.fourthData != "NaN" ? data.fourthData : ""}
                    onChangeText={text => {
                        setData({
                            firstData: data.firstData,
                            secondData: data.secondData,
                            thirdData: data.thirdData,
                            fourthData: text,
                        });
                        calculate(new calcData(values, text, 4)).then(d => {
                            if (d == null) Toast.error("Exchange rates are not available. Please try again later.");
                            else {
                                setData({
                                    firstData: d.firstData,
                                    secondData: d.secondData,
                                    thirdData: d.thirdData,
                                    fourthData: d.fourthData,
                                });
                            }
                        });
                    }}
                    onSubmitEditing={e => {
                        setData({
                            firstData: data.firstData,
                            secondData: data.secondData,
                            thirdData: data.thirdData,
                            fourthData: Number.parseFloat(e.nativeEvent.text).toFixed(4),
                        })
                    }}
                />
            </View>

            <View style={styles.excangeRateTabdle}>
                <View style={styles.excangeRateTableHeader}>
                    <Text style={{fontSize: 19, fontWeight: "bold", color: "#4C4C4C"}}>Exchange Rates</Text>
                </View>
                <View style={styles.placeExchangeRateTableTablet}>
                    <Table borderStyle={{borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}>
                        <Row data={["", "Buying", "Selling", values.firstVal]}
                             textStyle={{fontSize: 18, fontWeight: "semibold", color: "#4C4C4C"}}
                             style={{marginBottom: 2}}/>
                        <Rows
                            data={[[values.secondVal, table.secondVal.currentVal, table.secondVal.percentVal]]}
                            textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}}
                            style={{paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}/>
                        <Rows
                            data={[[values.thirdVal, table.thirdVal.currentVal, table.thirdVal.percentVal]]}
                            textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}} style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#DDDDDD"
                        }}/>
                        <Rows
                            data={[[values.fourthVal, table.fourthVal.currentVal, table.fourthVal.percentVal]]}
                            textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}}
                            style={{paddingTop: 10, marginBottom: 36}}/>
                    </Table>
                </View>
            </View>
            <ToastManager/>
        </View>

    );
}

const styles = StyleSheet.create({
    updated: {
        color: "#A5A5A5",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 11,
    },
    textBoxAndValPicker: {
        flexDirection: "row",
        marginBottom: 15,
    },
    valuePicker: {
        backgroundColor: "#EFEFEF",
        height: 50,
        width: 56,
        borderWidth: 0,
        borderRightWidth: 1,
        borderColor: "#DDDDDD",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    valueButton: {

        justifyContent: "center",
        alignItems: "center"
    },
    valueButtonText: {
        fontSize: 18
    },
    textInput: {
        backgroundColor: "#EFEFEF",
        width: 330 - 56,
        height: 50,
        borderWidth: 0,
        borderLeftWidth: 1,
        borderColor: "#DDDDDD",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        fontSize: 18,
        paddingLeft: 10,
    },
    excangeRateTabdle: {
        backgroundColor: "#EFEFEF",
        width: 330,
        height: 210,
        borderRadius: 10,
        marginTop: 38 - 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    excangeRateTableHeader: {
        paddingTop: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#4C4C4C",
    },
    placeExchangeRateTableTablet: {
        justifyContent: "center",
        height: 178,
        width: "100%",
    }
});
