import { createPersistReducer } from 'app/helpers/reduxPersist';

import { NotificationAction, NotificationActionType } from './actions';

export const NOTIFICATIONS_REDUCER_NAME = 'notifications';

export interface NotificationState {
  email: string;
  error: string;
  pin: string;
  isNotificationEmailSet: boolean;
  isLoading: boolean;
  sessionToken: string;
  subscribedIds: string[];
  resendStartTime: number;
}

const initialState: NotificationState = {
  error: '',
  email: '',
  pin: '',
  isNotificationEmailSet: false,
  isLoading: false,
  sessionToken: '',
  subscribedIds: [],
  resendStartTime: 0,
};

const reducer = (state = initialState, action: NotificationActionType): NotificationState => {
  switch (action.type) {
    case NotificationAction.CreateNotificationEmailSuccess:
      return {
        ...state,
        error: '',
        email: action.payload.email,
        isNotificationEmailSet: true,
        isLoading: false,
        pin: '',
      };
    case NotificationAction.UnsubscribeWalletAction:
    case NotificationAction.SubscribeWalletAction:
    case NotificationAction.UpdateNotificationEmailAction:
      return {
        ...state,
        isLoading: true,
      };
    case NotificationAction.SubscribeWalletFailureAction:
    case NotificationAction.UnsubscribeWalletFailureAction:
    case NotificationAction.CheckSubscriptionFailureAction:
    case NotificationAction.CreateNotificationEmailFailure:
    case NotificationAction.VerifyNotificationEmailActionFailure:
    case NotificationAction.UpdateNotificationEmailFailureAction:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case NotificationAction.AuthenticateEmailFailureAction:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case NotificationAction.DeleteNotificationEmailAction:
      return {
        ...state,
        email: '',
        pin: '',
        subscribedIds: [],
      };
    case NotificationAction.CheckSubscriptionAction:
    case NotificationAction.VerifyNotificationEmailAction:
      return {
        ...state,
        isLoading: true,
      };
    case NotificationAction.VerifyNotificationEmailActionSuccess:
      return {
        ...state,
        pin: action.payload.pin,
        isLoading: false,
        error: '',
      };
    case NotificationAction.SubscribeWalletSuccessAction:
    case NotificationAction.UnsubscribeWalletSuccessAction:
    case NotificationAction.UpdateNotificationEmailSuccessAction:
      return {
        ...state,
        isLoading: false,
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.AuthenticateEmailSuccessAction:
      return {
        ...state,
        error: '',
      };
    case NotificationAction.SetErrorAction:
      return {
        ...state,
        error: action.error,
      };
    case NotificationAction.CheckSubscriptionSuccessAction: {
      return {
        ...state,
        error: '',
        subscribedIds: action.payload.subscribedIds,
        isLoading: false,
      };
    }
    case NotificationAction.StartResendAction: {
      return {
        ...state,
        resendStartTime: new Date().getTime(),
      };
    }
    case NotificationAction.ResetResendTimeAction: {
      return {
        ...state,
        resendStartTime: 0,
      };
    }
    default:
      return state;
  }
};

export const notificationReducer = createPersistReducer(reducer, {
  key: NOTIFICATIONS_REDUCER_NAME,
  whitelist: ['email', 'isNotificationEmailSet', 'resendStartTime'],
});
