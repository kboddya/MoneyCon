import { Pressable, Text } from "react-native";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";

interface ChangeButtonProps {
	disabled?: boolean;
	title: string;
	onPress: () => void;
}

function ChangeButton({ disabled, title, onPress }: ChangeButtonProps) {
	const { colors } = useThemeContext();
	return (
		<Pressable
			style={({ pressed }) => ({
				flex: 2,
				paddingHorizontal: "auto",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 17,
				backgroundColor: colors.segmentControlTint,
				opacity: disabled ? 0.7 : 1,
				transform: [{ scale: pressed ? 1.02 : 1 }],
				paddingVertical: "3%",
			})}
			disabled={disabled}
			onPress={onPress}
		>
			<Text
				style={{
					color: colors.segmentControlActive,
					fontWeight: "bold",
					fontSize: sizes.fontSizeMedium,
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
}

export default ChangeButton;
