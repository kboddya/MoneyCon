import useCurrencyCalc from "@/features/currencyConvertor/hooks/useCurrencyCalc";
import CurrencyInputRow from "./CurrencyInputRow";
import { router } from "expo-router";

function CurrencyConvertorRows() {
    const { selectedCurrencyCodes, focusedBox, data, setFocusedBox, onSubmitEditingHandler, onTextChangeHandler } = useCurrencyCalc();
    return (
        <>
            {
                selectedCurrencyCodes.map((value, index) => {
                    const focused = focusedBox === index;
                    return (
                        <CurrencyInputRow
                            key={`CurrencyRow-${value}-${index}`}
                            currencyCode={value}
                            data={data[index]}
                            onCurrencyPress={() => router.navigate(`/CurrencyPicker/${index}`)}
                            onTextChange={text => onTextChangeHandler(text)}
                            onFocus={() => setFocusedBox(index)}
                            onSubmitEditing={onSubmitEditingHandler}
                            isFocused={focused}
                        />
                    )
                })
            }
        </>
    );
}

export default CurrencyConvertorRows;