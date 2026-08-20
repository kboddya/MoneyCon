import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExchangeRateType } from "@/types/exchangeRateTypes";


type ExchangeRateState = {
    timestamp?: string;
    setExchangeRates: (newRates: ExchangeRateType) => void;
    exchangeRates?: ExchangeRateType;
}


export const useExchangeRateStore = create<ExchangeRateState>()(
    persist(
        (set) => ({
            setExchangeRates: (newRates: ExchangeRateType) => void set({
                exchangeRates: newRates,
                timestamp: Date.now().toString()
            })
        }),
        {
            name: "exchange-rate",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)