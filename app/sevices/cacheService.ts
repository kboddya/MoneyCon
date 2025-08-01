import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSymbolsFromApi, updateData} from "@/app/sevices/apiService";

export const changeValue = async (i: any, code: string) => {
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

        return {
            firstVal: firstVal ?? "?",
            secondVal: secondVal ?? "?",
            thirdVal: thirdVal ?? "?",
            fourthVal: fourthVal ?? "?"
        };
    } catch (e) {
        return {
            firstVal: "C",
            secondVal: "C",
            thirdVal: "C",
            fourthVal: "C"
        };
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
        return time ? time : "0"
    } catch (e) {
        console.log("Cache Service: Error retrieving time:", e);
        return "0";
    }
}

export const updateTime = async () => {
    try {
        const currentTime = new Date(Date.now()).toString();
        await AsyncStorage.setItem("time", currentTime);
        console.log("Cache Service: Time updated successfully:", new Date(currentTime).getDate());
        return true;
    } catch (e) {
        console.log("Cache Service: Error updating time:", e);
        return false;
    }
}

export const setApiKey = async (key: string) => {
    return await updateData(true, key)
        .then(async result => {
            if (result == true) {
                try {
                    await AsyncStorage.setItem("apiKey", key);
                    console.log("Cache Service: API key saved successfully:", key);
                    return true;
                } catch (e) {
                    console.log("Cache Service: Error saving API key:", e);
                    return false;
                }
            } else {
                await AsyncStorage.removeItem("apiKey");
                return result;
            }
        });
}

export const getApiKey = async () => {
    try {
        const apiKey = await AsyncStorage.getItem("apiKey");
        return apiKey || ""; // Default API key if not set
    } catch (e) {
        return ""; // Default API key if retrieval fails
    }
}

export const updateSymbols = async (symbols: string) => {
    try {
        await AsyncStorage.setItem("symbols", symbols);
        console.log("Cache Service: Symbols saved successfully:");
        return true;
    } catch (e) {
        console.log("Cache Service: Error saving symbols:", e);
        return false;
    }
}

export const getSymbols = async () => {
    try {
        const symbols = await AsyncStorage.getItem("symbols");
        return symbols && JSON.parse(symbols)?.success ? JSON.parse(symbols) : null;
    } catch (e) {
        console.log("Cache Service: Error retrieving symbols:", e);
        return null;
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
        return ;
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