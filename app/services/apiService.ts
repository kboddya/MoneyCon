import {
    getApiKey,
    getExchangeRates, getHistorycalExchangeRates, getHistoryDiapason,
    getTime,
    updateExchangeRates, updateHistorycalExchangeRates,
    updateSymbols
} from "@/app/services/cacheService";

export const getSymbolsFromApi = async (apiKey: string) => {
    try {
        const response = await fetch("https://api.exchangeratesapi.io/v1/symbols?access_key=" + apiKey);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        if (data?.success) {
            const symbols = JSON.stringify(data.symbols);
            console.log("Symbols fetched successfully:", symbols);
            if (await updateSymbols(symbols)) {
                console.log("Symbols updated successfully");
                return true;
            } else {
                console.error("Failed to update symbols");
                return "102";
            }
        } else {
            console.log(`Error ${data.error.code}: ${data.error.message}`);
            throw data.error;
            return data.error.message;
        }
    } catch (error) {
        console.error("Error fetching symbols:", error);
        return error; // Error code for fetching symbols
    }
}

let exchangeRatesInWork = false;
const getExchangeRatesFromApi = async (apiKey: string, force = false) => {
    return getTime().then(async date => {
        const currentDate = new Date(Date.now()).toDateString()
        const lastUpdateDate = new Date(Date.parse(date));
        if (((isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.toDateString()) || force) && !exchangeRatesInWork) {
            exchangeRatesInWork = true;
            try {
                const response = await fetch("https://api.exchangeratesapi.io/v1/latest?access_key=" + apiKey);

                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }

                const data = await response.json();
                if (data.success) {
                    const rates = JSON.stringify(data.rates);
                    console.log("Exchange rates fetched successfully:", rates);
                    const result = await updateExchangeRates(rates);
                    exchangeRatesInWork = false;
                    return result;
                } else {
                    console.error(`Error ${data.error.code}: ${data.error.info}`);
                    throw data.error;
                }
            } catch (error) {
                exchangeRatesInWork = false;
                return error; // Error code for fetching exchange rates
            }
        }
    })
}

let historyInWork = false;
export const getHistoryExchangeRatesFromApi = async (apiKey: string, force = false) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const exchange = await getHistorycalExchangeRates().then(data => data ? data : null);
        const historyDiapason = await getHistoryDiapason().then(data => {
            if (typeof data === "number") return data;
            else return data.history; // Default history diapason if not set
        });

        if (!historyInWork && historyDiapason != 0 && (force || (exchange !== null && (exchange?.time !== new Date(Date.now()).toDateString())) || (exchange?.diapason !== historyDiapason.toString()))) {
            historyInWork = true;
            const date = new Date(Date.now() - (historyDiapason * 24 * 60 * 60 * 1000));
            const response = await fetch("https://api.exchangeratesapi.io/v1/" + (date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString())) + "?access_key=" + apiKey);

            if (!response.ok) {
                throw new Error("HTTP error status: " + response.status);
            }

            const data = await response.json();

            if (data.success) {
                const rates = JSON.stringify(data.rates);
                console.log("History exchange rates fetched successfully:", rates);
                historyInWork = false;
                return await updateHistorycalExchangeRates(JSON.stringify({
                    rates: rates,
                    time: new Date(Date.now()).toDateString(),
                    diapason: historyDiapason.toString()
                }));
            } else {
                throw data.error;
            }
        }
    } catch (error) {
        historyInWork = false;
        console.log("API Service: Error fetching history exchange rates:", error);
        return error; // Error code for fetching history exchange rates
    }
}

export const updateData = async (force = false, customApiKey = "") => {
    const apiKey = customApiKey != "" ? customApiKey : await getApiKey();
    const exchangeRates = await getExchangeRates();
    const historyExchangeRates = (await getHistorycalExchangeRates())?.rates;

    let result = {
        success: true,
        error: ""
    }

    if (!apiKey) {
        result.error += "101";
        if (exchangeRates?.rates !== null) result.error += " 1000";
        result.success = false;
        return result;
    }

    if (!exchangeRatesInWork) {
        try {
            await getExchangeRatesFromApi(apiKey, force).then(data => {
                if (typeof data === "object") {
                    if (exchangeRates?.rates !== null && customApiKey !== "") throw new Error((data?.toString() + " 1000"));
                    throw new Error(data?.toString());
                }
            })
        } catch (Error) {
            console.error("API Service: Error fetching exchange rates:", Error);
            result.error += Error;
            result.success = false;
        }
    }

    if (!historyInWork) {
        try {
            await getHistoryExchangeRatesFromApi(apiKey, force).then(data => {
                if (typeof data === "object") {
                    if (historyExchangeRates?.rates !== null && customApiKey !== "") throw new Error((data?.toString() + " 1000"));
                    throw new Error(data?.toString());
                }
            })

        } catch (Error) {
            console.error("API Service: Error fetching history exchange rates:", Error);
            if (result.error !== "") result.error += "\n";
            result.error += Error;
            result.success = false;
        }
    }

    return result;
}