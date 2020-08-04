import { NativeModules } from 'react-native';

export const preventScreenshots = () => NativeModules.PreventScreenshotModule.forbid();
export const allowScreenshots = () => NativeModules.PreventScreenshotModule.allow();
