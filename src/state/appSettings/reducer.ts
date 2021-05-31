import { CONST } from 'app/consts';

import { AppSettingsAction, AppSettingsActionType } from './actions';

export interface AppSettingsState {
  isBiometricsEnabled: boolean;
  isAdvancedOptionsEnabled: boolean;
  isPushnotificationsEnabled: boolean;
  language: string;
  isToast: boolean;
  fcmToken: string;
}

const initialState: AppSettingsState = {
  isBiometricsEnabled: false,
  isAdvancedOptionsEnabled: false,
  isPushnotificationsEnabled: true,
  language: CONST.defaultLanguage,
  isToast: false,
  fcmToken: '',
};

export const appSettingsReducer = (state = initialState, action: AppSettingsActionType): AppSettingsState => {
  switch (action.type) {
    case AppSettingsAction.UpdateBiometricSetting:
      return {
        ...state,
        isBiometricsEnabled: action.value,
      };
    case AppSettingsAction.UpdateAdvancedOptions:
      return {
        ...state,
        isAdvancedOptionsEnabled: action.value,
      };
    case AppSettingsAction.UpdatePushnotificationsSettings:
      return {
        ...state,
        isPushnotificationsEnabled: action.value,
      };
    case AppSettingsAction.SetIsToast:
      return {
        ...state,
        isToast: action.value,
      };
    case AppSettingsAction.SetFCMToken:
      return {
        ...state,
        fcmToken: action.value,
      };
    case AppSettingsAction.UpdateSelectedLanguage:
      return {
        ...state,
        language: action.value,
      };
    default:
      return state;
  }
};
