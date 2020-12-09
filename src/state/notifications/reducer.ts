import { NotificationAction, NotificationActionType } from './actions';

export interface NotificationState {
  email: string;
  error: string;
  isNotificationEmailSet: boolean;
  isLoading: boolean;
}

const initialState: NotificationState = {
  error: '',
  email: '',
  isNotificationEmailSet: false,
  isLoading: true,
};

export const notificationReducer = (state = initialState, action: NotificationActionType): NotificationState => {
  switch (action.type) {
    case NotificationAction.CreateNotificationEmailSuccess:
      return {
        ...state,
        error: '',
        isNotificationEmailSet: true,
        isLoading: false,
      };
    case NotificationAction.CreateNotificationEmailFailure:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
