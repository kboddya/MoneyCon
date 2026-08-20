import CounterContainer from "./CounterContainer";
import ChangeButton from "./ChangeButton";
import CurrentCount from "./CurrentCount";

interface CounterProps {
    onChange: (val: number) => void;
    currentValue: number
    maxValue?: number;
    minValue?: number;
}

function Counter({ onChange, currentValue, maxValue, minValue }: CounterProps) {
    const cannotBeLess = currentValue <= (minValue ?? -Infinity);
    const cannotBeMode = currentValue >= (maxValue ?? +Infinity);
    return (
        <CounterContainer>
            <ChangeButton disabled={cannotBeLess} onPress={() => onChange(-1)} title="less" />
            <CurrentCount currentCount={currentValue} />
            <ChangeButton disabled={cannotBeMode} onPress={() => onChange(1)} title="more" />
        </CounterContainer>
    );
}

export default Counter;