import { type NativeStackNavigationOptions, Stack } from "expo-router";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";

function HeaderTitle({ title, ...props }: NativeStackNavigationOptions) {
	const { colors } = useThemeContext();
	return (
		<Stack.Screen
			options={{
				title,
				headerTitleStyle: {
					color: colors.mainText,
					fontSize: sizes.appHeaderSize,
				},
				headerTintColor: colors.mainText,
				headerStyle: { backgroundColor: colors.appColor },
				...props,
			}}
		/>
	);
}

export default HeaderTitle;
