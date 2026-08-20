import { View } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import CurrencyList from '@/features/currencyList/components/CurrencyList';
import { useThemeContext } from '@/context/ThemeContext';
import { useCurrencyStore } from '@/stores';
import useCurrencySearch from '@/features/currencyList/hooks/useCurrencySearch';
import { useHeaderHeight } from "expo-router/react-navigation"
import HeaderWithSearch from '@/features/currencyList/components/HeaderWithSearch';

export default function ValPicker() {
    const params = useLocalSearchParams() as { ID?: string };

    const { colors } = useThemeContext();


    const { selectCurrencyValue } = useCurrencyStore();

    const { currencyList, searchedData, searchHandler } = useCurrencySearch();

    const headerHeight = useHeaderHeight();

    const ID = params?.ID ?? 0;

    const idInInt = Number(ID ?? NaN);

    const onSelectHandler = (toUpdate: string[]): void => {
        if (!Number.isNaN(idInInt)) {
            selectCurrencyValue(toUpdate[0], idInInt);
        }
        return router.back();
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.appColor,
            paddingTop: headerHeight,
            alignItems: "center"
        }}
        >
            <HeaderWithSearch searchHandler={searchHandler} searchable={!!currencyList?.length} />
            {currencyList && <CurrencyList
                data={searchedData !== undefined ? searchedData : currencyList}
                onSelect={onSelectHandler}
                isSearching={searchedData !== undefined}
            />}
        </View>
    );
}
