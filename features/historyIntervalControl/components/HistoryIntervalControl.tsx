import SegmentControlComponent from "@/components/ui/SegmentControl";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import SettingsSectionHeader from "@/components/ui/Settings/SettingsSectionHeader";
import { historyIntervalsValue } from "../constants";
import useHistoryControl from "../hooks/useHistoryControl";

function HistoryIntervalControl() {
    const [interval, changeInterval] = useHistoryControl();
    return (
        <SettingsParameterContainer>
            <SettingsSectionHeader isResetable={interval !== -1} onReset={changeInterval}>
                Exchange history interval
            </SettingsSectionHeader>
            <SegmentControlComponent
                key={"history-diapason-control"}
                values={historyIntervalsValue}
                selectedIndex={interval}
                onChange={event => changeInterval(event.nativeEvent.selectedSegmentIndex)}
            />
        </SettingsParameterContainer>
    );
}

export default HistoryIntervalControl;