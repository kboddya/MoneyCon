import {StyleSheet} from "react-native";

export const stylesLight = StyleSheet.create({
    inputContainer: {
        marginTop: 17,
        height: "5.9%",
        width: "80%",
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        justifyContent: "center"
    },

    historyContainer: {
        width: "80%",
        height: "5.8%",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#EFEFEF",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    historyValue: {
        fontSize: 18,
        color: "#4C4C4C",
    },

    text: {
        color: "#4C4C4C",
    },

    headerText: {
        marginTop: 15,
        fontSize: 19,
        fontWeight: "semibold",
        color: "#4C4C4C"
    }
});

export const stylesDark = StyleSheet.create({
    inputContainer: {
        marginTop: 17,
        height: "5.9%",
        width: "80%",
        backgroundColor: "#272525",
        borderRadius: 10,
        justifyContent: "center"
    },

    historyContainer: {
        width: "80%",
        height: "5.8%",
        backgroundColor: "#000000",
        borderWidth: 1,
        borderColor: "#272525",
        borderRadius: 10,
        padding: 0,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    historyValue: {
        fontSize: 18,
        color: "#ABABAB",
    },

    text: {
        color: "#ABABAB",
    },

    headerText: {
        marginTop: 15,
        fontSize: 19,
        fontWeight: "semibold",
        color: "#ABABAB"
    }
});