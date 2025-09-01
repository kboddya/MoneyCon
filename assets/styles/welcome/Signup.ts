import {StyleSheet} from "react-native";

export const stylesLight = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4C4C4C',
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
        marginHorizontal: 7,
    },
});

export const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ABABAB',
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
        marginHorizontal: 7,
    }
})