import SegmentControlComponent from "@/components/ui/SegmentControl";
import SettingsHeader from "@/components/ui/Settings/SettingsHeader";
import SettingsParameterContainer from "@/components/ui/Settings/SettingsParameterContainer";
import useExchangeRateContext from "@/stores/ExchangeRateStore";

function HistoryIntervalControl() {
    const { historyDiapason, changeDiapasonHandler } = useExchangeRateContext();

    return (
        <SettingsParameterContainer>
            <SettingsHeader isResetable={historyDiapason !== 0} onPress={() => changeDiapasonHandler("0")}>
                Exchange history interval
            </SettingsHeader>
            <SegmentControlComponent
                key={"history-diapason-control"}
                values={["1 day", "7 days", "30 days"]}
                selectedIndex={historyDiapason === 1 ? 0 : historyDiapason === 7 ? 1 : historyDiapason === 30 ? 2 : -1}
                onChange={event => changeDiapasonHandler(event.nativeEvent.value)}
            />
        </SettingsParameterContainer>
    );
}

export default HistoryIntervalControl;