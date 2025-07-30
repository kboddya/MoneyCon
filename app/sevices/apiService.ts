import {
    getApiKey,
    getExchangeRates, getHistorycalExchangeRates, getHistoryDiapason,
    getTime,
    updateExchangeRates, updateHistorycalExchangeRates,
    updateSymbols,
    updateTime
} from "@/app/sevices/cacheService";

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

const getExchangeRatesFromApi = async (apiKey: string, force = false) => {
    return getTime().then(async date => {
        const currentDate = new Date(Date.now()).toDateString()
        const lastUpdateDate = new Date(Date.parse(date));
        if ((isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.toDateString()) || force) {
            try {
                const response = await fetch("https://api.exchangeratesapi.io/v1/latest?access_key=" + apiKey);

                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }

                const data = await response.json();
                if (data.success) {
                    const rates = JSON.stringify(data.rates);
                    console.log("Exchange rates fetched successfully:", rates);
                    return await updateExchangeRates(rates);
                } else {
                    console.error(`Error ${data.error.code}: ${data.error.info}`);
                    throw data.error;
                }
            } catch (error) {
                console.log("API Service: Error fetching exchange rates:", error);
                return error; // Error code for fetching exchange rates
            }
        }
    })

}

export const getHistoryExchangeRatesFromApi = async (apiKey: string, force = false) => {
    try {
        const exchange = await getHistorycalExchangeRates().then(data => data ? data : null);
        const historyDiapason = await getHistoryDiapason().then(data => {
            if (typeof data === "number") return data;
            else return data.history; // Default history diapason if not set
        });

        if (historyDiapason != 0 && (force || (exchange !== null && (exchange?.time !== new Date(Date.now()).toDateString())) || (exchange?.diapason !== historyDiapason.toString()))) {
            const date = new Date(Date.now() - (await historyDiapason * 24 * 60 * 60 * 1000));
            const response = await fetch("https://api.exchangeratesapi.io/v1/" + (date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString())) + "?access_key=" + apiKey);

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const rates = JSON.stringify(data.rates);
                console.log("History exchange rates fetched successfully:", rates);
                return await updateHistorycalExchangeRates(JSON.stringify({
                    rates: rates,
                    time: new Date(Date.now()).toDateString(),
                    diapason: historyDiapason.toString()
                }));
            } else {
                console.error(`Error ${data.error.code}: ${data.error.info}`);
                throw data.error;
            }
        }
    } catch (error) {
        console.log("API Service: Error fetching history exchange rates:", error);
        return error; // Error code for fetching history exchange rates
    }
}

export const updateData = async (force = false, customApiKey = "") => {
    const apiKey = customApiKey !== "" ? customApiKey : await getApiKey();
    const exchangeRates = await getExchangeRates();

    if (!apiKey) {
        console.log("API Service: API key is not set");
        const result = "101";
        if (await exchangeRates?.rates !== null) return result + " 1000";
        return result;
    }

    let errorMessage;
    try {
        getExchangeRatesFromApi(apiKey, force).then(data => {
            if (data !== true) {
                if (typeof data === "string" && exchangeRates?.rates !== null && customApiKey !== "") throw new Error(data + " 1000");
                else if (typeof data === "string") throw new Error(data);
            }
        })
    } catch (error) {
        console.error("API Service: Error fetching exchange rates:", Error);
        errorMessage = error;
    }

    try {
        await new Promise(() => setTimeout(() => {
            getHistoryExchangeRatesFromApi(apiKey, force).then(data => {
                if (data !== true) {
                    if (typeof data === "string" && exchangeRates?.rates !== null && customApiKey !== "") throw new Error(data + " 1000");
                    else if (typeof data === "string") throw new Error(data);
                }
            })
        }, 3000));
    } catch (error) {
        console.error("API Service: Error fetching history exchange rates:", error);
        errorMessage = error;
    }

    return true;
}