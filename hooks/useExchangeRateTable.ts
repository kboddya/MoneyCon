import { useState, useContext, useEffect } from "react";
import { ExchangeRateContext } from "@/context/ExchangeRateContext";

type ExchangeRateTableType = {
    currencyCode: string;
    currentVal: string;
    percentVal: string;
}[];

export default function useExchangeRateTable() {
    const {
        currentCurrencyCodes,
        exchangeRates,
        historycalRates,
        exchangeRateUpdateTimestamp
    } = useContext(ExchangeRateContext);

    const [table, setTable] = useState<ExchangeRateTableType>([]);

    const calculateTable = async () => {
        if (!exchangeRates || !historycalRates || !historycalRates.rates || !currentCurrencyCodes) return;
        const calculateValues = (data: any, value: string) => {
            return (1 / (data[value.toLowerCase()] ?? 1) * (data[currentCurrencyCodes[0].toLowerCase()] ?? 1));
        }

        const historyRates = JSON.parse(historycalRates.rates);

        setTable(currentCurrencyCodes.slice(1, currentCurrencyCodes.length).map((currencyCode) => {
            const percent = (100 - (100 * calculateValues(historyRates, currencyCode) / calculateValues(exchangeRates, currencyCode)));
            return {
                currencyCode,
                currentVal: calculateValues(exchangeRates, currencyCode).toFixed(2),
                percentVal: (Number.parseFloat(percent.toFixed(2)) > 0 ? "+" : "") + Number.parseFloat(percent.toFixed(2)).toFixed(2) + "%",
            }
        }))
    }

    useEffect(() => {
        calculateTable();
    }, [exchangeRateUpdateTimestamp, currentCurrencyCodes, exchangeRates, historycalRates]);

    return table as ExchangeRateTableType;
}

export { ExchangeRateTableType };