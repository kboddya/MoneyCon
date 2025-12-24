import {
    getApiKey,
    getExchangeRates,
    getHistorycalExchangeRates,
    getHistoryDiapason,
    getTime,
    updateExchangeRates,
    updateHistorycalExchangeRates,
    setLastRequestCode,
    setApiKey
} from "@/services/cacheService";
import { UpdateDataResult } from "@/entities/UpdateDataResult";


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
                    throw new Error(response.status.toString());
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
                setLastRequestCode(error as string)
                return error; // Error code for fetching exchange rates
            }
        }
    })
}

let historyInWork = false;
const getHistoryExchangeRatesFromApi = async (apiKey: string | undefined, force = false) => {
    if (!apiKey) return
    try {
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
                throw new Error(response.status.toString());
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
        setLastRequestCode(error as string)
        return error; // Error code for fetching history exchange rates
    }
}

/**
*Updating both exchange rates and history exchange rates from API
*If force is true, data will be fetched regardless of last update time
*If customApiKey is provided, it will be used instead of the stored API key
*@returns  {Promise<{latestSuccess: boolean, latestError: string, historySuccess: boolean, historyError: string}>}
**/
const updateData = async (force = false, customApiKey = "") => {

    const apiKey = customApiKey != "" ? customApiKey : await getApiKey();
    const exchangeRates = await getExchangeRates();
    const historyExchangeRates = (await getHistorycalExchangeRates())?.rates;

    let result: UpdateDataResult = { latestSuccess: true, historySuccess: true } as UpdateDataResult;

    if (!apiKey) {
        result.latestError = "101";
        if (exchangeRates?.rates !== null) result.latestError += " 1000";
        result.latestSuccess = false;
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
            result.latestError += Error as string;
            result.latestSuccess = false;
        }
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

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
            if (result.historyError !== "") result.historyError += "\n";
            result.historyError += Error as string;
            result.historySuccess = false;
        }
    }

    return result;
}

const UpdateApiKey = async (newApiKey: string): Promise<{ ok: boolean, error?: string }> => {
    const result = await fetch("https://api.exchangeratesapi.io/v1/symbols?access_key=" + newApiKey);
    if (!result.ok) {
        return { ok: false, error: result.status.toString() };
    }
    const symbols = (await result.json()).symbols;
    const keys = Object.keys(symbols);
    const symbolsToSave = keys.map(key => ({ code: key, name: symbols[key] }));
    await setApiKey(newApiKey);
    return { ok: true };
}

export const ApiService = {
    updateData,
    UpdateApiKey,
    getHistoryExchangeRatesFromApi
}