export enum AppSettingsAction {
  UpdateBiometricSetting = 'UpdateBiometricSetting',
  UpdatePushnotificationsSettings = 'UpdatePushnotificationsSettings',
  UpdateAdvancedOptions = 'UpdateAdvancedOptions',
  UpdateSelectedLanguage = 'UpdateSelectedLanguage',
  SetIsToast = 'SetIsToast',
  SetFCMToken = 'SetFCMToken',
}

export interface UpdateBiometricSettingAction {
  type: AppSettingsAction.UpdateBiometricSetting;
  value: boolean;
}

export interface UpdatePushnotificationsSettingsAction {
  type: AppSettingsAction.UpdatePushnotificationsSettings;
  value: boolean;
}

export interface UpdateAdvancedOptionsAction {
  type: AppSettingsAction.UpdateAdvancedOptions;
  value: boolean;
}

export interface SetIsToastAction {
  type: AppSettingsAction.SetIsToast;
  value: boolean;
}

export interface SetFCMTokenAction {
  type: AppSettingsAction.SetFCMToken;
  value: string;
}

export interface UpdateSelectedLanguageAction {
  type: AppSettingsAction.UpdateSelectedLanguage;
  value: string;
}

export type AppSettingsActionType =
  | UpdateBiometricSettingAction
  | UpdatePushnotificationsSettingsAction
  | UpdateAdvancedOptionsAction
  | UpdateSelectedLanguageAction
  | SetIsToastAction
  | SetFCMTokenAction;

export const updateBiometricSetting = (value: boolean): UpdateBiometricSettingAction => ({
  type: AppSettingsAction.UpdateBiometricSetting,
  value,
});

export const updatePushnotificationsSetting = (value: boolean): UpdatePushnotificationsSettingsAction => ({
  type: AppSettingsAction.UpdatePushnotificationsSettings,
  value,
});

export const updateAdvancedOptions = (value: boolean): UpdateAdvancedOptionsAction => ({
  type: AppSettingsAction.UpdateAdvancedOptions,
  value,
});

export const updateSelectedLanguage = (value: string): UpdateSelectedLanguageAction => ({
  type: AppSettingsAction.UpdateSelectedLanguage,
  value,
});

export const setIsToast = (value: boolean): SetIsToastAction => ({
  type: AppSettingsAction.SetIsToast,
  value,
});

export const setFCMToken = (value: string): SetFCMTokenAction => ({
  type: AppSettingsAction.SetFCMToken,
  value,
});
