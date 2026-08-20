import { useExchangeRateStore, useHistoryStore } from "@/stores";

function useUpdateAt() {
    const { timestamp: currentRatesTimestamp } = useExchangeRateStore();
    const { timestamp: historyRatesTimestamp } = useHistoryStore();

    const currentRatesTimestampNumber = Number.parseInt(currentRatesTimestamp ?? "0");
    const historyRatesTimestampNumber = Number.parseInt(historyRatesTimestamp ?? new Date().getTime().toString());

    const updatedAtDate = new Date(Math.min(currentRatesTimestampNumber, historyRatesTimestampNumber));

    return updatedAtDate;
}

export default useUpdateAt;