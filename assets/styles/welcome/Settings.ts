import {StyleSheet} from "react-native";

export const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4C4C4C',
    },
    label: {
        fontSize: 19,
        color: '#4C4C4C',
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: '#4C4C4C',
        marginBottom: "10%",
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#4C4C4C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
    },
    inputContainer: {
        justifyContent: "flex-start",
        width: '80%',
        alignItems: "flex-start",
    },
    input: {
        width: '100%',
        paddingLeft: 10,
        color: '#4C4C4C',
    },
});

export const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ABABAB',
    },
    label: {
        fontSize: 19,
        color: '#ABABAB',
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: '#ABABAB',
        marginBottom: "10%",
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#ABABAB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 16,
        color: 'black',
    },
    inputContainer: {
        justifyContent: "flex-start",
        width: '80%',
        alignItems: "flex-start",
    },
    input: {
        width: '100%',
        paddingLeft: 10,
        color: '#ABABAB',
    },
})