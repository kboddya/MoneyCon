import {StyleSheet} from "react-native";

export const stylesLight = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
        width: "100%",
    },
    fullNamePart: {
        marginLeft: 10,
        width: "82%",
    },
    codePart: {
        width: "18%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#4C4C4C"
    },
});

export const stylesDark = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ABABAB',
        flexDirection: 'row',
        width: "100%",
    },
    fullNamePart: {
        marginLeft: 10,
        width: "82%",
    },
    codePart: {
        width: "18%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 18,
        color: "#ABABAB"
    },
});