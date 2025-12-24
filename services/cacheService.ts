import AsyncStorage from "@react-native-async-storage/async-storage";

export const setValue = async (values: string[]) => {
    try {
        await AsyncStorage.setItem("currencyValue", JSON.stringify(values));
        console.log("Cache Service: Currency values saved successfully:", values);
        return true;
    } catch (e) {
        console.log("Cache Service: Error saving currency values:", e);
        return false;
    }
}

export const getValue = async () => {
    try {
        const values = await AsyncStorage.getItem("currencyValue");
        return values ? JSON.parse(values) : ["C", "C", "C", "C"];
    } catch (e) {
        return ["C", "C", "C", "C"];
    }
}

export const updateExchangeRates = async (rates: string) => {
    try {
        await AsyncStorage.setItem("exchangeRates", rates);
        await AsyncStorage.setItem("time", new Date(Date.now()).toString());
        return true;
    } catch (e) {
        console.log("Cache Service: Error saving exchange rates:", e);
        return false;
    }
}

export const getExchangeRates = async () => {
    try {
        const rates = await AsyncStorage.getItem("exchangeRates");
        return {
            rates: rates ? JSON.parse(rates) : null,
        };
    } catch (e) {
        console.log("Cache Service: Error retrieving exchange rates:", e);
        return null;
    }
}

export const getTime = async () => {
    try {
        const time = await AsyncStorage.getItem("time");
        return time ? time : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving time:", e);
        return null;
    }
}

export const setApiKey = async (key: string) => {
    try {
        await AsyncStorage.setItem("apiKey", key);
        console.log("Cache Service: API key saved successfully");
    } catch (e) {
        console.error("Cache Service: Error saving API key:", e);
    }
}

export const getApiKey = async () => {
    try {
        const apiKey = await AsyncStorage.getItem("apiKey");
        return apiKey || ""; // Default API key if not set
    } catch {
        return ""; // Default API key if retrieval fails
    }
}

export const getHistoryDiapason = async () => {
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

export const setHistoryDiapason = async (value: number) => {
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

export const updateHistorycalExchangeRates = async (rates: string) => {
    try {
        await AsyncStorage.setItem("historyExchangeRates", rates);
        console.log("Cache Service: History exchange rates updated successfully");
        return true;
    } catch (e) {
        console.log("Cache Service: Error updating history exchange rates:", e);
        return false;
    }
}

export const getHistorycalExchangeRates = async () => {
    try {
        const rates = await AsyncStorage.getItem("historyExchangeRates");
        return rates ? JSON.parse(rates) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving history exchange rates:", e);
        return null;
    }
}

export const setLastRequestCode = async (code: string) => {
    try {
        await AsyncStorage.setItem("lastRequestCode", code);
        console.log("Cache Service: Last request code saved successfully:", code);
    } catch (e) {
        console.error("Cache Service: Error saving last request code:", e);
    }
}

export const getLastRequestCode = async () => {
    try {
        const code = await AsyncStorage.getItem("lastRequestCode");
        return code ? parseInt(code) : 0;
    } catch (e) {
        console.error("Cache Service: Error retrieving last request code:", e);
        return 0;
    }
}