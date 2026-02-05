import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboard() {
    const [keyboardMargin, setKeyboardMargin] = useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardMargin(e.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardMargin(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])

    return keyboardMargin;
}