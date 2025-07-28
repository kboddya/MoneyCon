import {
    getApiKey,
    getExchangeRates,
    getTime,
    updateExchangeRates,
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

const getExchangeRatesFromApi = async (apiKey: string) => {
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
        console.log("Error fetching exchange rates:", error);
        3.6e+6
        return error; // Error code for fetching exchange rates
    }
}

export const updateData = async () => {
    return getTime().then(async date => {
        const currentDate = new Date(Date.now()).getDate();
        const lastUpdateDate = new Date(Date.parse(date));
        console.log(currentDate + " " + lastUpdateDate.getDate());
        if (isNaN(lastUpdateDate.getDate()) || currentDate !== lastUpdateDate.getDate()) {
            const apiKey = await getApiKey();
            const exchangeRates = await getExchangeRates();
            if (!apiKey) {
                console.log("API Service: API key is not set");
                const result = "101";
                if (await exchangeRates?.rates !== null) return result + " 1000";;
                return result;
            }


            const ratesResult = await getExchangeRatesFromApi(apiKey);

            if (typeof ratesResult === "string" && exchangeRates?.rates !== null) return ratesResult + " 1000";
            else if (typeof ratesResult === "string") return ratesResult;

            await updateTime();

            console.log("Data updated successfully");
            return true;
        }

        console.log("rase: " + await getExchangeRates());
        console.log(Date.parse(await getTime()));
    });

}