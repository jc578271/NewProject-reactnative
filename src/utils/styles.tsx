import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import {StatusBar} from 'react-native';

export const statusBarHeight = isIphoneX()
  ? getStatusBarHeight() + 20
  : StatusBar.currentHeight + 16;

export const bottomSpaceHeight = isIphoneX() ? getStatusBarHeight() + 10 : 16;
