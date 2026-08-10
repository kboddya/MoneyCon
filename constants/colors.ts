import { ColorSchemeName, ColorValue } from "react-native"


const lightColors = {
    appColor: "white",
    containerBg: "#EFEFEF",
    mainText: "#4C4C4C",
    border: "#DDDDDD",
    tint: "#A4A4A4",
    headerBackground: "white",
    headerTint: "#4C4C4C",
    segmentControlBg: "#EEEEF0",
    segmentControlTint: "#ABABAB",
    segmentControlActive: "#182424"
} as const;

const darkColors = {
    appColor: "black",
    containerBg: "#272525",
    mainText: "#ABABAB",
    border: "#ABABAB",
    tint: "#ACACAC",
    headerBackground: "black",
    headerTint: "#ABABAB",
    segmentControlBg: "#1C1C1F",
    segmentControlTint: "#4C4C4C",
    segmentControlActive: "#ABABAB"
} as const;

export type colorProperties = keyof typeof lightColors | keyof typeof darkColors;

type colorsType = Record<ColorSchemeName, Record<colorProperties, ColorValue>>;


export const colors: colorsType = {
    dark: darkColors,
    light: lightColors,
    unspecified: lightColors
}