import { Platform, RefreshControl, ScrollView } from "react-native";
import HeaderTitle from "@/components/common/HeaderTitle";
import PageContainer from "@/components/common/PageContainer";
import ExchangeRateTable from "@/features/exchangeRateTable";
import CurrencyConvertorRows from "@/features/currencyCalculate";
import UpdateAt from "@/features/updateAt";
import useRatesUpdater from "@/hooks/useRatesUpdater";
import { router, Stack } from "expo-router";
import MoreHoriz from "@expo/material-symbols/more_horiz.xml";



export default function Index() {
    const [isLoading, updateExchangeRates] = useRatesUpdater()
    return (
        <PageContainer>
            <HeaderTitle title={"MoneyCon"} />
            <Stack.Toolbar placement="right">
                <Stack.Toolbar.Button
                    icon={Platform.OS === "android" ? MoreHoriz : 'ellipsis'}
                    onPress={() => router.push("/Settings")}
                />
            </Stack.Toolbar>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingHorizontal: "7%" }}
                keyboardDismissMode={"interactive"}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={updateExchangeRates}
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