import { useCurrencyStore } from "@/stores";

function useCurrencyCount() {
	const { selectedCurrencyCodes, currencyList, changeCurrencyCount } =
		useCurrencyStore();

	const count = selectedCurrencyCodes.length;

	const maxValue = currencyList?.length ?? 0;

	const addCurrencyCountHandler = (val: number): void => {
		if (count + val < 2 || maxValue <= count) return;
		changeCurrencyCount(count + val);
	};

	const resetCounter = () => {
		changeCurrencyCount(4);
	};

	return { count, maxValue, addCurrencyCountHandler, resetCounter } as const;
}

export default useCurrencyCount;
