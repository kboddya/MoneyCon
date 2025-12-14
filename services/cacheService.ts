import AsyncStorage from "@react-native-async-storage/async-storage";

export const changeValue = async (i: string, code: string) => {
    try {
        switch (i) {
            case "1": {
                await AsyncStorage.setItem("firstVal", code);
                break;
            }
            case "2": {
                await AsyncStorage.setItem("secondVal", code);
                break;
            }
            case "3": {
                await AsyncStorage.setItem("thirdVal", code);
                break;
            }
            case "4": {
                await AsyncStorage.setItem("fourthVal", code);
                break;
            }
            default: {
                return null;
            }
        }
    } catch (e) {
        console.log("Error saving value:", e);
    }
};

export const getValue = async () => {
    try {
        const firstVal = await AsyncStorage.getItem("firstVal");
        const secondVal = await AsyncStorage.getItem("secondVal");
        const thirdVal = await AsyncStorage.getItem("thirdVal");
        const fourthVal = await AsyncStorage.getItem("fourthVal");

        return [firstVal ?? "?", secondVal ?? "?", thirdVal ?? "?", fourthVal ?? "?"];
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
        return time ? time : "0";
    } catch (e) {
        console.log("Cache Service: Error retrieving time:", e);
        return "0";
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
    } catch (e) {
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