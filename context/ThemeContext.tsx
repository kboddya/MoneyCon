import { createContext, PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Appearance, ScaledSize, StyleSheet, useColorScheme, useWindowDimensions, View, ColorSchemeName, PixelRatio } from "react-native";
import { SplashScreen } from "expo-router";
import { UserCacheService } from "@/services/CacheService";
import ToastProvider from "toastify-react-native";
import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient";

SplashScreen.preventAutoHideAsync();

type ThemeContextType = {
    isLightMode: boolean;
    theme: StyleSheet.NamedStyles<any>;
    mode: ColorSchemeName;
    modeToggle?: (modeIndex: Number) => Promise<void>;
    windowDimensions: ScaledSize;
    headerTheme: ExtendedStackNavigationOptions;
}

const ThemeContext = createContext<ThemeContextType>({
    isLightMode: true,
    mode: null,
    theme: StyleSheet.create({}),
    windowDimensions: { width: 0, height: 0, scale: 1, fontScale: 1 },
    headerTheme: {}
})

const ThemeConstants: Record<string, string | number> = {
    lightContainerBG: "#EFEFEF",
    darkContainerBG: "#272525",
    lightMainText: "#4C4C4C",
    darkMainText: "#ABABAB",
    lightBorder: "#DDDDDD",
    darkBorder: "#ABABAB",
    fontSizeSmall: 14,
    fontSizeMedium: 18,
    headerFontSize: 19,
    borderRadius: 10
}

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [mode, setMode] = useState<ColorSchemeName>(null);
    const [isLightMode, setIsLightMode] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const systemColorScheme = useColorScheme();
    const windowDimensions = useWindowDimensions();

    useLayoutEffect(() => {
        if (mode === null) setIsLightMode(systemColorScheme !== "dark");
        else setIsLightMode(mode === "light");
        Appearance.setColorScheme(mode);
    }, [mode, systemColorScheme]);

    useLayoutEffect(() => {
        (async () => {
            const savedMode = await UserCacheService.getThemeMode();
            setMode(savedMode);
            setIsLoaded(true);
        })();
    }, []);

    const modeToggle = async (modeIndex: Number) => {
        let newMode: ColorSchemeName;
        switch (modeIndex) {
            case 0: {
                newMode = "light";
                break;
            }
            case 1: {
                newMode = null;
                break;
            }
            case 2: {
                newMode = "dark";
                break;
            }
            default: {
                newMode = null;
                break;
            }
        }
        setMode(newMode);
        await UserCacheService.setThemeMode(newMode);
    }

    useEffect(() => {
        if (isLoaded) SplashScreen.hideAsync();
    }, [isLoaded]);

    const theme = useMemo(() => StyleSheet.create({
        flexContainerWithBG: {
            flex: 1,
            backgroundColor: isLightMode ? "white" : "black"
        },
        containerBG: {
            backgroundColor: (isLightMode ? ThemeConstants.lightContainerBG : ThemeConstants.darkContainerBG) as string
        },
        smallTextSize: {
            fontSize: (ThemeConstants.fontSizeSmall) as number * windowDimensions.fontScale
        },
        mediumTextSize: {
            fontSize: (ThemeConstants.fontSizeMedium) as number * windowDimensions.fontScale
        },
        headerTextSize: {
            fontSize: (ThemeConstants.headerFontSize) as number * windowDimensions.fontScale
        },
        borderColor: {
            backgroundColor: (isLightMode ? ThemeConstants.lightBorder : ThemeConstants.darkBorder) as string
        },
        mainTextColor: {
            color: (isLightMode ? ThemeConstants.lightMainText : ThemeConstants.darkMainText) as string
        },
        borderRadius: {
            borderRadius: (ThemeConstants.borderRadius) as number
        },
        topBorder: {
            width: "100%",
            height: 0.2,
            backgroundColor: (isLightMode ? "#4C4C4C" : ThemeConstants.darkBorder) as string,
            opacity: 0.5
        }
    }), [isLightMode, windowDimensions]);


    const headerTheme: ExtendedStackNavigationOptions = useMemo(() => ({
        headerTintColor: isLightMode ? "#4C4C4C" : "#ABABAB", // White text color for the header
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: PixelRatio.roundToNearestPixel(20 * windowDimensions.fontScale),
        },
        headerStyle: {
            backgroundColor: isLightMode ? "white" : "black",
        },
        headerShadowVisible: false,
    }), [isLightMode, windowDimensions]);


    const values = {
        isLightMode,
        theme,
        mode,
        modeToggle,
        windowDimensions,
        headerTheme
    }
    return (
        <ThemeContext.Provider value={values}>
            <View style={theme.flexContainerWithBG}>
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

export { ThemeContext, ThemeProvider };