import { getHistoryExchangeRatesFromApi, getExchangeRatesFromApi, ExchangeRatesResponse, ApiError, getDifferenceInHours, CurrencyListResponse, getCurrencyList } from "@/services";
import { Toast } from "toastify-react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";


type ExchangeRateState = {
    timestamp?: string;
    updateExchangeRate: () => Promise<void>;
    exchangeRates?: { [key: string]: number; };
    historyRates?: { [key: string]: number; };
    historyDiapason?: number;
    changeDiapasonHandler: (diapason: string) => void;
    isLoading: boolean;
    currencyList?: string[][];
}


const useExchangeRateContext = create<ExchangeRateState>()(
    persist(
        (set, get) => ({
            timestamp: undefined,
            exchangeRates: undefined,
            historyRates: undefined,
            historyDiapason: undefined,
            isLoading: false,
            changeDiapasonHandler: (diapason: string): void => {
                const diapasonInNumber = Number.parseInt(diapason);
                if (isNaN(diapasonInNumber)) return;
                set({ historyDiapason: diapasonInNumber });
                void get().updateExchangeRate();
            },
            updateExchangeRate: async (): Promise<void> => {
                set({ isLoading: true });
                const { historyDiapason = 0 } = get();
                try {

                    const result = await Promise.all([
                        getExchangeRatesFromApi(),
                        getHistoryExchangeRatesFromApi(historyDiapason),
                        getCurrencyList()
                    ]);

                    set({
                        exchangeRates: result[0].eur,
                        historyRates: result[1].eur,
                        currencyList: Object.entries(result[2]),
                        timestamp: Date.now().toString(),
                        isLoading: false
                    });
                }
                catch (e) {
                    set({ isLoading: false });

                    const error: ApiError = e as unknown as ApiError
                    Toast.show({
                        type: "error",
                        text1: error.title,
                        text2: error.message
                    })
                }
            }
        }),
        {
            name: "exchange-rate",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                timestamp: state.timestamp,
                exchangeRates: state.exchangeRates,
                historyRates: state.historyRates,
                historyDiapason: state.historyDiapason,
                currencyList: state.currencyList
            }),
            onRehydrateStorage: () => (state) => {
                const missing = Object.entries(state ?? {}).some(([k, v]) => k !== 'isLoading' && k !== "historyDiapason" && v == null);
                const stale = !state?.timestamp || getDifferenceInHours(new Date(Number.parseInt(state.timestamp)), new Date()) >= 24;
                if (missing || stale) useExchangeRateContext.getState().updateExchangeRate();
            }
        }
    )
)

export default useExchangeRateContext;