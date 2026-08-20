type ExchangeRateRowType = {
    currencyCode: string;
    currentVal: string;
    percentVal: string;
};

type ExchangeRateTableType = ExchangeRateRowType[] | undefined;

export { ExchangeRateRowType, ExchangeRateTableType }