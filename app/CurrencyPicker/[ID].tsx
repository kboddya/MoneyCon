import { router, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
import HeaderWithSearch from "@/components/common/HeaderWithSearch";
import PageContainer from "@/components/common/PageContainer";
import { useThemeContext } from "@/context/ThemeContext";
import CurrencyList from "@/features/currencyList/";
import useCurrencySearch from "@/features/currencyList/hooks/useCurrencySearch";
import { useCurrencyStore } from "@/stores";

export default function ValPicker() {
	const params = useLocalSearchParams() as { ID?: string };

	const { colors } = useThemeContext();

	const { selectCurrencyValue } = useCurrencyStore();

	const { currencyList, searchedData, searchHandler } = useCurrencySearch();

	const headerHeight = useHeaderHeight();

	const ID = params?.ID ?? 0;

	const idInInt = Number(ID ?? NaN);

	const onSelectHandler = (toUpdate: string[]): void => {
		if (!Number.isNaN(idInInt)) {
			selectCurrencyValue(toUpdate[0], idInInt);
		}
		return router.back();
	};

	return (
		<PageContainer blurEdges={["top"]} style={{ alignItems: "center" }}>
			<HeaderWithSearch
				title="Select currency"
				searchPlaceholder="Search currency..."
				searchHandler={searchHandler}
				searchable={!!currencyList?.length}
			/>
			{currencyList && (
				<CurrencyList
					data={searchedData !== undefined ? searchedData : currencyList}
					onSelect={onSelectHandler}
					isSearching={searchedData !== undefined}
				/>
			)}
		</PageContainer>
	);
}
