import HeaderTitle from "@/components/common/HeaderTitle";
import { useThemeContext } from "@/context/ThemeContext";

interface HeaderWithSearchProps {
	title: string;
	searchable?: boolean;
	searchHandler: (text?: string) => void;
	searchPlaceholder: string;
}

function HeaderWithSearch({
	title,
	searchable,
	searchHandler,
	searchPlaceholder,
}: HeaderWithSearchProps) {
	const { colors } = useThemeContext();
	return (
		<HeaderTitle
			title={title}
			headerSearchBarOptions={
				searchable
					? {
							placeholder: searchPlaceholder,
							onChangeText: (e) => {
								searchHandler(e.nativeEvent.text);
							},
							onCancelButtonPress: () => {
								searchHandler(undefined);
							},
							onClose: () => {
								searchHandler(undefined);
							},
							textColor: colors.mainText,
							hintTextColor: colors.textPlaceHolder,
							headerIconColor: colors.mainText,
						}
					: undefined
			}
		/>
	);
}

export default HeaderWithSearch;
