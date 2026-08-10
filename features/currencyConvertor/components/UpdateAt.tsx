import useExchangeRateContext from "@/stores/ExchangeRateStore";
import { useThemeContext } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { getDifferenceInHours, parseTimestampToDate } from "@/utils/dateUtils";
import { sizes } from "@/constants/sizes";

function UpdateAt() {
    const { timestamp } = useExchangeRateContext();
    const { colors } = useThemeContext()
    const [updatedMessage, setMessage] = useState<string>("never");

    const recompute = () => {
        const lastUpdated = parseTimestampToDate(timestamp);
        if (!lastUpdated) setMessage("never");
        else {
            const dif = getDifferenceInHours(lastUpdated, new Date()).toFixed(0);
            setMessage(`${dif} hours ago`);
        }
    }

    useEffect(() => {
        recompute();
        const id = setInterval(recompute, 60_000);
        return () => clearInterval(id);
    }, [timestamp]);

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