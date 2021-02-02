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
  failedTries: number;
}

const initialState: NotificationState = {
  error: '',
  email: '',
  pin: '',
  isNotificationEmailSet: false,
  isLoading: false,
  sessionToken: '',
  subscribedIds: [],
  failedTries: 0,
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
      return {
        ...state,
        failedTries: 0,
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
        failedTries: state.failedTries + 1,
        isLoading: false,
      };
    case NotificationAction.DeleteNotificationEmailAction:
      return {
        ...state,
        email: '',
        pin: '',
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
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.AuthenticateEmailSuccessAction:
      return {
        ...state,
        error: '',
        sessionToken: '',
        failedTries: 0,
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
    default:
      return state;
  }
};

export const notificationReducer = createPersistReducer(reducer, {
  key: NOTIFICATIONS_REDUCER_NAME,
  whitelist: ['email', 'isNotificationEmailSet'],
});
