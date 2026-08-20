import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import { Key, ReactNode } from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";

interface DataColProps {
    data: string[];
    key?: Key;
    style?: ViewStyle;
    textStyle?: TextStyle
}

function DataCol({ data, key, style, textStyle }: DataColProps) {
    const { colors } = useThemeContext();
    return (
        <View style={{ ...style, flex: 2, flexDirection: "row" }}>
            {data.map((val, index) => (
                <View style={{ flex: 1 }} key={`${val}-${index}-${key}`}>
                    <Text style={{
                        ...textStyle,
                        color: colors.mainText,
                        fontSize: sizes.fontSizeMedium,
                        textAlign: "center"
                    }}>
                        {val}
                    </Text>
                </View>
            ))}
        </View >
    );
}

export default DataCol;