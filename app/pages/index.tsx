import {Text, View, StyleSheet, TextInput} from "react-native";
import {Link, Stack, useLocalSearchParams} from "expo-router";
import {Table, Row, Rows} from "react-native-table-component";
import {getValue} from "@/app/sevices/cacheService";
import React, {useEffect, useState} from "react";

export default function Index() {
    const [values, setValues] = useState({
        firstVal: "",
        secondVal: "",
        thirdVal: "",
        fourthVal: "",
    });

    useEffect(() => {
        getValue().then(setValues);
    })

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}
        >

            <Text style={styles.updated}>Updated: now</Text>
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
                        <Rows data={[[values.secondVal, "40.9", "41.32", ""]]}
                              textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}}
                              style={{paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}/>
                        <Rows data={[[values.thirdVal, "40.9", "41.32", ""]]}
                              textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}} style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#DDDDDD"
                        }}/>
                        <Rows data={[[values.fourthVal, "40.9", "41.32", ""]]}
                              textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}}
                              style={{paddingTop: 10, marginBottom: 36}}/>
                    </Table>
                </View>
            </View>
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
