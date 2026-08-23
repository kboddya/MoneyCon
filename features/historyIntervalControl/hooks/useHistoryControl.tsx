import { Toast } from "toastify-react-native";
import { type ApiError, getExchangeRatesFromApi } from "@/services";
import { useHistoryStore } from "@/stores";
import { getHistoryIntervalByIndex, getIndexByHistoryInterval } from "../utils";

function useHistoryControl() {
	const { setHistoryInterval, historyInterval, setHistoryRates } =
		useHistoryStore();

	const currentIntervalIndex = getIndexByHistoryInterval(historyInterval);

	const changeInterval = (index: number = -1) => {
		const interval = getHistoryIntervalByIndex(index);
		setHistoryInterval(interval);
		if (interval !== -1) {
			getExchangeRatesFromApi(interval)
				.then((res) => {
					setHistoryRates(res.eur);
				})
				.catch((e) => {
					const error = e as unknown as ApiError;
					Toast.show({
						type: "error",
						text1: error.name,
						text2: error.message,
					});
				});
		}
	};

	return [currentIntervalIndex, changeInterval] as const;
}

export default useHistoryControl;
