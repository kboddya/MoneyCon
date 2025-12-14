import { Alert, useColorScheme, View, Text, TextInput, TouchableOpacity } from "react-native";
import { use, useContext, useEffect, useState } from "react";
import ToastProvider, { Toast } from "toastify-react-native";
import { errorDescription } from "@/services/helper";
import { stylesLight, stylesDark } from "@/styles/welcome/Settings";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";


export default function Settings() {
    const [value, setValue] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isPasteble, setIsPasteble] = useState(false);

    const { setApiKeyAsync } = useContext(AuthContext);

    const ColorScheme = useColorScheme();
    const styles = ColorScheme === "light" ? stylesLight : stylesDark;

    const elements = () => {
        if (!isSaved) return (
            <>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>API Key</Text>

                    <TextInput
                        value={value}
                        placeholder={"Please enter your API key"}
                        onChangeText={(value) => setValue(value)}
                        style={styles.input}
                        autoCorrect={false}
                        keyboardType={"default"}
                        scrollEnabled={false}
                    />
                </View>
                <Text onPress={() => addApiKey()} style={styles.button}>
                    Save API Key
                </Text>
                <ToastProvider
                    showCloseIcon={false}
                    position="bottom"
                    theme={ColorScheme === "light" ? "light" : "dark"}
                    duration={5000}
                />
            </>
        );
        else return (
            <>
                <Text style={styles.welcomeText}>Success!</Text>
                <Text style={styles.descriptionText}>You can now start using the app.</Text>
                <Text style={styles.button} onPress={() => router.dismissAll()}>
                    Go to App
                </Text>
            </>
        );
    }

    const getClipboardText = async () => {
        return await Clipboard.getStringAsync();
    }

    useEffect(() => {
        if (Clipboard.isPasteButtonAvailable) {
            getClipboardText().then(clip => {
                if (clip.length >= 30 && clip.length <= 40) setIsPasteble(true);
            });
        }
    }, []);

    useEffect(() => {
        if (isPasteble) {
            Alert.alert("Paste API key?", "We found a text in your clipboard that looks like an API key. Do you want to paste it?", [
                {
                    text: "No",
                    onPress: () => setIsPasteble(false)
                },
                {
                    text: "Yes",
                    onPress: () => {
                        getClipboardText().then(clip => {
                            setValue(clip);
                            setIsPasteble(false);
                            addApiKey();
                        });
                    }
                }
            ]);
        }
    }, [isPasteble]);

    const addApiKey = () => {
        setApiKeyAsync(value).then(res => {
            if (res.ok) {
                setIsSaved(true);
            }
        });
    }

    return (
        <View style={styles.container}>
            {elements()}
        </View>
    );
}