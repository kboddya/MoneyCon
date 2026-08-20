import { useCurrencyStore } from "@/stores";

function useCurrencyCount() {
    const { selectedCurrencyCodes, currencyList, changeCurrencyCount } = useCurrencyStore();

    const count = selectedCurrencyCodes.length;

    const maxValue = currencyList?.length ?? 0;

    const addCurrencyCountHandler = (val: number = 0): void => {
        if (val === 0) return changeCurrencyCount(4);
        if (count + val < 2 || maxValue <= count) return;
        changeCurrencyCount(count + val);
    }

    return [count, maxValue, addCurrencyCountHandler] as const;
}

export default useCurrencyCount;