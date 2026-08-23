import { memo, useEffect } from "react";
import { type FocusEvent, StyleSheet, Text, TextInput } from "react-native";
import Animated, {
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import Border from "./Border";
import CurrencyPickerTrigger from "./CurrencyPickerTrigger";

type CurrencyInputRowProps = {
	currencyCode: string | null | undefined;
	data: string;
	onCurrencyPress: () => void;
	onTextChange: (text: string) => Promise<void>;
	onSubmitEditing: () => Promise<void>;
	onFocus: (e: FocusEvent) => void;
	isFocused: boolean;
};

const CurrencyInputRow = memo(
	({ isFocused, onFocus, ...props }: CurrencyInputRowProps) => {
		const { colors } = useThemeContext();

		const scaleAnimation = useAnimatedStyle(
			() => ({
				transform: [
					{ scale: withTiming(isFocused ? 1.04 : 1, { duration: 75 }) },
				],
			}),
			[isFocused],
		);

		return (
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: colors.containerBg,
						shadowColor: colors.headerTint,
						shadowOffset: { width: 0, height: 3 },
						shadowRadius: 5,
						shadowOpacity: 0.25,
						elevation: 8,
					},
					scaleAnimation,
				]}
			>
				<CurrencyPickerTrigger onPress={props.onCurrencyPress}>
					<Text
						style={{
							fontSize: sizes.fontSizeMedium,
							color: colors.mainText,
						}}
					>
						{props.currencyCode?.toUpperCase()}
					</Text>
				</CurrencyPickerTrigger>

				<Border />

				<TextInput
					style={[
						styles.inputBox,
						{
							fontSize: sizes.fontSizeMedium,
							color: colors.mainText,
						},
					]}
					keyboardType="numeric"
					inputMode="decimal"
					placeholder={"Enter amount"}
					value={props.data !== "NaN" ? props.data : ""}
					onFocus={onFocus}
					onChangeText={props.onTextChange}
					onEndEditing={props.onSubmitEditing}
					placeholderTextColor={colors.textPlaceHolder}
					returnKeyType="done"
				/>
			</Animated.View>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginBottom: "4%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
	},

	inputBox: {
		flex: 1,
		borderWidth: 0,
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		paddingHorizontal: "3%",
	},
});

export default CurrencyInputRow;
