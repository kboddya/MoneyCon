import { useThemeContext } from "@/context/ThemeContext";
import { ExchangeRateRowType } from "../types";
import CurrencyCol from "./CurrencyCol";
import DataCol from "./DataCol";
import RowContainer from "./RowContainer";

interface DataRowProps {
    data: ExchangeRateRowType,
    isLatest?: boolean
}

function DataRow({ data, isLatest }: DataRowProps) {
    const { colors } = useThemeContext();
    if (data.currencyCode === "?") return;
    return (
        <RowContainer style={!isLatest ? {
            paddingVertical: "5%",
            borderBottomColor: colors.border,
            borderBottomWidth: 1
        } : { paddingTop: "5%" }}>
            <CurrencyCol currency={data.currencyCode} />
            <DataCol data={[data.currentVal, data.percentVal]} />
        </RowContainer>
    );
}

export default DataRow;