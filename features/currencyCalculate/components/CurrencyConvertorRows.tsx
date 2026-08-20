import useCurrencyCalc from "../hooks/useCurrencyCalc";
import CurrencyInputRow from "./CurrencyInputRow";
import { router } from "expo-router";
import EmptyRow from "./EmptyRow";

function CurrencyConvertorRows() {
    const { selectedCurrencyCodes, focusedBox, data, setFocusedBox, onSubmitEditingHandler, onTextChangeHandler } = useCurrencyCalc();
    return (
        <>
            {
                selectedCurrencyCodes.map((value, index) => {
                    const focused = focusedBox === index;
                    const onCurrencyPress = () => router.navigate(`/CurrencyPicker/${index}`);
                    const key = `CurrencyRow-${value}-${index}`;
                    if (!value || value === "?") return (
                        <EmptyRow onCurrencyPress={onCurrencyPress} key={key} />
                    )
                    return (
                        <CurrencyInputRow
                            key={key}
                            currencyCode={value}
                            data={data[index]}
                            onCurrencyPress={onCurrencyPress}
                            onTextChange={text => onTextChangeHandler(text)}
                            onFocus={() => setFocusedBox(index)}
                            onSubmitEditing={onSubmitEditingHandler}
                            isFocused={focused}
                        />
                    )
                })
            }
            <EmptyRow onCurrencyPress={() => router.navigate(`/CurrencyPicker/${selectedCurrencyCodes.length}`)} />
        </>
    );
}

export default CurrencyConvertorRows;