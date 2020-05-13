import { AppSettings } from 'app/consts';

export enum AppSettingsAction {
  UpdateBiometricSetting = 'UpdateBiometricSetting',
}

export interface CreateAppPinAction {
  type: AppSettingsAction.CreateAppPin;
}

export interface UpdateBiometricSettingAction {
  type: AppSettingsAction.UpdateBiometricSetting;
  value: boolean;
}

export type AppSettingsActionType = CreateAppPinAction | UpdateBiometricSettingAction;

export const setUpPin = (): CreateAppPinAction => ({
  type: AppSettingsAction.CreateAppPin,
});

export const updateBiometricSetting = (value: boolean): UpdateBiometricSettingAction => ({
  type: AppSettingsAction.UpdateBiometricSetting,
  value,
});
