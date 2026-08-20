import SegmentControlComponent from "@/components/ui/SegmentControl";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import SettingsSectionHeader from "@/components/ui/Settings/SettingsSectionHeader";
import useThemeSwitcher from "../hooks/useThemeSwitcher";

function AppearanceModeControl() {
    const [currentMode, changeMode] = useThemeSwitcher();
    return (
        <SettingsParameterContainer>
            <SettingsSectionHeader>
                Appearance mode
            </SettingsSectionHeader>
            <SegmentControlComponent
                key={"appearance-mode-control"}
                values={["Light", "System", "Dark"]}
                selectedIndex={currentMode}
                onChange={changeMode}
            />
        </SettingsParameterContainer>
    );
}

export default AppearanceModeControl;