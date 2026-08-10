import { ScrollView } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from "expo-router/react-navigation"
import { sizes } from '@/constants/sizes';
import HeaderTitle from '@/components/common/HeaderTitle';
import HistoryIntervalControl from '@/features/settingsPage/components/HistoryIntervalControl';
import AppearanceModeControl from '@/features/settingsPage/components/AppearanceModeControl';
import CurrencyCounter from '@/features/settingsPage/components/CurrencyCounter';
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
            <ScrollView >
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