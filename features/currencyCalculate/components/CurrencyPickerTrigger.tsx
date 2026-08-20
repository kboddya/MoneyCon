import useScalable from "@/hooks/useScalable";
import { memo, PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface CurrencyPickerTriggerProps {
    onPress: () => void;
}

const CurrencyPickerTrigger = memo(({ children, onPress }: PropsWithChildren<CurrencyPickerTriggerProps>) => {
    const { scaleFont } = useScalable();
    return (

        <View style={[styles.currencyPicker,
        { width: scaleFont(60), }
        ]} >
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.currencyHitBox,
                    pressed ? { opacity: 0.8, transform: [{ scale: 0.95 }] } : { opacity: 1 },
                ]} >
                {children}
            </Pressable>
        </View>
    )
});

export default CurrencyPickerTrigger;

const styles = StyleSheet.create({
    currencyPicker: {
        borderWidth: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: "4%",
    },

    currencyHitBox: {
        justifyContent: "center",
        alignItems: "center",
    },
})