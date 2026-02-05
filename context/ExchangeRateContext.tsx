import { createContext, useState, useEffect, PropsWithChildren, useContext } from "react";
import { NetworkContext } from "./NetworkContext";
import { ApiService } from "@/services/ApiService";
import { UserCacheService } from "@/services/CacheService";
import { CurrencyContext } from "@/context/CurrencyContext";
import { Toast } from "toastify-react-native";


type ExchangeRateState = {
    exchangeRateUpdateTimestamp: string | null;
    updateExchangeRate: () => Promise<void>;
    exchangeRates: { [key: string]: number };
    historycalRates: { [key: string]: string };
    updateHistoryExchangeRate: () => Promise<void>;
    currentCurrencyCodes: string[];
    updating: boolean;
    historyDiapason: number;
    changeDiapasonHandler: (diapason: string) => void;
}

export const ExchangeRateContext = createContext<ExchangeRateState>({
    exchangeRateUpdateTimestamp: null,
    updateExchangeRate: async () => { },
    exchangeRates: {},
    historycalRates: {},
    updateHistoryExchangeRate: async () => { },
    currentCurrencyCodes: [],
    updating: false,
    historyDiapason: 0,
    changeDiapasonHandler: () => { },
})

export const ExchangeRateProvider = ({ children }: PropsWithChildren) => {
    const { isConnected, isChanged, type, isInternetReachable } = useContext(NetworkContext);
    const { currentCurrencyCodes } = useContext(CurrencyContext);

    const [exchangeRateUpdateTimestamp, setExchangeRateUpdateTimestamp] = useState<string | null>(null);
    const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
    const [historycalRates, setHistorycalRates] = useState<{ [key: string]: string }>({});

    const [updating, setUpdating] = useState(false);


    const [historyDiapason, setHistory] = useState(0);
    UserCacheService.getHistoryDiapason().then(data => data !== 0 ? setHistory(data.history) : setHistory(0));

    const changeDiapasonHandler = (diapason: string) => {
        const diapasonInNumber = Number.parseInt(diapason.split(" ")[0]);
        if (historyDiapason === diapasonInNumber) return;
        setHistory(diapasonInNumber);
        UserCacheService.setHistoryDiapason(diapasonInNumber).then(result => {
            if (isChanged && (!isConnected || !isInternetReachable)) {
                Toast.show({
                    text1: "Exchange rates will be updated when you have internet connection",
                    type: "warn",
                    position: "bottom"
                });
                return;
            }
            updateHistoryExchangeRate();
        });
    }

    const updateExchangeRate = async (force = true) => {
        const timestamp = await UserCacheService.getTime();
        setExchangeRateUpdateTimestamp(timestamp);
        if (!isConnected) {
            if (!force) return;
            return Toast.show({
                text1: "No internet connection",
                text2: "Check your network settings and try again",
                type: "error",
            });
        }
        setUpdating(true);
        const result = await ApiService.updateData(force);
        if (result.latestSuccess) {
            const newTimestamp = await UserCacheService.getTime();
            setExchangeRateUpdateTimestamp(newTimestamp);
        }
        if (!result.latestSuccess && force) {
            console.log("Error", result.latestError)
            Toast.show({
                text1: "Something went wrong",
                text2: "Try again later",
                type: "error",
            })
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUpdating(false);
    }

    const updateHistoryExchangeRate = async () => {
        await ApiService.getHistoryExchangeRatesFromApi();
        await loadExchangeRatesFromCache();
    }

    const loadExchangeRatesFromCache = async () => {
        const exchangeRates = await UserCacheService.getExchangeRates();
        console.log("Loaded exchange rates from cache:", exchangeRates);
        if (!exchangeRates) return;
        setExchangeRates(exchangeRates);
        const historycalRates = await UserCacheService.getHistorycalExchangeRates();
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

    const value = {
        exchangeRateUpdateTimestamp,
        updateExchangeRate,
        exchangeRates,
        historycalRates,
        updateHistoryExchangeRate,
        currentCurrencyCodes,
        updating,
        historyDiapason,
        changeDiapasonHandler,
    }

    return (
        <ExchangeRateContext.Provider value={value}>
            {children}
        </ExchangeRateContext.Provider>
    )
}