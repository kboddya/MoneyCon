import { useHeaderHeight } from "expo-router/react-navigation";
import { ScrollView } from "react-native";
import HeaderTitle from "@/components/common/HeaderTitle";
import PageContainer from "@/components/common/PageContainer";
import { useThemeContext } from "@/context/ThemeContext";
import AppearanceModeControl from "@/features/appearanceModeControl";
import CurrencyCounter from "@/features/currencyCountControl/components/CurrencyCounter";
import HistoryIntervalControl from "@/features/historyIntervalControl/components/HistoryIntervalControl";

export default function SettingsScreen() {
	const { colors } = useThemeContext();
	return (
		<PageContainer>
			<HeaderTitle title="Settings" headerBackTitle="Back" />
			<ScrollView
				style={{ paddingHorizontal: "7%", backgroundColor: colors.appColor }}
			>
				<CurrencyCounter />
				<HistoryIntervalControl />
				<AppearanceModeControl />
			</ScrollView>
		</PageContainer>
	);
}
