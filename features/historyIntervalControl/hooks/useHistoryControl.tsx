import { useHistoryStore } from "@/stores";
import { getIndexByHistoryInterval, getHistoryIntervalByIndex } from "../utils";
import { ApiError, getExchangeRatesFromApi } from "@/services";
import { Toast } from "toastify-react-native";

function useHistoryControl() {
    const { setHistoryInterval, historyInterval, setHistoryRates } = useHistoryStore();

    const currentIntervalIndex = getIndexByHistoryInterval(historyInterval);

    const changeInterval = (index: number = -1) => {
        const interval = getHistoryIntervalByIndex(index);
        setHistoryInterval(interval);
        if (interval !== 0) {
            getExchangeRatesFromApi(interval).then((res) => {
                setHistoryRates(res.eur);
            }).catch((e) => {
                const error = e as unknown as ApiError;
                Toast.show({
                    type: "error",
                    text1: error.name,
                    text2: error.message
                });
            });
        }
    }

    return [currentIntervalIndex, changeInterval] as const;
}

export default useHistoryControl;