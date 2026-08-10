import { sizes } from "@/constants/sizes";
import { useThemeContext } from "@/context/ThemeContext";
import { Link } from "expo-router";

function MadeWithLove() {
    const { colors } = useThemeContext()
    return (<Link style={[
        {
            fontSize: sizes.fontSizeSmall,
            color: colors.mainText,
            backgroundColor: colors.appColor,
            paddingVertical: "2%",
            textAlign: "center"
        }
    ]}
        href="https://github.com/kboddya/MoneyCon"
    >
        Made with 🫶 by kboddya
    </Link>);
}

export default MadeWithLove;