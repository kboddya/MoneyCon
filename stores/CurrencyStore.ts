import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeSelectedLength, selectCurrency } from "@/utils/currencyUtils";

type CurrencyContextState = {
    selectedCurrencyCodes: string[];
    changeCurrencyCount: (val: number) => void;
    selectCurrencyValue: (newValue: string, index: number) => void;
    currencyList?: string[][];
    setCurrencyList: (newCurrencyList: string[][]) => void;
    timestamp?: string
}

export const useCurrencyStore = create<CurrencyContextState>()(
    persist(
        (set) => ({
            selectedCurrencyCodes: Array<string>(4).fill(""),
            selectCurrencyValue: ((newValue: string, index: number) =>
                set(({ selectedCurrencyCodes }) =>
                    ({ selectedCurrencyCodes: selectCurrency(selectedCurrencyCodes, newValue, index) })
                )
            ),
            changeCurrencyCount: (val: number) => {
                set((state) => {
                    return { selectedCurrencyCodes: changeSelectedLength(state.selectedCurrencyCodes, val) };
                })
            },
            setCurrencyList: (newCurrencyList: string[][]) => void set({
                currencyList: newCurrencyList,
                timestamp: Date.now().toString()
            })
        }),
        {
            name: "selected-currency-codes",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)