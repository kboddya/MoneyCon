import {getExchangeRates, getHistorycalExchangeRates, getValue} from "@/app/services/cacheService";
import {calcData} from "@/app/entities/calcData";
import {updateData} from "@/app/services/apiService";

export const calculate = async (data: calcData) => {
    const rates = await getExchangeRates();
    console.log(rates);
    if (rates?.rates == null) {
        await updateData(true);
        return null;
    }


    const exchangeRates = [rates?.rates[(data.values[0]).toUpperCase()] ?? 1, rates?.rates[(data.values[1]).toUpperCase()] ?? 1, rates?.rates[(data.values[2]).toUpperCase()] ?? 1, rates?.rates[(data.values[3]).toUpperCase()] ?? 1];
    const isComma = data.data[data.enterVal].includes(",");
    const convertToBase = (Number.parseFloat(data.data[data.enterVal].replace(" ", "").replace(",", ".")) / exchangeRates[data.enterVal]);

    for (let i = 0; i < 4; ++i) {
        if (i === data.enterVal) continue;
        data.data[i] = isComma ? (convertToBase * exchangeRates[i]).toFixed(2).replace(".", ",")
            : (convertToBase * exchangeRates[i]).toFixed(2);
    }

    return data;
}

export const exchangeRateTable = async () => {
    return getExchangeRates().then(currentDate => {
        if (currentDate?.rates == null) return null;
        return getValue().then(values => {
            return getHistorycalExchangeRates().then(historyData => {
                const result: {currentVal: string, percentVal: string}[] = [];
                const calculateValues = (data: any, value: string) => {
                    if (data?.rates == null) {
                        return (1 / (data[value] ?? 1) * (data[values[0]] ?? 1));
                    }
                    return (1 / (data.rates[value] ?? 1) * (data.rates[values[0]] ?? 1));
                }

                if (historyData?.rates == null) {
                    for (let i = 1; i < 4; ++i) {
                        result.push({
                            currentVal: calculateValues(currentDate, values[i]).toFixed(2),
                            percentVal: "0%"
                        });
                    }
                    return result;
                }
                const historyRates = JSON.parse(historyData?.rates);
                for (let i = 1; i < 4; ++i) {
                    result.push({
                        currentVal: calculateValues(currentDate, values[i]).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values[i]) / calculateValues(currentDate, values[i])))).toFixed(2) + "%")
                    })
                }
                return result;
            })
        })
    })
}
