import { ReactNode } from "react";
import { View } from "react-native";


function SettingsParameterContainer({ children }: { children: ReactNode }) {
    const isPrimitive = typeof children === 'string' || typeof children === 'number'
    return (
        <View style={{ marginHorizontal: '7%', marginVertical: '3%' }}>
            {!isPrimitive && children}
        </View>
    )
}

export default SettingsParameterContainer;