import { useThemeContext } from "@/context/ThemeContext";
import { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { NativeSyntheticEvent } from "react-native";

function useThemeSwitcher() {
    const {
        modeIndex,
        modeToggle,
    } = useThemeContext();

    const switchMode = (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>): void => {
        const selectedIndex = event.nativeEvent.selectedSegmentIndex;
        modeToggle && modeToggle(selectedIndex);
    }
    return [modeIndex, switchMode] as const;
}

export default useThemeSwitcher;