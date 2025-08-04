import {getExchangeRates, getHistorycalExchangeRates, getValue} from "@/app/sevices/cacheService";
import {calcData} from "@/app/entities/calcData";
import {updateData} from "@/app/sevices/apiService";

export const calculate = async (data: calcData) => {
    const rates = await getExchangeRates();

    if (rates?.rates == null) {
        await updateData(true);
        return null;
    }

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
    return getExchangeRates().then(currentDate => {
        if (currentDate?.rates == null) return null;
        return getValue().then(values => {
            return getHistorycalExchangeRates().then(historyData => {
                const calculateValues = (data: any, value: string) => {
                    if (data?.rates == null) {
                        return (1 / (data[value] ?? 1) * (data[values.firstVal] ?? 1));
                    }
                    return (1 / (data.rates[value] ?? 1) * (data.rates[values.firstVal] ?? 1));
                }

                if (historyData?.rates == null) {
                    return {
                        secondVal: {
                            currentVal: calculateValues(currentDate, values.secondVal).toFixed(2),
                            percentVal: "0%"
                        },
                        thirdVal: {
                            currentVal: calculateValues(currentDate, values.thirdVal).toFixed(2),
                            percentVal: "0%"
                        },
                        fourthVal: {
                            currentVal: calculateValues(currentDate, values.fourthVal).toFixed(2),
                            percentVal: "0%"
                        }
                    };
                }
                const historyRates = JSON.parse(historyData?.rates);
                return {
                    secondVal: {
                        currentVal: calculateValues(currentDate, values.secondVal).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values.secondVal) / calculateValues(currentDate, values.secondVal)))).toFixed(2) + "%")
                    },
                    thirdVal: {
                        currentVal: calculateValues(currentDate, values.thirdVal).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values.thirdVal) / calculateValues(currentDate, values.thirdVal)))).toFixed(2) + "%")
                    },
                    fourthVal: {
                        currentVal: calculateValues(currentDate, values.fourthVal).toFixed(2),
                        percentVal: ((100 - (100 * (calculateValues(historyRates, values.fourthVal) / calculateValues(currentDate, values.fourthVal)))).toFixed(2) + "%")
                    }
                };
            })
        })
    })
}
