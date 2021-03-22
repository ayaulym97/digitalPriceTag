import {Dimensions, Platform, PixelRatio} from 'react-native';
export const Theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: '#8F929D',
    lightGreen: '#E3FFE8',
    green: '#9CD9B8',
    lightRed: '#FFEAEA',
    borderRed: '#FFA4A4',
    borderGray: '#D4D7DF',
    red: '#D91A00',
    background: '#F7F8FB',
    primary: '#13152D',
    yellow: '#FFD400',
    blue: '#2E83C5',
    border: '#E4E7EE',
  },
};
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get(
  'window',
);

// based on iphone X's scale
const wscale = SCREEN_WIDTH / 375;
const hscale = SCREEN_HEIGHT / 812;

export function normalize(size, based = 'width') {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
