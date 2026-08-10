import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";

type CurrencyContextState = {
    selectedCurrencyCodes: string[];
    currencyCount: number;
    addCurrencyCount: (val: number) => void;
    selectCurrencyValue: (newValue: string, index: number) => void;
}

const selectCurrency = (current: string[], newValue: string, index: number): string[] => {
    const next = [...current];
    next[index] = newValue;
    return next;
}

const changeSelectedLength = (currentArray: string[], newLength: number): string[] => {
    if (newLength < 0) return currentArray;

    currentArray.length = newLength
    return [...currentArray];

}

const useCurrencyContext = create<CurrencyContextState>()(
    persist(
        (set) => ({
            selectedCurrencyCodes: Array<string>(4),
            selectCurrencyValue: ((newValue: string, index: number) =>
                set(({ selectedCurrencyCodes }) =>
                    ({ selectedCurrencyCodes: selectCurrency(selectedCurrencyCodes, newValue.toUpperCase(), index) })
                )
            ),
            addCurrencyCount: (val: number) => {
                set((state) => {
                    if (state.currencyCount + val <= 0) return { currencyCount: 4, selectedCurrencyCodes: changeSelectedLength(state.selectedCurrencyCodes, 4) }
                    else if (state.currencyCount + val < 2) return {};
                    return { currencyCount: state.currencyCount + val, selectedCurrencyCodes: changeSelectedLength(state.selectedCurrencyCodes, state.currencyCount + val) };
                })
            },
            currencyCount: 4
        }),
        {
            name: "selected-currency-codes",
            partialize: (state) => ({
                selectedCurrencyCodes: state.selectedCurrencyCodes,
                currencyCount: state.currencyCount
            }),

            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)

export default useCurrencyContext;