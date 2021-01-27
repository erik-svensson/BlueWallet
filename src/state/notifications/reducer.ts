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
}

const initialState: NotificationState = {
  error: '',
  email: '',
  pin: '',
  isNotificationEmailSet: false,
  isLoading: false,
  sessionToken: '',
  subscribedIds: [],
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
    case NotificationAction.CreateNotificationEmailFailure:
    case NotificationAction.VerifyNotificationEmailActionFailure:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case NotificationAction.DeleteNotificationEmailAction:
      return {
        ...state,
        email: '',
      };
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
      };
    case NotificationAction.SubscribeWalletSuccessAction:
      return {
        ...state,
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.UnsubscribeWalletSuccessAction:
      return {
        ...state,
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.AuthenticateEmailSuccessAction:
      return {
        ...state,
        sessionToken: '',
      };
    case NotificationAction.SubscribeWalletFailureAction:
    case NotificationAction.UnsubscribeWalletFailureAction:
    case NotificationAction.AuthenticateEmailFailureAction:
    case NotificationAction.CheckSubscriptionFailureAction:
    case NotificationAction.SetErrorAction:
      return {
        ...state,
        error: action.error,
      };
    case NotificationAction.CheckSubscriptionSuccessAction: {
      return {
        ...state,
        subscribedIds: action.payload.subscribedIds,
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
