import SectionHeader from "@/components/common/SectionHeader";
import RowContainer from "./RowContainer";
import CurrencyCol from "./CurrencyCol";
import DataCol from "./DataCol";

function Header({ mainCurrencyCode }: { mainCurrencyCode: string }) {
    return (
        <>
            <SectionHeader style={{ justifyContent: "center", marginBottom: "3%" }} textStyle={{ fontWeight: "700" }}>
                Exchange Rates
            </SectionHeader>

            <RowContainer>
                <CurrencyCol
                    currency={mainCurrencyCode}
                    currencyStyle={{
                        fontWeight: "500"
                    }}
                />
                <DataCol
                    data={["Rares", "Changed"]}
                    textStyle={{ fontWeight: '500' }}
                />
            </RowContainer>
        </>
    );
}

export default Header;