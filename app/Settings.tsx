import { ScrollView } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { useHeaderHeight } from "expo-router/react-navigation"
import HeaderTitle from '@/components/common/HeaderTitle';
import HistoryIntervalControl from '@/features/historyIntervalControl/components/HistoryIntervalControl';
import AppearanceModeControl from '@/features/appearanceModeControl';
import CurrencyCounter from '@/features/currencyCountControl/components/CurrencyCounter';
import PageContainer from '@/components/common/PageContainer';

export default function SettingsScreen() {
    const {
        modeIndex,
        modeToggle,
        colors,
    } = useThemeContext();

    const headerHeight = useHeaderHeight()

    return (
        <PageContainer>
            <ScrollView style={{ paddingHorizontal: "7%" }}>
                <HeaderTitle
                    title='Settings'
                    headerShadowVisible={false}
                    headerTitleAlign="center"
                    headerBackTitle="Back"
                />

                <CurrencyCounter />
                <HistoryIntervalControl />
                <AppearanceModeControl />


            </ScrollView >
        </PageContainer >
    );
}