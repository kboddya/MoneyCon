import { scaleHeight, scaleWidth, moderateScale } from "@/utils/responsive";
import { useWindowDimensions } from "react-native";

function useScalable() {
    const { fontScale, height, width } = useWindowDimensions();

    return {
        width,
        height,
        fontScale,
        scale: (size: number): number => scaleWidth(size, width),
        verticalScale: (size: number): number => scaleHeight(size, height),
        moderate: (size: number, factor?: number): number => moderateScale(size, width, factor),
        scaleFont: (size: number): number => size * Math.min(1.5, fontScale),
    };
}

export default useScalable;