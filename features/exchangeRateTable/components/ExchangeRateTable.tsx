import useExchangeRateTable from "@/features/exchangeRateTable/hooks/useExchangeRateTable";
import Container from "./Container";
import DataRow from "./DataRow";
import Header from "./Header";

const ExchangeRateTable = () => {
    const { table, mainCurrencyCode } = useExchangeRateTable();

    if (!table) return undefined;

    return (
        <Container>
            <Header mainCurrencyCode={mainCurrencyCode} />
            {
                table.map((item, index) =>
                    <DataRow data={item} key={`table-${item.currencyCode}`} isLatest={index === table.length - 1} />
                )
            }
        </Container >
    );
}

export default ExchangeRateTable;