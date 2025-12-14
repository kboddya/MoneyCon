import { Text, useColorScheme, View } from "react-native";
import { useState } from "react";
import { stylesDark, stylesLight } from "@/styles/welcome/Signup";
import { Link } from "expo-router";

export default function Signup() {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const ColorScheme = useColorScheme();
    const buttons = () => {
        if (isSigningUp) return (
            <Link href={"/(welcome)/Settings"} style={styles.button} onPress={() => setIsSigningUp(false)}>
                Continue
            </Link>
        );
        else return (
            <View style={styles.buttonContainer}>
                <Link
                    href={"https://manage.exchangeratesapi.io/login?u=https%3A%2F%2Fmanage.exchangeratesapi.io%2Fdashboard"}
                    style={styles.button} onPress={() => setIsSigningUp(true)}>
                    Log In
                </Link>
                <Link href={"https://manage.exchangeratesapi.io/signup/free"} style={styles.button}
                    onPress={() => setIsSigningUp(true)}>
                    Sign Up
                </Link>
            </View>
        );
    }
    const styles = ColorScheme === "light" ? stylesLight : stylesDark;
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Sign In to exchange rates API
            </Text>
            <Text style={styles.descriptionText}>
                Create an account to get your free API key and start converting currencies today!
            </Text>
            {buttons()}
        </View>
    );
}