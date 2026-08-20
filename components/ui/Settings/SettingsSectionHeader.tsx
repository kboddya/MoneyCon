import SectionHeader from "@/components/common/SectionHeader";
import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface SettingsSectionHeaderProps {
    children: string;
    isResetable?: boolean;
    onReset?: () => void;
}

function SettingsSectionHeader({ children, isResetable, onReset }: SettingsSectionHeaderProps) {
    const { colors } = useThemeContext();

    const icon = isResetable && <MaterialCommunityIcons
        name="lock-reset"
        size={sizes.headerFontSize}
        color={colors.mainText}
    />;

    const onPress = isResetable ? onReset : undefined;

    return (
        <SectionHeader
            style={{ paddingHorizontal: "4%" }}
            onPress={onPress}
            icon={icon}>
            {children}
        </SectionHeader>
    );
}

export default SettingsSectionHeader;