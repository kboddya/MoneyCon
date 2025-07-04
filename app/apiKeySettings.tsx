import {Link, Stack} from 'expo-router';
import {Text, View, StyleSheet, TextInput} from 'react-native';

export default function apiKeySettings() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
            }}>
            <Stack.Screen options={{
                title: "Settings",
                headerTitleAlign: "center",
            }}>
            </Stack.Screen>
            <View style={styles.inputContainer}>
                <TextInput
                    style={{paddingLeft: 10, fontSize: 18}}
                    placeholder="Enter your API key here"
                    keyboardType="default"
                />
            </View>

            <Text style={{marginTop: 10, color: "#4C4C4C"}}>
                You can get your API key from <Link href={"https://exchangeratesapi.io/"} style={{color: "blue"}}>exchangerates</Link>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 31,
        height: 50,
        width: 330,
        backgroundColor: "#EFEFEF",
        borderRadius: 10
    }
});