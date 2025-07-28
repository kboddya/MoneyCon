import {getExchangeRates, getValue} from "@/app/sevices/cacheService";
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



    console.log(data.firstData)
    console.log(data.secondData)
    console.log(data.thirdData)
    console.log(data.fourthData)
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
    return getExchangeRates().then(data => {
    if (data?.rates == null) return null;
        return getValue().then(value => {
            return {
                secondVal: (1 / (data?.rates[value.secondVal] ?? 1) * (data?.rates[value.firstVal] ?? 1)).toFixed(2),
                thirdVal: (1 / (data?.rates[value.thirdVal] ?? 1) * (data?.rates[value.firstVal] ?? 1)).toFixed(2),
                fourthVal: (1 / (data?.rates[value.fourthVal] ?? 1) * (data?.rates[value.firstVal] ?? 1)).toFixed(2),
            }
        })

    })
}
