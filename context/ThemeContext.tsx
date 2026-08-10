import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react";
import { Appearance, useColorScheme, View, ColorSchemeName, ColorValue } from "react-native";
import ToastProvider from "toastify-react-native";
import { colorProperties, colors } from "@/constants/colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type ThemeContextType = {
    // modeIndex: 0 = light, 1 = system, 2 = dark
    modeIndex: number;
    mode: ColorSchemeName;
    modeToggle: (modeIndex: number) => void;
    colors: Record<colorProperties, ColorValue>;
    isLightMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    modeIndex: 1,
    mode: "unspecified",
    modeToggle: (_i: number) => { },
    colors: colors['unspecified'],
    isLightMode: true,
})

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { getItem, setItem } = useAsyncStorage("appearance");
    const [modeIndex, setModeIndex] = useState<number>(1); // default: System
    const systemColorScheme = useColorScheme();

    const modes: ColorSchemeName[] = ["light", "unspecified", "dark"]

    const mode: ColorSchemeName = modeIndex === 1 ? systemColorScheme : (modes[modeIndex] ?? "unspecified");

    const isLightMode = mode === "light";

    const modeToggle = (index: number) => {
        const clamped = Math.max(0, Math.min(2, index));
        const selectedMode = modes[clamped];
        Appearance.setColorScheme(selectedMode);
        setModeIndex(clamped);
        setItem(clamped.toString());
    }

    const values: ThemeContextType = useMemo(() => ({
        modeIndex,
        mode,
        modeToggle,
        colors: colors[mode],
        isLightMode
    }), [modeIndex, systemColorScheme]);

    useLayoutEffect(() => {
        getItem().then(v => {
            if (v === null) return;
            const parsed = parseInt(v, 10);
            if (!isNaN(parsed)) {
                const clamped = Math.max(0, Math.min(2, parsed));
                setModeIndex(clamped);
            }
        });
    }, [])

    return (
        <ThemeContext.Provider value={values}>
            <View style={{ backgroundColor: colors[mode].appColor, flex: 1 }}>
                {children}
                <ToastProvider
                    position="bottom"
                    showCloseIcon={false}
                    showProgressBar={false}
                    theme={isLightMode ? "light" : "dark"}
                    useModal={false}
                />
            </View>
        </ThemeContext.Provider>
    )
}

const useThemeContext = () => useContext(ThemeContext);

export { useThemeContext, ThemeProvider };