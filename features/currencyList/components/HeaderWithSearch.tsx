import HeaderTitle from "@/components/common/HeaderTitle";
import { useThemeContext } from "@/context/ThemeContext";

function HeaderWithSearch({ searchable, searchHandler }: { searchable?: boolean, searchHandler: (text?: string) => void }) {
    const { colors } = useThemeContext()
    return (
        <HeaderTitle
            title="Change Currency"
            headerSearchBarOptions={searchable ? {
                placeholder: "Search currency...",
                onChangeText: async (e) => {
                    searchHandler(e.nativeEvent.text)
                },

                onCancelButtonPress: () => {
                    searchHandler(undefined);
                },
                onClose: () => {
                    searchHandler(undefined);
                },
                textColor: colors.mainText,
                headerIconColor: colors.mainText
            } : undefined}
        />
    );
}

export default HeaderWithSearch;