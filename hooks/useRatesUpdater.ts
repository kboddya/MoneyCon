import { ApiError, getCurrencyList, getExchangeRatesFromApi } from "@/services";
import { useExchangeRateStore, useCurrencyStore, useHistoryStore } from "@/stores";
import { getDifferenceInHours } from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import { Toast } from "toastify-react-native";
import useUpdateAt from "./useUpdateAt";

function useRatesUpdater() {
    const { setExchangeRates } = useExchangeRateStore();
    const { setHistoryRates, historyInterval } = useHistoryStore();
    const { setCurrencyList } = useCurrencyStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updatedAtDate = useUpdateAt()

    const updateAll = async (force: boolean = true): Promise<void> => {
        const toUpdate = force || getDifferenceInHours(updatedAtDate, new Date()) >= 24;
        if (toUpdate) {
            setIsLoading(true);
            try {
                const results = await Promise.all([
                    getCurrencyList(),
                    getExchangeRatesFromApi(),
                    !!historyInterval ? getExchangeRatesFromApi(historyInterval) : undefined
                ])
                setCurrencyList(Object.entries(results[0]));
                setExchangeRates(results[1].eur);
                if (results[2]) setHistoryRates(results[2].eur);
            } catch (e) {
                const error = e as unknown as ApiError;
                Toast.show({
                    type: "error",
                    text1: error.title,
                    text2: error.message
                })
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        updateAll(false);
    }, [])

    return [isLoading, updateAll] as const;
}

export default useRatesUpdater;