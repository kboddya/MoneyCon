import { useMemo } from "react";
import { useCurrencyStore, useExchangeRateStore, useHistoryStore } from "@/stores";
import { ExchangeRateTableType } from "../types";

export default function useExchangeRateTable() {
    const { exchangeRates } = useExchangeRateStore();

    const { historyInterval, historyRates } = useHistoryStore();

    const { selectedCurrencyCodes } = useCurrencyStore()

    const table = useMemo((): ExchangeRateTableType => {
        if (!exchangeRates || !historyRates || (!historyInterval || historyInterval <= 0)) return undefined;
        const calculateValues = (data: any, value: string) => {
            return (1 / (data[value] ?? 1) * (data[selectedCurrencyCodes[0]] ?? 1));
        }

        return selectedCurrencyCodes.slice(1).filter(val => !!(val?.trim()) && val !== "?").map((currencyCode) => {
            const percent = (100 - (100 * calculateValues(historyRates, currencyCode) / calculateValues(exchangeRates, currencyCode)));
            return {
                currencyCode,
                currentVal: calculateValues(exchangeRates, currencyCode).toFixed(2),
                percentVal: (Number.parseFloat(percent.toFixed(2)) > 0 ? "+" : "") + Number.parseFloat(percent.toFixed(2)).toFixed(2) + "%",
            }
        }) || undefined
    }, [exchangeRates, historyRates, selectedCurrencyCodes]);

    return { table: table as ExchangeRateTableType, mainCurrencyCode: selectedCurrencyCodes[0] }
}