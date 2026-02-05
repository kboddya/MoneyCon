import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

const setCurrency = async (values: string[]) => {
    try {
        await AsyncStorage.setItem("currencyValue", JSON.stringify(values));
        console.log("Cache Service: Currency values saved successfully:", values);
    } catch (e) {
        console.log("Cache Service: Error saving currency values:", e);
    }
}

const getCurrency = async (): Promise<string[] | null> => {
    try {
        const values = await AsyncStorage.getItem("currencyValue");
        return values ? JSON.parse(values) : null;
    } catch (e) {
        return null;
    }
}

const updateExchangeRates = async (rates: string) => {
    try {
        await AsyncStorage.multiSet([
            ["exchangeRates", rates],
            ["time", new Date(Date.now()).toString()]
        ]);
    } catch (e) {
        console.log("Cache Service: Error saving exchange rates:", e);
    }
}

const getExchangeRates = async (): Promise<{ [key: string]: number } | null> => {
    try {
        const rates = await AsyncStorage.getItem("exchangeRates");
        return rates ? JSON.parse(rates) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving exchange rates:", e);
        return null;
    }
}

const getTime = async () => {
    try {
        const time = await AsyncStorage.getItem("time");
        return time ? time : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving time:", e);
        return null;
    }
}

const getHistoryDiapason = async () => {
    try {
        const history = await AsyncStorage.getItem("history");
        return history ? {
            history: Number.parseFloat(history),
            time: await AsyncStorage.getItem("timeHistory")
        } : 0;
    } catch (e) {
        console.log("Cache Service: Error retrieving history diapason:", e);
        return 0; // Default history diapason if retrieval fails
    }
}

const setHistoryDiapason = async (value: number) => {
    try {
        await AsyncStorage.setItem("history", value.toString());
        await AsyncStorage.setItem("timeHistory", new Date(Date.now()).toString())
        console.log("Cache Service: History diapason updated successfully:", value);
        return true;
    } catch (e) {
        console.log("Cache Service: Error updating history diapason:", e);
        return false;
    }
}

const updateHistorycalExchangeRates = async (rates: string) => {
    try {
        await AsyncStorage.setItem("historyExchangeRates", rates);
        console.log("Cache Service: History exchange rates updated successfully");
        return true;
    } catch (e) {
        console.log("Cache Service: Error updating history exchange rates:", e);
        return false;
    }
}

const getHistorycalExchangeRates = async () => {
    try {
        const rates = await AsyncStorage.getItem("historyExchangeRates");
        return rates ? JSON.parse(rates) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving history exchange rates:", e);
        return null;
    }
}

const setCurrencyList = async (list: string[][]): Promise<void> => {
    try {
        await AsyncStorage.setItem("currencyList", JSON.stringify(list));
        console.log("Cache Service: Currency list saved successfully");
    } catch (e) {
        console.log("Cache Service: Error saving currency list:", e);
    }
}

const getCurrencyList = async (): Promise<string[][] | null> => {
    try {
        const list = await AsyncStorage.getItem("currencyList");
        return list ? JSON.parse(list) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving currency list:", e);
        return null;
    }
}

const setResentCurrencies = async (list: string[][]): Promise<void> => {
    try {
        await AsyncStorage.setItem("recentCurrencies", JSON.stringify(list));
        console.log("Cache Service: Recent currencies saved successfully");
    } catch (e) {
        console.log("Cache Service: Error saving recent currencies:", e);
    }
}

const getResentCurrencies = async (): Promise<string[][] | null> => {
    try {
        const list = await AsyncStorage.getItem("recentCurrencies");
        return list ? JSON.parse(list) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving recent currencies:", e);
        return null;
    }
}

const setThemeMode = async (mode: ColorSchemeName): Promise<void> => {
    try {
        mode ? await AsyncStorage.setItem("themeMode", mode) : await AsyncStorage.removeItem("themeMode");
    } catch (e) {
        console.log("Cache Service: Error saving theme mode:", e);
    }
}

const getThemeMode = async (): Promise<ColorSchemeName> => {
    try {
        const mode = await AsyncStorage.getItem("themeMode");
        return mode as ColorSchemeName;
    } catch (e) {
        console.log("Cache Service: Error retrieving theme mode:", e);
        return null;
    }
}

const setCurrencyCount = async (count: number): Promise<void> => {
    try {
        await AsyncStorage.setItem("currencyCount", count.toString());
    } catch (e) {
        console.log("Cache Service: Error saving currency count:", e);
    }
}

const getCurrencyCount = async (): Promise<number> => {
    try {
        const count = await AsyncStorage.getItem("currencyCount");
        return count ? Number.parseInt(count) : 4;
    } catch (e) {
        console.log("Cache Service: Error retrieving currency count:", e);
        return 4;
    }
}

const UserCacheService = {
    getHistoryDiapason,
    setHistoryDiapason,
    getHistorycalExchangeRates,
    getTime,
    getExchangeRates,
    getCurrency,
    setCurrency,
    getCurrencyList,
    setResentCurrencies,
    getResentCurrencies,
    getThemeMode,
    setThemeMode,
    getCurrencyCount,
    setCurrencyCount
};

const ApiCacheService = {
    getHistoryDiapason,
    getTime,
    updateExchangeRates,
    updateHistorycalExchangeRates,
    setCurrencyList,
    getHistorycalExchangeRates,
};

export { UserCacheService, ApiCacheService }
