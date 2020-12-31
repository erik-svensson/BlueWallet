import { ActionMeta } from 'app/consts';

export enum NotificationAction {
  CreateNotificationEmail = 'CreateNotificationEmail',
  CreateNotificationEmailSuccess = 'CreateNotificationEmailSuccess',
  CreateNotificationEmailFailure = 'CreateNotificationEmailFailure',
  DeleteNotificationEmailAction = 'DeleteNotificationEmailAction',
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

export interface DeleteNotificationEmailAction {
  type: NotificationAction.DeleteNotificationEmailAction;
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
  | DeleteNotificationEmailAction
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

export const deleteNotificationEmail = (): DeleteNotificationEmailAction => ({
  type: NotificationAction.DeleteNotificationEmailAction,
});

export const verifyNotificationEmail = (pin: string): VerifyNotificationEmailAction => ({
  type: NotificationAction.VerifyNotificationEmailAction,
  payload: { pin },
});
