import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import useRatesUpdater from "@/hooks/useRatesUpdater";
import useUpdateAt from "@/hooks/useUpdateAt";
import { computeUpdateAtMessage } from "../utils";

function UpdateAt() {
	const { colors } = useThemeContext();
	const [updatedMessage, setMessage] = useState<string>("never");
	const [, updateAll] = useRatesUpdater();

	const updateAtDate = useUpdateAt();

	useEffect(() => {
		setMessage(computeUpdateAtMessage(updateAtDate));
		const id = setInterval(
			() => setMessage(computeUpdateAtMessage(updateAtDate)),
			60_000,
		);
		return () => clearInterval(id);
	}, [updateAtDate]);

	if (!updatedMessage) return;

	return (
		<Pressable
			style={({ pressed }) =>
				pressed
					? { opacity: 0.8, transform: [{ scale: 0.99 }] }
					: { opacity: 1 }
			}
			onPress={() => updateAll()}
		>
			<Text
				style={{
					color: colors.tint,
					fontSize: sizes.fontSizeSmall,
					marginTop: "2%",
					marginBottom: "2%",
				}}
			>
				Updated: {updatedMessage}
			</Text>
		</Pressable>
	);
}

export default UpdateAt;
