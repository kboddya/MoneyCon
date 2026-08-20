import Counter from "@/components/ui/Counter";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import SettingsSectionHeader from "@/components/ui/Settings/SettingsSectionHeader";
import useCurrencyCount from "../hooks/useCurrencyCount";

function CurrencyCounter() {
    const [count, max, onChange] = useCurrencyCount();
    return (
        <SettingsParameterContainer>
            <SettingsSectionHeader isResetable={count !== 4} onReset={onChange}>
                Currency count
            </SettingsSectionHeader>
            <Counter
                onChange={onChange}
                currentValue={count}
                minValue={2}
                maxValue={max}
            />
        </SettingsParameterContainer>
    );
}

export default CurrencyCounter;