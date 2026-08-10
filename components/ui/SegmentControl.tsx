import SegmentedControl, { FontStyle, NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { useThemeContext } from "@/context/ThemeContext";
import { memo } from "react";
import { NativeSyntheticEvent, ViewStyle, useWindowDimensions } from "react-native";
import { sizes } from "@/constants/sizes";
import useScalable from "@/hooks/useScalable";
import { SettingsControlStyles } from "@/constants/styles";

interface SegmentControlProps {
    values: string[];
    selectedIndex: number;
    onChange: (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => void;
}

const SegmentControlComponent = memo(({ values, selectedIndex, onChange }: SegmentControlProps) => {
    const { colors } = useThemeContext();
    const { scale } = useScalable()
    return (
        <SegmentedControl
            values={values}
            selectedIndex={selectedIndex}
            style={[SettingsControlStyles.selectionControlStyle, { height: scale(45) }]}
            fontStyle={{ color: colors.mainText, fontSize: sizes.fontSizeMedium, } as FontStyle}
            tintColor={colors.segmentControlTint as string}
            activeFontStyle={{ color: colors.segmentControlActive, fontSize: sizes.fontSizeMedium, fontWeight: "bold" } as FontStyle}
            sliderStyle={{ borderRadius: 20 }}
            tabIndex={-1}
            onChange={onChange}
        />
    )
})

export default SegmentControlComponent;