import { Stack } from 'expo-router';
import {Text, View} from 'react-native';

export default function apiKeySettings() {
    return(
        <View>
            <Stack.Screen options={{
                title: "Settings",
                headerTitleAlign: "center",
            }}>
            </Stack.Screen>
            <Text>Api</Text>
        </View>
    );
}