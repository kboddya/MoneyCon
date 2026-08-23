import MoreHoriz from "@expo/material-symbols/more_horiz.xml";
import { router, Stack } from "expo-router";
import { Platform, RefreshControl } from "react-native";
import Animated, {
	interpolate,
	useAnimatedProps,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import HeaderTitle from "@/components/common/HeaderTitle";
import PageContainer from "@/components/common/PageContainer";
import CurrencyConvertorRows from "@/features/currencyCalculate";
import ExchangeRateTable from "@/features/exchangeRateTable";
import UpdateAt from "@/features/updateAt";
import useRatesUpdater from "@/hooks/useRatesUpdater";

export default function Index() {
	const [isLoading, updateExchangeRates] = useRatesUpdater();
	const scrollY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	const blurOpacityAnimation = useAnimatedProps(() => {
		const opacity = interpolate(scrollY.value, [0, 10], [0, 1], "clamp");

		return {
			shadowOpacity: opacity,
		};
	});

	return (
		<PageContainer
			blurAnimatedStyles={blurOpacityAnimation}
			blurEdges={["bottom", "top"]}
		>
			<HeaderTitle title={"MoneyCon"} />
			<Stack.Toolbar placement="right">
				<Stack.Toolbar.Button
					icon={Platform.OS === "android" ? MoreHoriz : "ellipsis"}
					onPress={() => router.push("/Settings")}
				/>
			</Stack.Toolbar>
			<Animated.ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: "center",
					paddingHorizontal: "7%",
				}}
				keyboardDismissMode={"interactive"}
				refreshControl={
					<RefreshControl
						refreshing={isLoading}
						onRefresh={updateExchangeRates}
					/>
				}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<UpdateAt />
				<CurrencyConvertorRows />
				<ExchangeRateTable />
			</Animated.ScrollView>
		</PageContainer>
	);
}
