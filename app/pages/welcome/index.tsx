import {useColorScheme, View, Text, Button} from "react-native";
import {stylesLight, stylesDark} from "@/assets/styles/welcome";
import {Link, router, Stack} from "expo-router";

export default function Index() {
    const colorScheme = useColorScheme();
    const styles = colorScheme === "light" ? stylesLight : stylesDark;
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
            }}/>
            <Text style={styles.welcomeText}>
                Welcome to MoneyCon
            </Text>
            <Text style={styles.descriptionText}>
                Simple way to convert on currency to another
            </Text>
            <Link href={"/pages/welcome/Signup"} style={styles.button}>
                Get Started
            </Link>
        </View>
    );
}