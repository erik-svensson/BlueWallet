import { NotificationAction, NotificationActionType } from './actions';

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
  isLoading: true,
  sessionToken: '',
  subscribedIds: [],
};

export const notificationReducer = (state = initialState, action: NotificationActionType): NotificationState => {
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
      };
    case NotificationAction.DeleteNotificationEmailAction:
      return {
        ...state,
        email: '',
        pin: '',
      };
    case NotificationAction.VerifyNotificationEmailActionSuccess:
      return {
        ...state,
        pin: action.payload.pin,
      };
    case NotificationAction.SubscribeWalletSuccessAction:
      return {
        ...state,
        error: '',
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.UnsubscribeWalletSuccessAction:
      return {
        ...state,
        error: '',
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.AuthenticateEmailSuccessAction:
      return {
        ...state,
        error: '',
        sessionToken: '',
      };
    case NotificationAction.SubscribeWalletFailureAction:
    case NotificationAction.UnsubscribeWalletFailureAction:
    case NotificationAction.AuthenticateEmailFailureAction:
    case NotificationAction.CheckSubscriptionFailureAction:
      return {
        ...state,
        error: action.error,
      };
    case NotificationAction.CheckSubscriptionSuccessAction: {
      return {
        ...state,
        error: '',
        subscribedIds: action.payload.subscribedIds,
      };
    }

    default:
      return state;
  }
};
