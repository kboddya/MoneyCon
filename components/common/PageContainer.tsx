import { useHeaderHeight } from "expo-router/react-navigation";
import type { ReactNode } from "react";
import { KeyboardAvoidingView, View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "@/context/ThemeContext";

interface PageContainerProps {
	children: ReactNode;
	blurAnimatedStyles?: Partial<ViewStyle>;
	blurEdges?: ("bottom" | "top")[];
	style?: ViewStyle;
}

function PageContainer({
	children,
	blurAnimatedStyles,
	blurEdges,
	style,
}: PageContainerProps) {
	const { colors } = useThemeContext();
	const headerHeight = useHeaderHeight();
	const safeAreaHeigh = useSafeAreaInsets().bottom;

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors.appColor,
				...style,
			}}
		>
			<Animated.View
				style={[
					blurEdges?.includes("top") && {
						shadowOffset: { width: 0, height: 7 },
						shadowRadius: 7,
						shadowColor: colors.appColor,
						elevation: 10,
						zIndex: 2,
					},
					{
						backgroundColor: colors.appColor,
						height: headerHeight,
					},
					blurAnimatedStyles || { shadowOpacity: 1 },
				]}
			/>
			<KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
				{children}
			</KeyboardAvoidingView>
			<View
				style={[
					{
						height: safeAreaHeigh,
						backgroundColor: colors.appColor,
					},
					blurEdges?.includes("bottom") && {
						shadowOffset: { width: 0, height: -7 },
						shadowRadius: 7,
						shadowOpacity: 1,
						shadowColor: colors.appColor,
						elevation: 10,
						zIndex: 2,
					},
				]}
			/>
		</View>
	);
}

export default PageContainer;
