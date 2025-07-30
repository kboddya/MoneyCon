import {getExchangeRates, getHistorycalExchangeRates, getValue} from "@/app/sevices/cacheService";
import {calcData} from "@/app/entities/calcData";

export const calculate = async (data: calcData) => {
    const rates = await getExchangeRates();

    if (rates?.rates == null) return null;
    const excnageRates = {
        firstVal: rates?.rates[data.val.firstVal] ?? 1,
        secondVal: rates?.rates[data.val.secondVal] ?? 1,
        thirdVal: rates?.rates[data.val.thirdVal] ?? 1,
        fourthVal: rates?.rates[data.val.fourthVal] ?? 1,
    }

    switch (data.enterVal) {
        case 1: {
            const convertedToBase = (Number.parseFloat(data.firstData) / excnageRates.firstVal)
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(4);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(4);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(4);
            console.log("Converted to base:", convertedToBase);
            break;
        }
        case 2: {
            const convertedToBase = (Number.parseFloat(data.secondData) / excnageRates.secondVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(4);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(4);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(4);
            break;
        }
        case 3: {
            const convertedToBase = (Number.parseFloat(data.thirdData) / excnageRates.thirdVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(4);
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(4);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(4);
            break;
        }
        case 4: {
            const convertedToBase = (Number.parseFloat(data.fourthData) / excnageRates.fourthVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(4);
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(4);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(4);
            break;
        }
    }

    return data;
}

export const exchangeRateTable = async () => {
    return getExchangeRates().then(async currentDate => {
        if (currentDate?.rates == null) return null;
        return getHistorycalExchangeRates().then(historyData => {
            if (historyData?.rates == null) return null;
            const historyRates = JSON.parse(historyData?.rates);
            return getValue().then(values => {
                const calculateValues = (data: any, value: string) => {
                    return (1 / (data?.rates[value] ?? JSON.parse(data)?.rates[value] ?? 1) * (data?.rates[values.firstVal] ?? JSON.parse(data)?.rates[values.firstVal]  ?? 1));
                }
                console.log(calculateValues(currentDate, values.thirdVal).toFixed(2) + " " + calculateValues(historyRates, values.thirdVal).toFixed(2));
                return {
                    secondVal: {
                        currentVal: calculateValues(currentDate, values.secondVal).toFixed(2),
                        percentVal: (100 - (100 * (calculateValues(historyRates, values.secondVal) / calculateValues(currentDate, values.secondVal)))).toFixed(2) + "%"
                    },
                    thirdVal: {
                        currentVal: (1 / (currentDate?.rates[values.thirdVal] ?? 1) * (currentDate?.rates[values.firstVal] ?? 1)).toFixed(2),
                        percentVal: (((100 * (1 / (historyData?.rates[values.thirdVal] ?? 1) * (historyData?.rates[values.firstVal] ?? 1)) /
                            (1 / (currentDate?.rates[values.thirdVal] ?? 1) * (currentDate?.rates[values.firstVal] ?? 1))) - 100).toFixed(2) + "%")
                    },
                    fourthVal: {
                        currentVal: (1 / (currentDate?.rates[values.fourthVal] ?? 1) * (currentDate?.rates[values.firstVal] ?? 1)).toFixed(2),
                        percentVal: (((100 * (1 / (historyData?.rates[values.fourthVal] ?? 1) * (historyData?.rates[values.firstVal] ?? 1)) /
                            (1 / (currentDate?.rates[values.fourthVal] ?? 1) * (currentDate?.rates[values.firstVal] ?? 1))) - 100).toFixed(2) + "%")
                    }
                }
            })
        })
    })
}
