import { NativeModules, Platform } from 'react-native';

import { CONST } from 'app/consts';

export const preventScreenshots = () => {
  if (Platform.OS === CONST.ios) return;
  return NativeModules.PreventScreenshotModule.forbid();
};

export const allowScreenshots = () => {
  if (Platform.OS === CONST.ios) return;
  return NativeModules.PreventScreenshotModule.allow();
};
