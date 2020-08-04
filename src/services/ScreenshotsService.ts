import { NativeModules } from 'react-native';

export const preventScreenshots = async () => await NativeModules.PreventScreenshotModule.forbid();
export const allowScreenshots = async () => await NativeModules.PreventScreenshotModule.allow();
