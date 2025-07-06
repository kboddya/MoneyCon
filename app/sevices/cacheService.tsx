import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const updateExchangeRates = async (rates: any) => {
    try {
        await AsyncStorage.setItem("exchangeRates", JSON.stringify(rates));
        await AsyncStorage.setItem("time", Date.now().toString());
        return true;
    } catch (e) {
        console.log("Error saving exchange rates:", e);
        return false;
    }
}

export const getExchangeRates = async () => {
    try {
        const rates = await AsyncStorage.getItem("exchangeRates");
        const time = await AsyncStorage.getItem("time");
        return {
            rates: rates ? JSON.parse(rates) : null,
            time: time ? Date.parse(time) : null
        };
    } catch (e) {
        console.log("Error retrieving exchange rates:", e);
        return null;
    }
}

export const setApiKey = async (key: string) => {
    try {
        await AsyncStorage.setItem("apiKey", key);
        return true;
    } catch (e) {
        console.log("Error saving API key:", e);
        return false;
    }
}

export const getApiKey = async () => {
    try {
        const apiKey = await AsyncStorage.getItem("apiKey");
        return apiKey || "101"; // Default API key if not set
    } catch (e) {
        return "101"; // Default API key if retrieval fails
    }
}