import {
    getApiKey,
    getExchangeRates, getExchangeRatesProvider, getHistorycalExchangeRates, getHistoryDiapason,
    getTime,
    updateExchangeRates, updateHistorycalExchangeRates
} from "@/app/services/cacheService";

const exchangeRatesApiProviderLatestUrl = "https://api.exchangeratesapi.io/v1/latest?access_key=";
const exchangeRatesApiProviderHistoryUrl = "https://api.exchangeratesapi.io/v1/"; // + YYYY-MM-DD + ?access_key=
const exchangeRatesApiProviderCurrencyList = "https://api.exchangeratesapi.io/v1/symbols?access_key=";

const fawazahmed0ProviderLatestUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
const fawazahmed0ProviderHistoryUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@"; // + YYYY-MM-DD + /v1 + /currencies/eur.json
const fawazahmed0ProviderCurrencyList = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

let exchangeRatesInWork = false;
let historyInWork = false;

const getExchangeRatesFromExchangeRatesApi = async (apiKey: string, force = false) => {
    return getTime().then(async date => {
        const currentDate = new Date(Date.now()).toDateString()
        const lastUpdateDate = new Date(Date.parse(date));
        if (((isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.toDateString()) || force) && !exchangeRatesInWork) {
            exchangeRatesInWork = true;
            try {
                const response = await fetch(exchangeRatesApiProviderLatestUrl + apiKey);

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

const getExchangeRatesFromFawazahmed0 = async (force = false) => {
    return getTime().then(async date => {
        const currentDate = new Date(Date.now()).toDateString()
        const lastUpdateDate = new Date(Date.parse(date));
        if (((isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.toDateString()) || force) && !exchangeRatesInWork) {
            exchangeRatesInWork = true;
            try {
                const response = await fetch(fawazahmed0ProviderLatestUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }

                const data = await response.json();
                if (data.eur) {
                    const rates = JSON.stringify(data.eur);
                    console.log("Exchange rates fetched successfully:", rates);
                    const result = await updateExchangeRates(rates);
                    exchangeRatesInWork = false;
                    return result;
                } else {
                    console.error(`Error: Invalid data format`);
                    throw new Error("Invalid data format");
                }
            }
            catch (error) {
                exchangeRatesInWork = false;
                return error; // Error code for fetching exchange rates
            }
        }
    })
}

const getHistoryExchangeRatesFromExchangeRateApi = async (apiKey: string, force = false) => {
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
            const response = await fetch(exchangeRatesApiProviderHistoryUrl + (date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString())) + "?access_key=" + apiKey);

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

const getHistoryExchangeRatesFromFawazahmed0 = async (force = false) => {
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
            const response = await fetch(fawazahmed0ProviderHistoryUrl + (date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString())) + "/v1/currencies/eur.json");

            if (!response.ok) {
                throw new Error("HTTP error status: " + response.status);
            }

            const data = await response.json();

            if (data.eur) {
                const rates = JSON.stringify(data.eur);
                console.log("History exchange rates fetched successfully:", rates);
                historyInWork = false;
                return await updateHistorycalExchangeRates(JSON.stringify({
                    rates: rates,
                    time: new Date(Date.now()).toDateString(),
                    diapason: historyDiapason.toString()
                }));
            }
            else {
                throw new Error("Invalid data format");
            }
        }
    } catch (error) {
        historyInWork = false;
        console.log("API Service: Error fetching history exchange rates:", error);
        return error; // Error code for fetching history exchange rates
    }
}


const getListOfCurrencys = async (apiKey: string, provider = -1, force = false) => {
    provider = provider === -1 ? await getExchangeRatesProvider(): provider;

}

const getListOfCurrencysFromExchangeRatesApi = async (apiKey: string, force: boolean) => {

}

const getListOfCurrencysFromFawazahmed0 = async (force: boolean) => {}

export const updateData = async (force = false, customApiKey = "") => {
    const apiKey = customApiKey != "" ? customApiKey : await getApiKey();
    const provider = await getExchangeRatesProvider();
    const exchangeRates = await getExchangeRates();
    const historyExchangeRates = (await getHistorycalExchangeRates())?.rates;

    let result = {
        success: true,
        error: ""
    }

    if (!apiKey && provider === 1) {
        result.error += "101";
        if (exchangeRates?.rates !== null) result.error += " 1000";
        result.success = false;
        return result;
    }

    if (!exchangeRatesInWork) {
        try {
            const exchangeRatesFunc = provider === 1 ? getExchangeRatesFromExchangeRatesApi(apiKey, force) : getExchangeRatesFromFawazahmed0(force);
            await exchangeRatesFunc.then(data => {
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
            const historyFunc = provider === 1 ? getHistoryExchangeRatesFromExchangeRateApi(apiKey, force) : getHistoryExchangeRatesFromFawazahmed0(force);
            await historyFunc.then(data => {
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