import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { router } from "expo-router"
import { UserCacheService } from "@/services/CacheService";
import { ApiService } from "@/services/ApiService";


type CurrencyContextState = {
    currentCurrencyCodes: string[];
    updateCurrencyValue: (newValue: string[], index: number) => Promise<void>;
    currencyList: string[][] | null;
    getCurrencyList: () => Promise<void>;
    currencyListError: string | null;
    searchCurrencyHandler?: (query: string, callback: (result: string[][] | undefined) => void) => Promise<void>;
    currencyCount: number;
    setCurrencyCount: (count: number) => void;
    currencyListLength: number;
}

export const CurrencyContext = createContext<CurrencyContextState>({
    currentCurrencyCodes: [],
    updateCurrencyValue: async () => { },
    currencyList: null,
    getCurrencyList: async () => { },
    currencyListError: null,
    currencyCount: 4,
    setCurrencyCount: () => { },
    currencyListLength: 0,
})

export const CurrencyProvider = ({ children }: PropsWithChildren) => {
    const [currentCurrencyCodes, setCurrentCurrencyCodes] = useState<string[]>([]);
    const [currencyCount, setCurrencyCount] = useState<number | null>(null);

    const [currencyList, setCurrencyList] = useState<string[][] | null>(null);
    const [currencyListError, setCurrencyListError] = useState<string | null>(null);

    const [currencyListLength, setCurrencyListLength] = useState<number>(0);

    const updateCurrencyValue = async (newValue: string[], index: number) => {
        router.back();
        const currentValues = [...currentCurrencyCodes];
        currentValues[index] = newValue[0].toUpperCase();
        setCurrentCurrencyCodes(currentValues);
        await UserCacheService.setCurrency(currentValues);
    }

    const getCurrencyList = async () => {
        let list = await UserCacheService.getCurrencyList();
        if (!list) {
            const res = await ApiService.updateCurrencyList();
            if (res !== 200) {
                setCurrencyListError(`Error fetching currency list: ${res}`);
                return;
            }
            list = await UserCacheService.getCurrencyList();
        }
        setCurrencyListLength(list ? list.length : 0);
        const recent = await UserCacheService.getResentCurrencies();
        setCurrencyList((list ?? []).filter(v => !recent?.flat().includes(v[0])));
        setCurrencyListError(null);
    }

    const searchCurrencyHandler = async (query: string, callback: (result: string[][] | undefined) => void) => {
        if (!currencyList) return callback(undefined);
        if (query.trim() === "") return callback(undefined);
        const lowerQuery = query.toLowerCase();
        return callback(currencyList
            .filter(item =>
                item[0].toLowerCase().includes(lowerQuery) ||
                item[1].toLowerCase().includes(lowerQuery
                )
            )
        );
    }


    useEffect(() => {
        getCurrencyList();
        UserCacheService.getCurrencyCount().then(setCurrencyCount);
    }, []);

    useEffect(() => {
        if (currencyCount === null) return;
        UserCacheService.getCurrency().then(values => {
            if (values && values.length === currencyCount) setCurrentCurrencyCodes(values);
            else {
                if (values === null || values.length === 0) {
                    const defaultValues = new Array(currencyCount).fill("?");
                    setCurrentCurrencyCodes(defaultValues);
                    UserCacheService.setCurrency(defaultValues);
                    return;
                }
                if (currencyCount < values.length) {
                    setCurrentCurrencyCodes(values.slice(0, currencyCount));
                    UserCacheService.setCurrency(values.slice(0, currencyCount));
                    return;
                }
                const defaultValues = new Array(currencyCount - (values.length)).fill("?");
                setCurrentCurrencyCodes([...(values ?? []), ...defaultValues]);
                UserCacheService.setCurrency([...(values ?? []), ...defaultValues]);
            }
        })
    }, [currencyCount]);

    const setCurrencyCountHandler = async (count: number) => {
        setCurrencyCount(count);
        UserCacheService.setCurrencyCount(count);
    }

    const value = {
        currentCurrencyCodes,
        updateCurrencyValue,
        currencyList,
        getCurrencyList,
        currencyListError,
        searchCurrencyHandler,
        currencyCount: currencyCount ?? 4,
        setCurrencyCount: setCurrencyCountHandler,
        currencyListLength,
    }

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    )
}
