import {getExchangeRates, getHistorycalExchangeRates, getValue} from "@/app/services/cacheService";
import {calcData} from "@/app/entities/calcData";
import {updateData} from "@/app/services/apiService";

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
    let isComma = false;
    switch (data.enterVal) {
        case 1: {
            isComma = data.firstData.includes(",");
            const convertedToBase = (Number.parseFloat(data.firstData.replace(" ", "").replace(",", ".")) / excnageRates.firstVal)
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(2);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(2);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(2);
            break;
        }
        case 2: {
            isComma = data.secondData.includes(",");
            const convertedToBase = (Number.parseFloat(data.secondData.replace(" ", "").replace(",", ".")) / excnageRates.secondVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(2);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(2);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(2);
            break;
        }
        case 3: {
            isComma = data.thirdData.includes(",");
            const convertedToBase = (Number.parseFloat(data.thirdData.replace(" ", "").replace(",", ".")) / excnageRates.thirdVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(2);
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(2);
            data.fourthData = (convertedToBase * excnageRates.fourthVal).toFixed(2);
            break;
        }
        case 4: {
            isComma = data.fourthData.includes(",");
            const convertedToBase = (Number.parseFloat(data.fourthData.replace(" ", "").replace(",", ".")) / excnageRates.fourthVal)
            data.firstData = (convertedToBase * excnageRates.firstVal).toFixed(2);
            data.secondData = (convertedToBase * excnageRates.secondVal).toFixed(2);
            data.thirdData = (convertedToBase * excnageRates.thirdVal).toFixed(2);
            break;
        }
    }

    if(isComma){
        data.firstData = data.firstData.replace(".", ",");
        data.secondData = data.secondData.replace(".", ",");
        data.thirdData = data.thirdData.replace(".", ",");
        data.fourthData = data.fourthData.replace(".", ",");
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
