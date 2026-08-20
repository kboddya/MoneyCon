import { useThemeContext } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { sizes } from "@/constants/sizes";
import useUpdateAt from "@/hooks/useUpdateAt";
import { computeUpdateAtMessage } from "../utils";

function UpdateAt() {
    const { colors } = useThemeContext()
    const [updatedMessage, setMessage] = useState<string>("never");

    const updateAtDate = useUpdateAt();

    useEffect(() => {
        setMessage(computeUpdateAtMessage(updateAtDate));
        const id = setInterval(() =>
            setMessage(computeUpdateAtMessage(updateAtDate)),
            60_000
        );
        return () => clearInterval(id);
    }, [updateAtDate]);

    return (
        updatedMessage && <Text
            style={
                [
                    styles.updated,
                    {
                        color: colors.tint,
                        fontSize: sizes.fontSizeSmall
                    }
                ]
            } > Updated: {updatedMessage}
        </Text >
    );
}

const styles = StyleSheet.create({
    updated: {
        marginTop: "2%",
        marginBottom: "2%",
    },
});

export default UpdateAt;