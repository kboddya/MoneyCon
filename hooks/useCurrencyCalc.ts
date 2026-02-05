import { useState, useContext, useEffect } from "react";
import { ExchangeRateContext } from "@/context/ExchangeRateContext";

const toUpdate = (text: string): boolean => {
    if (text.includes("-") ||
        (text.split(".").length - 1) + (text.split(",").length - 1) > 1 ||
        Number.isNaN(Number(text))) return false;
    return true;
}

export default function useCurrencyCalc() {
    const {
        currentCurrencyCodes,
        exchangeRates,
        exchangeRateUpdateTimestamp
    } = useContext(ExchangeRateContext);

    const [data, setData] = useState<string[]>([]);
    const [focusedBox, setFocusedBox] = useState(-1);
    const [exchangeRatesOfCurrentCurrency, setExchangeRatesOfCurrentCurrency] =
        useState<(number | undefined)[]>([]);
    const [baseRate, setBaseRate] = useState<number>(0);

    useEffect(() => {
        if (currentCurrencyCodes.length > 0) {
            setExchangeRatesOfCurrentCurrency(currentCurrencyCodes.map(code => exchangeRates[code.toLowerCase()]));
        }
    }, [exchangeRateUpdateTimestamp, currentCurrencyCodes]);

    useEffect(() => {
        setData([]);
    }, [currentCurrencyCodes])

    useEffect(() => {
        if (focusedBox === -1) return;
        setBaseRate((1 / (exchangeRatesOfCurrentCurrency[focusedBox] ?? 1)));
    }, [focusedBox])

    const onTextChangeHandler = async (text: string) => {
        if (focusedBox === -1) onTextChangeHandler(text);
        if (text === "." || text === ",") text = "0" + text;
        if (!toUpdate(text)) return;
        const updatedData = [...data];
        updatedData[focusedBox] = text;
        setData(updatedData);
        if (focusedBox === -1) return
        const isComma = text.includes(",");
        const inputDataInBaseRate = (Number.parseFloat(text.replace(" ", "").replace(",", ".")) * baseRate);
        setData(exchangeRatesOfCurrentCurrency.map((rate, i) => {
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

    return [data, focusedBox, setFocusedBox, onTextChangeHandler, onSubmitEditingHandler] as const;
}