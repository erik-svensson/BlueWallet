import {
  SubscribePayload,
  AuthenticatePayload,
  SubscribeWalletSuccessPayload,
  CheckSubscriptionPayload,
} from 'app/api';
import { ActionMeta, Wallet } from 'app/consts';

export enum NotificationAction {
  CreateNotificationEmail = 'CreateNotificationEmail',
  CreateNotificationEmailSuccess = 'CreateNotificationEmailSuccess',
  CreateNotificationEmailFailure = 'CreateNotificationEmailFailure',
  DeleteNotificationEmailAction = 'DeleteNotificationEmailAction',
  SubscribeWalletAction = 'SubscribeWalletAction',
  AuthenticateEmailAction = 'AuthenticateEmailAction',
  AuthenticateEmailSuccessAction = 'AuthenticateEmailSuccessAction',
  SubscribeWalletSuccessAction = 'SubscribeWalletSuccessAction',
  CheckSubscriptionAction = 'CheckSubscriptionAction',
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

export interface SubscribeWalletAction {
  type: NotificationAction.SubscribeWalletAction;
  payload: SubscribePayload;
}

export interface AuthenticateEmailAction {
  type: NotificationAction.AuthenticateEmailAction;
  payload: AuthenticatePayload;
}

export interface AuthenticateEmailSuccessAction {
  type: NotificationAction.AuthenticateEmailSuccessAction;
}

export interface SubscribeWalletSuccessAction {
  type: NotificationAction.SubscribeWalletSuccessAction;
  payload: SubscribeWalletSuccessPayload;
}

export interface CheckSubscriptionAction {
  type: NotificationAction.CheckSubscriptionAction;
  payload: CheckSubscriptionPayload;
}

export type NotificationActionType =
  | CreateNotificationEmailAction
  | CreateNotificationEmailSuccessAction
  | CreateNotificationEmailFailureAction
  | DeleteNotificationEmailAction
  | SubscribeWalletAction
  | AuthenticateEmailAction
  | SubscribeWalletSuccessAction
  | CheckSubscriptionAction;

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

export const subscribeWallet = (wallets: Wallet[], email: string, lang: string): SubscribeWalletAction => ({
  type: NotificationAction.SubscribeWalletAction,
  payload: { wallets, email, lang },
});

export const authenticateEmail = (session_token: string, pin: number): AuthenticateEmailAction => ({
  type: NotificationAction.AuthenticateEmailAction,
  payload: { session_token, pin },
});

export const authenticateEmailSuccess = (): AuthenticateEmailSuccessAction => ({
  type: NotificationAction.AuthenticateEmailSuccessAction,
});

export const subscribeWalletSuccess = (sessionToken: string): SubscribeWalletSuccessAction => ({
  type: NotificationAction.SubscribeWalletSuccessAction,
  payload: { sessionToken },
});

export const checkSubscription = (hashes: string[], email: string): CheckSubscriptionAction => ({
  type: NotificationAction.CheckSubscriptionAction,
  payload: {
    hashes,
    email,
  },
});
