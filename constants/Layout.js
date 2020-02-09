import { Dimensions, Platform } from 'react-native';
import { Header } from 'react-navigation';
import Constants from 'expo-constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isSmallDevice = width <= 375 && Constants.statusBarHeight <= 25;
const isSuperSmallDevice = width <= 320 && Constants.statusBarHeight <= 25;
const headerHeight = Header.HEIGHT - (isSmallDevice ? Constants.statusBarHeight : Constants.statusBarHeight / 2);

const _determineKeyboardHeight = (event) => {
  let statusBarHeight = 0;

  if (Constants.statusBarHeight > 20) {
    statusBarHeight = Constants.statusBarHeight - 20;
  }

  return event.nativeEvent.layout.height + statusBarHeight;
};

export default {
  window: {
    width,
    height
  },
  isSmallDevice,
  isSuperSmallDevice,
  headerHeight,
  statusBarHeight: Constants.statusBarHeight,
  device: Constants.platform[Platform.OS].model,
  getKeyboardOffset: (event) => _determineKeyboardHeight(event)
};
