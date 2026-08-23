import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type HistoryState = {
    historyRates?: { [key: string]: number };
    historyInterval: number;
    timestamp?: string;
    setHistoryRates: (newRates: { [key: string]: number }) => void;
    setHistoryInterval: (newInterval: number) => void;
}

export const useHistoryStore = create<HistoryState>()(
    persist((set) => ({
        historyInterval: -1,
        setHistoryInterval: (newInterval: number) => void set({ historyInterval: newInterval }),
        setHistoryRates: (newRates: { [key: string]: number }) => void set({
            historyRates: newRates,
            timestamp: Date.now().toString()
        })
    }), {
        name: "historyRates",
        storage: createJSONStorage(() => AsyncStorage)
    })
)