import Counter from "@/components/ui/Counter";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import SettingsSectionHeader from "@/components/ui/Settings/SettingsSectionHeader";
import useCurrencyCount from "../hooks/useCurrencyCount";

function CurrencyCounter() {
	const { count, maxValue, addCurrencyCountHandler, resetCounter } =
		useCurrencyCount();
	return (
		<SettingsParameterContainer>
			<SettingsSectionHeader isResetable={count !== 4} onReset={resetCounter}>
				Currency count
			</SettingsSectionHeader>
			<Counter
				onChange={addCurrencyCountHandler}
				currentValue={count}
				minValue={2}
				maxValue={maxValue}
			/>
		</SettingsParameterContainer>
	);
}

export default CurrencyCounter;
