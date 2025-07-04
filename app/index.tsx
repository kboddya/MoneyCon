import {Text, View, StyleSheet, TextInput} from "react-native";
import {Link, Stack, useLocalSearchParams} from "expo-router";
import {Image} from "expo-image";
import {Table, Row, Rows} from "react-native-table-component";

export default function Index() {
    const {ID, code} = useLocalSearchParams();
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}>
            <Stack.Screen
                options={{
                    title: "MoneyCon",
                    headerTitleAlign: "center",
                    headerRight: () => <Link href={"/apiKeySettings"}><Image
                        style={styles.settingsButton}
                        source={require("../assets/images/Settings.svg")}
                    /></Link>,
                }}>

            </Stack.Screen>
            <Text style={styles.updated}>Updated: now</Text>
            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <View style={styles.valueButton}>
                        <Link href={"/ValPicker?ID=1"} style={styles.valueButton}><Text
                            style={styles.valueButtonText}>{code ?? "UAH"}</Text></Link>
                    </View>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                />
            </View>


            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <View style={styles.valueButton}>
                        <Link href={"/ValPicker?ID=2"} style={styles.valueButton}><Text
                            style={styles.valueButtonText}>USD</Text></Link>
                    </View>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder={"Enter amount"}
                />
            </View>

            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <View style={styles.valueButton}>
                        <Link href={"/ValPicker?ID=3"} style={styles.valueButton}><Text
                            style={styles.valueButtonText}>EUR</Text></Link>
                    </View>
                </View>
                <TextInput
                    style={styles.textInput}
                    keyboardType={"numeric"}
                    placeholder={"Enter amount"}
                />
            </View>

            <View style={styles.textBoxAndValPicker}>
                <View style={styles.valuePicker}>
                    <View style={styles.valueButton}>
                        <Link href={"/ValPicker?ID=4"} style={styles.valueButton}><Text
                            style={styles.valueButtonText}>MDL</Text></Link>
                    </View>
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
                        <Row data={["", "Buying", "Selling", "UAH"]} textStyle={{fontSize: 18, fontWeight: "semibold", color: "#4C4C4C"}} style={{marginBottom: 2}}/>
                        <Rows data={[["USD", "40.9", "41.32", ""]]} textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}} style={{paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}/>
                        <Rows data={[["EUR", "40.9", "41.32", ""]]} textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}} style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#DDDDDD"}}/>
                        <Rows data={[["MDL", "40.9", "41.32", ""]]} textStyle={{fontSize: 18, fontWeight: "regular", color: "#4C4C4C"}} style={{paddingTop: 10, marginBottom: 36}}/>
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
    settingsButton: {
        width: 25,
        height: 25,
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
