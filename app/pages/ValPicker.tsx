import {FlatList, View, Text, StyleSheet, useColorScheme} from 'react-native';
import {Link, useLocalSearchParams} from "expo-router";
import {changeValue} from "@/app/services/cacheService";
import React from "react";
import Toast from "react-native-simple-toast";

const currencies = require("../../assets/currencies.json");

export default function ValPicker() {

    const {ID} = useLocalSearchParams();

    const colorScheme = useColorScheme();

    const styles = colorScheme === "light" ? stylesLight : stylesDark
    return (<View style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colorScheme === "light" ? "white" : "black",
        justifyContent: "center"
    }}>
        <View style={colorScheme === "light" ? {width: "100%", height: 0.2, backgroundColor: "#4C4C4C", opacity: 0.5} : {
            width: "100%",
            backgroundColor: "#ABABAB",
            height: 0.2,
            opacity: 0.5
        }}/>

        <FlatList data={currencies} renderItem={({item}) => (
            <Link onPress={() => changeValue(ID.toString(), item.code).then(res => {
                if (res === null) {
                    Toast.show("Error saving value", Toast.SHORT);
                }
            })} dismissTo href={"/"}>
                <View style={styles.item}>
                    <View style={styles.fullNamePart}>
                        <Text style={styles.itemText}>{item.fullName}</Text>
                    </View>
                    <View style={styles.codePart}>
                        <Text style={styles.itemText}>{item.code}</Text>
                    </View>
                </View>
            </Link>

        )} style={{marginBottom: 12}}
        />

    </View>)
        ;
}

const stylesLight = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
    },
    fullNamePart: {
        marginLeft: 10,
        width: 330 - 56,
    },
    codePart: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#4C4C4C"
    },
});

const stylesDark = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ABABAB',
        flexDirection: 'row',
    },
    fullNamePart: {
        marginLeft: 10,
        width: 330 - 56,
    },
    codePart: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#ABABAB"
    },
});