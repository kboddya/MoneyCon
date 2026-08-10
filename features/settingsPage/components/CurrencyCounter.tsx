import Counter from "@/components/ui/Counter";
import SettingsHeader from "@/components/ui/Settings/SettingsHeader";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import useCurrencyContext from "@/stores/CurrencyStore";
import useExchangeRateContext from "@/stores/ExchangeRateStore";

function CurrencyCounter() {
    const { currencyCount, addCurrencyCount } = useCurrencyContext()
    const { currencyList } = useExchangeRateContext();

    const currencyListLength = currencyList?.length;


    return (
        <SettingsParameterContainer>
            <SettingsHeader isResetable={currencyCount !== 4} onPress={() => addCurrencyCount(-currencyCount)}>
                Currency count
            </SettingsHeader>
            <Counter
                onChange={addCurrencyCount}
                currentValue={currencyCount}
                minValue={2}
                maxValue={currencyListLength}
                defaultValue={4}
            />
        </SettingsParameterContainer>
    );
}

export default CurrencyCounter;