import SegmentedControl, { FontStyle, NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { ThemeContext } from "@/context/ThemeContext";
import { memo, useContext } from "react";
import { NativeSyntheticEvent, ViewStyle } from "react-native";

interface SegmentControlProps {
    values: string[];
    selectedIndex: number;
    onChange: (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => void;
    style: ViewStyle;
}

const SegmentControlComponent = memo((props: SegmentControlProps) => {
    const { isLightMode, theme, windowDimensions } = useContext(ThemeContext);

    return (
        <SegmentedControl
            values={props.values}
            selectedIndex={props.selectedIndex}
            style={[props.style, { height: 45 * windowDimensions.fontScale }]}
            fontStyle={{ ...theme.mainTextColor, ...theme.mediumTextSize } as FontStyle}
            tintColor={isLightMode ? "#ABABAB" : "#4C4C4C"}
            activeFontStyle={{ color: isLightMode ? "#182424" : "#ABABAB", ...theme.mediumTextSize, fontWeight: "bold" } as FontStyle}
            sliderStyle={{ borderRadius: 20 }}
            tabIndex={-1}
            onChange={props.onChange}
        />
    )
})

export default SegmentControlComponent;