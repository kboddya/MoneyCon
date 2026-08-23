import { BlurView } from "expo-blur";
import type { ReactNode } from "react";
import { View } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

function Container({ children }: { children: ReactNode }) {
	const { colors } = useThemeContext();
	return (
		<View
			style={{
				backgroundColor: colors.containerBg,
				shadowOffset: { width: 0, height: 10 },
				shadowRadius: 10,
				shadowOpacity: 0.25,
				marginBottom: 20,
				shadowColor: colors.headerTint,
				elevation: 5,
				width: "100%",
				marginTop: "4.6%",
				borderRadius: 10,
				paddingHorizontal: "6%",
				paddingVertical: "5.2%",
			}}
		>
			{children}
			<BlurView />
		</View>
	);
}

export default Container;
