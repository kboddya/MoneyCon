import { useState, useContext, useEffect, useCallback, useMemo } from "react";
import useExchangeRateContext from "@/stores/ExchangeRateStore";
import useCurrencyContext from "@/stores/CurrencyStore";

const toUpdate = (text: string): boolean => {
    if (text.includes("-") ||
        (text.split(".").length - 1) + (text.split(",").length - 1) > 1 ||
        Number.isNaN(Number(text))) return false;
    return true;
}

export default function useCurrencyCalc() {
    const [data, setData] = useState<string[]>([]);
    const [focusedBox, setFocusedBox] = useState(-1);

    const { exchangeRates } = useExchangeRateContext();
    const { selectedCurrencyCodes } = useCurrencyContext();

    const exchangeRatesOfCurrentCurrency = useMemo(() => {
        if (selectedCurrencyCodes.length > 0 && exchangeRates) {
            return selectedCurrencyCodes.map(code => exchangeRates[code?.toLowerCase()]);
        }
    }, [exchangeRates, selectedCurrencyCodes]);

    const baseRate = (1 / (exchangeRatesOfCurrentCurrency?.[focusedBox] ?? 1))


    useEffect(() => {
        setData([]);
    }, [selectedCurrencyCodes])

    const onTextChangeHandler = async (text: string, retry: boolean = true): Promise<void> => {
        if (focusedBox === -1) return retry ? onTextChangeHandler(text, false) : Promise.resolve();
        if (text === "." || text === ",") text = "0" + text;
        if (!toUpdate(text)) return Promise.resolve();
        const updatedData = [...data];
        updatedData[focusedBox] = text;
        setData(updatedData);
        const isComma = text.includes(",");
        const inputDataInBaseRate = (Number.parseFloat(text.replace(" ", "").replace(",", ".")) * baseRate);
        setData(exchangeRatesOfCurrentCurrency!.map((rate, i) => {
            if (rate === undefined) return "";
            if (i === focusedBox) return text;
            return isComma ? (inputDataInBaseRate * rate).toFixed(2).replace(".", ",")
                : (inputDataInBaseRate * rate).toFixed(2);
        }));
    }

    const onSubmitEditingHandler = async () => {
        if (focusedBox === -1) return;
        const updatedData = [...data];
        updatedData[focusedBox] = Number.parseFloat(data[focusedBox]).toFixed(2);
        setData(updatedData);
        setFocusedBox(-1);
    };

    return { data, focusedBox, setFocusedBox, onTextChangeHandler, onSubmitEditingHandler, selectedCurrencyCodes } as const;
}