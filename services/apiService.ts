import { ApiCacheService } from "@/services/CacheService";

const mainSource = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@";
const endOfReserveSource = ".currency-api.pages.dev/v1/";

let fetchInWork = false
const getDataFromApi = async (date: string, endpoint: string): Promise<{ [key: string]: number } | { [key: string]: string }> => {
    if (fetchInWork) await new Promise(resolve => setTimeout(resolve, 1000));
    if (fetchInWork) return { errorCode: "Fetch in work" };
    fetchInWork = true;
    try {
        let response = await fetch(mainSource + date + "/v1/" + endpoint + ".min.json");
        if (response.ok) {
            fetchInWork = false;
            return await response.json()
        };
        response = await fetch("https://" + date + endOfReserveSource + endpoint + ".min.json");
        if (response.ok) {
            fetchInWork = false;
            return await response.json()
        };
        response = await fetch(mainSource + date + "/v1/" + endpoint + ".json");
        if (response.ok) {
            fetchInWork = false;
            return await response.json()
        };
        response = await fetch("https://" + date + endOfReserveSource + endpoint + ".json");
        if (response.ok) {
            fetchInWork = false;
            return await response.json()
        };
        throw new Error(response.status.toString());
    } catch (error) {
        console.warn("API Service: Error fetching data from API:", error);
        fetchInWork = false;
        return { errorCode: error as string };
    }
}

const getExchangeRatesFromApi = async (force = false) => {
    const timestamp = await ApiCacheService.getTime();
    const currentDate = new Date(Date.now()).toDateString();
    const lastUpdateDate = new Date(Date.parse(timestamp ?? new Date(0).toDateString()));
    if ((isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.toDateString()) || force) {
        const response = await getDataFromApi("latest", "currencies/eur");
        console.log("API Service: Fetched exchange rates response:", response);
        if (response.errorCode) {
            console.log("API Service: Error fetching exchange rates:", response.errorCode);
            return response.errorCode; // Error code for fetching exchange rates
        }
        const rates = JSON.stringify(response.eur);
        console.log("Exchange rates fetched successfully:", rates);
        await ApiCacheService.updateExchangeRates(rates);
        return 200;
    }
}

const getHistoryExchangeRatesFromApi = async (force = false) => {
    const exchange = await ApiCacheService.getHistorycalExchangeRates().then(data => data ? data : null);
    const historyDiapason = await ApiCacheService.getHistoryDiapason().then(data => {
        if (typeof data === "number") return data;
        else return data.history; // Default history diapason if not set
    });

    if (historyDiapason != 0 && (force || (exchange !== null && (exchange?.date !== new Date(Date.now()).toDateString())) || (exchange?.diapason !== historyDiapason.toString()))) {
        const date = new Date(Date.now() - (historyDiapason * 24 * 60 * 60 * 1000));
        console.log("Fetching history exchange rates for date:", date);
        const stringDate = date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length === 1 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length === 1 ? "0" + date.getDate().toString() : date.getDate().toString());
        const response = await getDataFromApi(stringDate, "currencies/eur");
        if (response.errorCode) {
            console.log("API Service: Error fetching history exchange rates:", response.errorCode);
            return response.errorCode; // Error code for fetching history exchange rates
        }

        const rates = JSON.stringify(response.eur);
        console.log("History exchange rates fetched successfully:", rates);
        await ApiCacheService.updateHistorycalExchangeRates(JSON.stringify({
            rates,
            date: new Date(Date.now()).toDateString(),
            diapason: historyDiapason.toString()
        }));
        return 200;
    }
}

/**
*Updating both exchange rates and history exchange rates from API
*If force is true, data will be fetched regardless of last update time
*If customApiKey is provided, it will be used instead of the stored API key
*@returns  {Promise<{latestSuccess: boolean, latestError: string, historySuccess: boolean, historyError: string}>}
**/
const updateData = async (force = false, customApiKey = "") => {
    const historyExchangeRates = (await ApiCacheService.getHistorycalExchangeRates())?.rates;

    let result: UpdateDataResult = { latestSuccess: true, historySuccess: true } as UpdateDataResult;

    const latestResponseCode = await getExchangeRatesFromApi(force);
    if (latestResponseCode !== 200 && latestResponseCode !== undefined) {
        result.latestSuccess = false;
        result.latestError = `Error code: ${latestResponseCode}`;
    }

    const historyResponseCode = await getHistoryExchangeRatesFromApi(force);
    if (historyResponseCode !== 200 && historyResponseCode !== undefined) {
        result.historySuccess = false;
        result.historyError = `Error code: ${historyResponseCode}`;
    }

    return result;
}



const updateCurrencyList = async () => {
    const response = await getDataFromApi("latest", "currencies");
    console.log("API Service: Fetched currency list response:", response);
    if (response.errorCode) {
        console.log("API Service: Error fetching currency list:", response.errorCode);
        return response.errorCode; // Error code for fetching currency list
    }

    const currencies = response;
    const currenciesArray = Object.entries(currencies);

    await ApiCacheService.setCurrencyList(currenciesArray);
    console.log("Currency list fetched and saved successfully.");
    return 200;
}

type UpdateDataResult = {
    latestSuccess: boolean;
    latestError?: string;
    historySuccess: boolean;
    historyError?: string;
}

const ApiService = {
    updateData,
    getHistoryExchangeRatesFromApi,
    updateCurrencyList
}

export { ApiService, UpdateDataResult }
