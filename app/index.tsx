import { RefreshControl, ScrollView } from "react-native";
import ExchangeRateTable from "@/features/currencyConvertor/components/ExchangeRateTable";
import UpdateAt from "@/features/currencyConvertor/components/UpdateAt";
import CurrencyConvertorRows from "@/features/currencyConvertor/components/CurrencyRow";
import HeaderTitle from "@/components/common/HeaderTitle";
import PageContainer from "@/components/common/PageContainer";
import useExchangeRateContext from "@/stores/ExchangeRateStore";
import Toolbar from "@/features/currencyConvertor/components/Toolbar";


export default function Index() {
    const { isLoading, updateExchangeRate } = useExchangeRateContext();
    return (
        <PageContainer>
            <HeaderTitle title={"MoneyCon"} />
            <Toolbar />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                keyboardDismissMode={"interactive"}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => updateExchangeRate()}
                    />
                }
            >
                <UpdateAt />
                <CurrencyConvertorRows />
                <ExchangeRateTable />
            </ScrollView>
        </PageContainer>
    );
}