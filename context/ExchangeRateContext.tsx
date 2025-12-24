import { createContext, useState, useEffect, PropsWithChildren, useContext } from "react";
import { NetworkContext } from "./NetworkContext";
import { ApiService } from "@/services/ApiService";
import { getTime, getExchangeRates, getHistorycalExchangeRates, getValue, setValue } from "@/services/cacheService";
import { AuthContext } from "./AuthContext";
import LoadingModal from "@/components/modals/LoadingModal";
import { CalcService } from "@/services/CalcService";
import { router } from "expo-router";

type ExchangeRateState = {
    apiKey: string | undefined;
    exchangeRateUpdateTimestamp: string | null;
    updateExchangeRate: () => Promise<void>;
    values: string[];
    exchangeRates: { [key: string]: number };
    historycalRates: { [key: string]: string };
    table: {
        secondVal: {
            currentVal: string;
            percentVal: string;
        };
        thirdVal: {
            currentVal: string;
            percentVal: string;
        };
        fourthVal: {
            currentVal: string;
            percentVal: string;
        };
    } | null;
    updateCurrencyValue: (newValue: string, index: number) => Promise<void>;
    updateHistoryExchangeRate: () => Promise<void>;
}

export const ExchangeRateContext = createContext<ExchangeRateState>({
    apiKey: undefined,
    exchangeRateUpdateTimestamp: null,
    updateExchangeRate: async () => { },
    values: ["", "", "", ""],
    exchangeRates: {},
    historycalRates: {},
    table: null,
    updateCurrencyValue: async () => { },
    updateHistoryExchangeRate: async () => { }
})

export const ExchangeRateProvider = ({ children }: PropsWithChildren) => {
    const [exchangeRateUpdateTimestamp, setExchangeRateUpdateTimestamp] = useState<string | null>(null);

    const [values, setValues] = useState(["", "", "", ""]);

    const [table, setTable] = useState<{
        secondVal: {
            currentVal: string,
            percentVal: string
        },
        thirdVal: {
            currentVal: string,
            percentVal: string
        },
        fourthVal: {
            currentVal: string,
            percentVal: string
        },
    } | null>(null)


    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
    const [historycalRates, setHistorycalRates] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (values.includes("") || values.includes("C")) return;

        CalcService.exchangeRateTable(values, exchangeRates, historycalRates).then(data => {
            setTable(data ?? {
                secondVal: {
                    currentVal: "",
                    percentVal: ""
                },
                thirdVal: {
                    currentVal: "",
                    percentVal: ""
                },
                fourthVal: {
                    currentVal: "",
                    percentVal: ""
                },
            });
        }
        )
    }, [values, exchangeRateUpdateTimestamp, historycalRates]);

    const updateHistoryExchangeRate = async () => {
        await ApiService.getHistoryExchangeRatesFromApi(apiKey);
        await loadExchangeRatesFromCache();
    }

    const { isConnected, isChanged, type } = useContext(NetworkContext);
    const { apiKey } = useContext(AuthContext);

    const [updating, setUpdating] = useState(false);

    const updateExchangeRate = async (force = true) => {
        if (force) setUpdating(true);
        const timestamp = await getTime();
        setExchangeRateUpdateTimestamp(timestamp);
        if (!isConnected || !apiKey) return;
        const result = await ApiService.updateData(force);
        if (result.latestSuccess) {
            const newTimestamp = await getTime();
            setExchangeRateUpdateTimestamp(newTimestamp);
        }
        setUpdating(false);
    }

    const updateCurrencyValue = async (newValue: string, index: number) => {
        router.back();
        const currentValues = [...values];
        currentValues[index] = newValue;
        setValues(currentValues);
        setValue(currentValues);
    }

    const loadExchangeRatesFromCache = async () => {
        const exchangeRates = await getExchangeRates();
        console.log("Loaded exchange rates from cache:", exchangeRates);
        setExchangeRates(exchangeRates?.rates);
        const historycalRates = await getHistorycalExchangeRates();
        setHistorycalRates(historycalRates);
    }

    useEffect(() => {
        loadExchangeRatesFromCache();
    }, [exchangeRateUpdateTimestamp])

    useEffect(() => {
        (async () => {
            await updateExchangeRate(false);
        })();
    }, [isConnected, isChanged, type])

    useEffect(() => {
        loadExchangeRatesFromCache();
        getValue().then(setValues);
    }, [])

    const value = {
        apiKey,
        exchangeRateUpdateTimestamp,
        updateExchangeRate,
        values,
        exchangeRates,
        historycalRates,
        table,
        updateCurrencyValue,
        updateHistoryExchangeRate
    }

    return (
        <ExchangeRateContext.Provider value={value}>
            {children}
            <LoadingModal visible={updating} />
        </ExchangeRateContext.Provider>
    )
}