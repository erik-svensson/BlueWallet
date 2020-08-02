import JailMonkey from 'jail-monkey';
import { Platform, Alert } from 'react-native';

import { CONST } from 'app/consts';

const i18n = require('../../loc');

export const isIos = () => Platform.OS === CONST.ios;
export const isAndroid = () => Platform.OS === CONST.android;

export const isDeviceSecured = () => {
  if (JailMonkey.isJailBroken()) {
    if (isIos()) Alert.alert(i18n.security.jailBrokenPhone);
    else if (isAndroid()) Alert.alert(i18n.security.rootedPhone);
  }
};
