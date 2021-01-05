import { NotificationAction, NotificationActionType } from './actions';

export interface NotificationState {
  email: string;
  error: string;
  pin: string;
  isNotificationEmailSet: boolean;
  isNotificationEmailSkip: boolean;
  isLoading: boolean;
  sessionToken: string;
}

const initialState: NotificationState = {
  error: '',
  email: '',
  pin: '',
  isNotificationEmailSet: false,
  isNotificationEmailSkip: false,
  isLoading: true,
  sessionToken: '',
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
      };
    case NotificationAction.SetNotificationEmailSuccess:
      return {
        ...state,
        error: '',
        email: action.payload.email,
        isLoading: false,
      };
    case NotificationAction.CreateNotificationEmailFailure:
    case NotificationAction.SetNotificationEmailFailure:
      return {
        ...state,
        error: action.error,
      };
    case NotificationAction.DeleteNotificationEmailAction:
      return {
        ...state,
        email: '',
      };
    case NotificationAction.SkipNotificationEmailAction:
      return {
        ...state,
        email: '',
        isNotificationEmailSet: true,
        isNotificationEmailSkip: true,
      };
    case NotificationAction.VerifyNotificationEmailAction:
      return {
        ...state,
        pin: action.payload.pin,
      };
    case NotificationAction.SubscribeWalletSuccessAction:
      return {
        ...state,
        sessionToken: action.payload.sessionToken,
      };
    case NotificationAction.AuthenticateEmailSuccessAction:
      return {
        ...state,
        sessionToken: '',
      };
    default:
      return state;
  }
};
