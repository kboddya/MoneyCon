import { useMemo } from "react";
import useExchangeRateContext from "@/stores/ExchangeRateStore";
import useCurrencyContext from "@/stores/CurrencyStore";

type ExchangeRateTableType = {
    currencyCode: string;
    currentVal: string;
    percentVal: string;
}[] | undefined;

export default function useExchangeRateTable() {
    const {
        historyRates,
        exchangeRates,
        historyDiapason
    } = useExchangeRateContext();

    const { selectedCurrencyCodes } = useCurrencyContext()

    const table = useMemo((): ExchangeRateTableType => {
        if (!exchangeRates || !historyRates || (!historyDiapason || historyDiapason <= 0)) return undefined;
        const calculateValues = (data: any, value: string) => {
            return (1 / (data[value.toLowerCase()] ?? 1) * (data[selectedCurrencyCodes[0].toLowerCase()] ?? 1));
        }

        return selectedCurrencyCodes.slice(1).filter(val => !!(val?.trim()) && val !== "?").map((currencyCode) => {
            const percent = (100 - (100 * calculateValues(historyRates, currencyCode) / calculateValues(exchangeRates, currencyCode)));
            return {
                currencyCode,
                currentVal: calculateValues(exchangeRates, currencyCode).toFixed(2),
                percentVal: (Number.parseFloat(percent.toFixed(2)) > 0 ? "+" : "") + Number.parseFloat(percent.toFixed(2)).toFixed(2) + "%",
            }
        }) || undefined
    }, [exchangeRates, historyRates, selectedCurrencyCodes, historyDiapason]);

    return { table: table as ExchangeRateTableType, mainCurrencyCode: selectedCurrencyCodes[0] }
}

export { ExchangeRateTableType };