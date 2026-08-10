import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 800;

const scaleWidth = (size: number, width: number = SCREEN_WIDTH): number =>
    (width / guidelineBaseWidth) * size;

const scaleHeight = (size: number, height: number = SCREEN_HEIGHT): number =>
    (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, width?: number, factor: number = 0.5): number =>
    size + (scaleWidth(size, width) - size) * factor;

export { scaleWidth, scaleHeight, moderateScale };