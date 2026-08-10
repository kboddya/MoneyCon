import SegmentControlComponent from "@/components/ui/SegmentControl";
import SettingsHeader from "@/components/ui/Settings/SettingsHeader";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import { useThemeContext } from "@/context/ThemeContext";

function AppearanceModeControl() {
    const {
        modeIndex,
        modeToggle,
    } = useThemeContext();
    return (
        <SettingsParameterContainer>
            <SettingsHeader>
                Appearance mode
            </SettingsHeader>
            <SegmentControlComponent
                key={"appearance-mode-control"}
                values={["Light", "System", "Dark"]}
                selectedIndex={modeIndex}
                onChange={event => {
                    const selectedIndex = event.nativeEvent.selectedSegmentIndex;
                    modeToggle && modeToggle(selectedIndex);
                }}
            />
        </SettingsParameterContainer>
    );
}

export default AppearanceModeControl;