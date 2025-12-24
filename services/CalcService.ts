const CalcService = {
    async calculate(data: CalcData): Promise<CalcData | null> {
        const exchangeRates = [data.exchangeRates[data.values[0]] ?? 1, data.exchangeRates[data.values[1]] ?? 1, data.exchangeRates[data.values[2]] ?? 1, data.exchangeRates[data.values[3]] ?? 1];
        const isComma = data.data[data.enterVal].includes(",");
        const convertToBase = (Number.parseFloat(data.data[data.enterVal].replace(" ", "").replace(",", ".")) / exchangeRates[data.enterVal]);

        for (let i = 0; i < 4; ++i) {
            if (i === data.enterVal) continue;
            data.data[i] = isComma ? (convertToBase * exchangeRates[i]).toFixed(2).replace(".", ",")
                : (convertToBase * exchangeRates[i]).toFixed(2);
        }

        console.log(convertToBase);

        return data;
    },

    async exchangeRateTable(values: string[], currentData: { [key: string]: number }, historyData: { [key: string]: string }) {
        if (!currentData || !historyData.rates || !values) return null;
        const calculateValues = (data: any, value: string) => {
            return (1 / (data[value] ?? 1) * (data[values[0]] ?? 1));
        }

        if (historyData?.rates == null) {
            return {
                secondVal: {
                    currentVal: calculateValues(currentData, values[1]).toFixed(2),
                    percentVal: "0%"
                },
                thirdVal: {
                    currentVal: calculateValues(currentData, values[2]).toFixed(2),
                    percentVal: "0%"
                },
                fourthVal: {
                    currentVal: calculateValues(currentData, values[3]).toFixed(2),
                    percentVal: "0%"
                }
            };
        }
        const historyRates = JSON.parse(historyData?.rates);
        return {
            secondVal: {
                currentVal: calculateValues(currentData, values[1]).toFixed(2),
                percentVal: ((100 - (100 * (calculateValues(historyRates, values[1]) / calculateValues(currentData, values[1])))).toFixed(2) + "%")
            },
            thirdVal: {
                currentVal: calculateValues(currentData, values[2]).toFixed(2),
                percentVal: ((100 - (100 * (calculateValues(historyRates, values[2]) / calculateValues(currentData, values[2])))).toFixed(2) + "%")
            },
            fourthVal: {
                currentVal: calculateValues(currentData, values[3]).toFixed(2),
                percentVal: ((100 - (100 * (calculateValues(historyRates, values[3]) / calculateValues(currentData, values[3])))).toFixed(2) + "%")
            }
        };
    }
}

type CalcData = {
    data: string[];
    values: string[];
    exchangeRates: { [key: string]: number };
    enterVal: number;
}

export { CalcService, CalcData };