import { useThemeContext } from "@/context/ThemeContext";
import { NativeStackNavigationOptions, Stack } from "expo-router";
import { sizes } from "@/constants/sizes";

function HeaderTitle({ title, ...props }: NativeStackNavigationOptions) {
    const { colors } = useThemeContext();
    return (
        <Stack.Screen options={{
            title,
            headerTitleStyle: {
                color: colors.mainText,
                fontSize: sizes.appHeaderSize,
            },
            ...props
        }} />
    );
}

export default HeaderTitle;