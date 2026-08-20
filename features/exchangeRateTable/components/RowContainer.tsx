import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

function RowContainer({ children, style }: { children: ReactNode, style?: ViewStyle }) {
    return (
        <View style={{ ...style, justifyContent: "space-between", flexDirection: "row" }}>
            {children}
        </View>
    );
}

export default RowContainer;