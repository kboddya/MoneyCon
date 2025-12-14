import { getExchangeRates, getHistorycalExchangeRates, getValue } from "@/services/cacheService";
import { calcData } from "@/entities/calcData";
import { updateData } from "@/services/apiService";
import { is } from "@babel/types";
import { replace } from "expo-router/build/global-state/routing";

export const calculate = async (data: calcData) => {
    const rates = await getExchangeRates();

    if (rates?.rates == null) {
        await updateData(true);
        return null;
    }

    const exchangeRates = [rates?.rates[data.values[0]] ?? 1, rates?.rates[data.values[1]] ?? 1, rates?.rates[data.values[2]] ?? 1, rates?.rates[data.values[3]] ?? 1];
    const isComma = data.data[data.enterVal].includes(",");
    const convertToBase = (Number.parseFloat(data.data[data.enterVal].replace(" ", "").replace(",", ".")) / exchangeRates[data.enterVal]);

    for (let i = 0; i < 4; ++i) {
        if (i === data.enterVal) continue;
        data.data[i] = isComma ? (convertToBase * exchangeRates[i]).toFixed(2).replace(".", ",")
            : (convertToBase * exchangeRates[i]).toFixed(2);
    }

    console.log(convertToBase);

    return data;
}

export const exchangeRateTable = async () => {
    return getExchangeRates().then(currentDate => {
        if (currentDate?.rates == null) return null;
        return getValue().then(values => {
            return getHistorycalExchangeRates().then(historyData => {
                const calculateValues = (data: any, value: string) => {
                    if (data?.rates == null) {
                        return (1 / (data[value] ?? 1) * (data[values[0]] ?? 1));
                    }
                    return (1 / (data.rates[value] ?? 1) * (data.rates[values[0]] ?? 1));
                }

                if (historyData?.rates == null) {
                    return {
                        secondVal: {
                            currentVal: calculateValues(currentDate, values[1]).toFixed(2),
                            percentVal: "0%"
                        },
                        thirdVal: {
                            currentVal: calculateValues(currentDate, values[2]).toFixed(2),
                            percentVal: "0%"
                        },
                        fourthVal: {
                            currentVal: calculateValues(currentDate, values[3]).toFixed(2),
                            percentVal: "0%"
                        }
                    };
                }
                const historyRates = JSON.parse(historyData?.rates);
                return {
                    secondVal: {
                        currentVal: calculateValues(currentDate, values[1]).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values[1]) / calculateValues(currentDate, values[1])))).toFixed(2) + "%")
                    },
                    thirdVal: {
                        currentVal: calculateValues(currentDate, values[2]).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values[2]) / calculateValues(currentDate, values[2])))).toFixed(2) + "%")
                    },
                    fourthVal: {
                        currentVal: calculateValues(currentDate, values[3]).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values[3]) / calculateValues(currentDate, values[3])))).toFixed(2) + "%")
                    }
                };
            })
        })
    })
}
