import { ActionMeta } from 'app/consts';

export enum NotificationAction {
  CreateNotificationEmail = 'CreateNotificationEmail',
  CreateNotificationEmailSuccess = 'CreateNotificationEmailSuccess',
  CreateNotificationEmailFailure = 'CreateNotificationEmailFailure',
  SetNotificationEmail = 'SetNotificationEmail',
  SetNotificationEmailSuccess = 'SetNotificationEmailSuccess',
  SetNotificationEmailFailure = 'SetNotificationEmailFailure',
  DeleteNotificationEmailAction = 'DeleteNotificationEmailAction',
  SkipNotificationEmailAction = 'SkipNotificationEmailAction',
  VerifyNotificationEmailAction = 'VerifyNotificationEmailAction',
}

export interface CreateNotificationEmailAction {
  type: NotificationAction.CreateNotificationEmail;
  payload: {
    email: string;
  };
  meta?: ActionMeta;
}

export interface CreateNotificationEmailSuccessAction {
  type: NotificationAction.CreateNotificationEmailSuccess;
  payload: {
    email: string;
  };
}

export interface CreateNotificationEmailFailureAction {
  type: NotificationAction.CreateNotificationEmailFailure;
  error: string;
}

export interface SetNotificationEmailAction {
  type: NotificationAction.SetNotificationEmail;
  payload: {
    email: string;
  };
  meta?: ActionMeta;
}

export interface SetNotificationEmailSuccessAction {
  type: NotificationAction.SetNotificationEmailSuccess;
  payload: {
    email: string;
  };
}

export interface SetNotificationEmailFailureAction {
  type: NotificationAction.SetNotificationEmailFailure;
  error: string;
}

export interface DeleteNotificationEmailAction {
  type: NotificationAction.DeleteNotificationEmailAction;
}

export interface SkipNotificationEmailAction {
  type: NotificationAction.SkipNotificationEmailAction;
}
export interface VerifyNotificationEmailAction {
  type: NotificationAction.VerifyNotificationEmailAction;
  payload: {
    pin: string;
  };
}

export type NotificationActionType =
  | CreateNotificationEmailAction
  | CreateNotificationEmailSuccessAction
  | CreateNotificationEmailFailureAction
  | SetNotificationEmailAction
  | SetNotificationEmailSuccessAction
  | SetNotificationEmailFailureAction
  | DeleteNotificationEmailAction
  | SkipNotificationEmailAction
  | VerifyNotificationEmailAction;

export const createNotificationEmail = (email: string, meta?: ActionMeta): CreateNotificationEmailAction => ({
  type: NotificationAction.CreateNotificationEmail,
  payload: { email },
  meta,
});

export const createNotificationEmailSuccess = (email: string): CreateNotificationEmailSuccessAction => ({
  type: NotificationAction.CreateNotificationEmailSuccess,
  payload: { email },
});

export const createNotificationEmailFailure = (error: string): CreateNotificationEmailFailureAction => ({
  type: NotificationAction.CreateNotificationEmailFailure,
  error,
});

export const setNotificationEmail = (email: string, meta?: ActionMeta): SetNotificationEmailAction => ({
  type: NotificationAction.SetNotificationEmail,
  payload: { email },
  meta,
});

export const setNotificationEmailSuccess = (email: string): SetNotificationEmailSuccessAction => ({
  type: NotificationAction.SetNotificationEmailSuccess,
  payload: { email },
});

export const setNotificationEmailFailure = (error: string): SetNotificationEmailFailureAction => ({
  type: NotificationAction.SetNotificationEmailFailure,
  error,
});

export const deleteNotificationEmail = (): DeleteNotificationEmailAction => ({
  type: NotificationAction.DeleteNotificationEmailAction,
});

export const skipNotificationEmail = (): SkipNotificationEmailAction => ({
  type: NotificationAction.SkipNotificationEmailAction,
});

export const verifyNotificationEmail = (pin: string): VerifyNotificationEmailAction => ({
  type: NotificationAction.VerifyNotificationEmailAction,
  payload: { pin },
});
