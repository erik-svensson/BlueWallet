import { AuthenticatePayload, SubscribeWalletSuccessPayload } from 'app/api';
import { ActionMeta, Wallet } from 'app/consts';

export enum NotificationAction {
  CreateNotificationEmail = 'CreateNotificationEmail',
  CreateNotificationEmailSuccess = 'CreateNotificationEmailSuccess',
  CreateNotificationEmailFailure = 'CreateNotificationEmailFailure',
  VerifyNotificationEmailAction = 'VerifyNotificationEmailAction',
  VerifyNotificationEmailActionSuccess = 'VerifyNotificationEmailActionSuccess',
  VerifyNotificationEmailActionFailure = 'VerifyNotificationEmailActionFailure',
  DeleteNotificationEmailAction = 'DeleteNotificationEmailAction',
  SubscribeWalletAction = 'SubscribeWalletAction',
  SubscribeWalletSuccessAction = 'SubscribeWalletSuccessAction',
  SubscribeWalletFailureAction = 'SubscribeWalletFailureAction',
  UnsubscribeWalletAction = 'UnsubscribeWalletAction',
  UnsubscribeWalletSuccessAction = 'UnsubscribeWalletSuccessAction',
  UnsubscribeWalletFailureAction = 'UnsubscribeWalletFailureAction',
  AuthenticateEmailAction = 'AuthenticateEmailAction',
  AuthenticateEmailSuccessAction = 'AuthenticateEmailSuccessAction',
  AuthenticateEmailFailureAction = 'AuthenticateEmailFailureAction',
  CheckSubscriptionAction = 'CheckSubscriptionAction',
  CheckSubscriptionSuccessAction = 'CheckSubscriptionSuccessAction',
  CheckSubscriptionFailureAction = 'CheckSubscriptionFailureAction',
  SetErrorAction = 'SetErrorAction',
}

export interface SetErrorAction {
  type: NotificationAction.SetErrorAction;
  error: string;
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

export interface VerifyNotificationEmailAction {
  type: NotificationAction.VerifyNotificationEmailAction;
  payload: {
    email: string;
  };
  meta?: ActionMeta;
}

export interface VerifyNotificationEmailActionFailure {
  type: NotificationAction.VerifyNotificationEmailActionFailure;
  error: string;
}

export interface DeleteNotificationEmailAction {
  type: NotificationAction.DeleteNotificationEmailAction;
}

export interface VerifyNotificationEmailActionSuccess {
  type: NotificationAction.VerifyNotificationEmailActionSuccess;
  payload: {
    pin: string;
  };
}
export interface SubscribeWalletAction {
  type: NotificationAction.SubscribeWalletAction;
  payload: {
    wallets: Wallet[];
    email: string;
  };
}

export interface SubscribeWalletSuccessAction {
  type: NotificationAction.SubscribeWalletSuccessAction;
  payload: SubscribeWalletSuccessPayload;
}

export interface SubscribeWalletFailureAction {
  type: NotificationAction.SubscribeWalletFailureAction;
  error: string;
}

export interface UnsubscribeWalletAction {
  type: NotificationAction.UnsubscribeWalletAction;
  payload: {
    wallets: Wallet[];
    email: string;
  };
}

export interface UnsubscribeWalletSuccessAction {
  type: NotificationAction.UnsubscribeWalletSuccessAction;
  payload: SubscribeWalletSuccessPayload;
}

export interface UnsubscribeWalletFailureAction {
  type: NotificationAction.UnsubscribeWalletFailureAction;
  error: string;
}

export interface AuthenticateEmailAction {
  type: NotificationAction.AuthenticateEmailAction;
  payload: AuthenticatePayload;
  meta?: ActionMeta;
}

export interface AuthenticateEmailSuccessAction {
  type: NotificationAction.AuthenticateEmailSuccessAction;
}
export interface AuthenticateEmailFailureAction {
  type: NotificationAction.AuthenticateEmailFailureAction;
  error: string;
}

export interface CheckSubscriptionAction {
  type: NotificationAction.CheckSubscriptionAction;
  payload: { wallets: Wallet[]; email: string };
  meta?: ActionMeta;
}
export interface CheckSubscriptionSuccessAction {
  type: NotificationAction.CheckSubscriptionSuccessAction;
  payload: {
    subscribedIds: string[];
  };
}
export interface CheckSubscriptionFailureAction {
  type: NotificationAction.CheckSubscriptionFailureAction;
  error: string;
}

export type NotificationActionType =
  | CreateNotificationEmailAction
  | CreateNotificationEmailSuccessAction
  | CreateNotificationEmailFailureAction
  | DeleteNotificationEmailAction
  | VerifyNotificationEmailAction
  | VerifyNotificationEmailActionSuccess
  | VerifyNotificationEmailActionFailure
  | SubscribeWalletAction
  | SubscribeWalletSuccessAction
  | SubscribeWalletFailureAction
  | UnsubscribeWalletAction
  | UnsubscribeWalletSuccessAction
  | UnsubscribeWalletFailureAction
  | AuthenticateEmailAction
  | AuthenticateEmailSuccessAction
  | AuthenticateEmailFailureAction
  | CheckSubscriptionAction
  | CheckSubscriptionSuccessAction
  | CheckSubscriptionFailureAction
  | SetErrorAction;

export type CreateNotificationEmailActionFunction = (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
export const createNotificationEmail: CreateNotificationEmailActionFunction = (email, meta) => ({
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

export type VerifyNotificationEmailActionFunction = (email: string, meta?: ActionMeta) => VerifyNotificationEmailAction;

export const verifyNotificationEmail: VerifyNotificationEmailActionFunction = (email, meta) => ({
  type: NotificationAction.VerifyNotificationEmailAction,
  payload: { email },
  meta,
});

export const verifyNotificationEmailSuccess = (pin: string): VerifyNotificationEmailActionSuccess => ({
  type: NotificationAction.VerifyNotificationEmailActionSuccess,
  payload: { pin },
});

export const verifyNotificationEmailFailure = (error: string): VerifyNotificationEmailActionFailure => ({
  type: NotificationAction.VerifyNotificationEmailActionFailure,
  error,
});

export type SubscribeWalletActionCreator = (wallets: Wallet[], email: string) => SubscribeWalletAction;
export const subscribeWallet: SubscribeWalletActionCreator = (wallets, email) => ({
  type: NotificationAction.SubscribeWalletAction,
  payload: { wallets, email },
});

export const subscribeWalletSuccess = (sessionToken: string): SubscribeWalletSuccessAction => ({
  type: NotificationAction.SubscribeWalletSuccessAction,
  payload: { sessionToken },
});

export const subscribeWalletFailure = (error: string): SubscribeWalletFailureAction => ({
  type: NotificationAction.SubscribeWalletFailureAction,
  error,
});

export type UnsubscribeWalletActionCreator = (wallets: Wallet[], email: string) => UnsubscribeWalletAction;
export const unsubscribeWallet: UnsubscribeWalletActionCreator = (wallets, email) => ({
  type: NotificationAction.UnsubscribeWalletAction,
  payload: { wallets, email },
});

export const unsubscribeWalletSuccess = (sessionToken: string): SubscribeWalletSuccessAction => ({
  type: NotificationAction.SubscribeWalletSuccessAction,
  payload: { sessionToken },
});

export const unsubscribeWalletFailure = (error: string): SubscribeWalletFailureAction => ({
  type: NotificationAction.SubscribeWalletFailureAction,
  error,
});

export const authenticateEmail = (session_token: string, pin: string, meta?: ActionMeta): AuthenticateEmailAction => ({
  type: NotificationAction.AuthenticateEmailAction,
  payload: { session_token, pin },
  meta,
});

export const authenticateEmailSuccess = (): AuthenticateEmailSuccessAction => ({
  type: NotificationAction.AuthenticateEmailSuccessAction,
});

export const authenticateEmailFailure = (error: string): AuthenticateEmailFailureAction => ({
  type: NotificationAction.AuthenticateEmailFailureAction,
  error,
});

export const checkSubscription = (wallets: Wallet[], email: string, meta?: ActionMeta): CheckSubscriptionAction => ({
  type: NotificationAction.CheckSubscriptionAction,
  payload: {
    wallets,
    email,
  },
  meta,
});

export const checkSubscriptionSuccess = (subscribedIds: string[]): CheckSubscriptionSuccessAction => ({
  type: NotificationAction.CheckSubscriptionSuccessAction,
  payload: {
    subscribedIds,
  },
});

export const checkSubscriptionFailure = (error: string): CheckSubscriptionFailureAction => ({
  type: NotificationAction.CheckSubscriptionFailureAction,
  error,
});

export type SetErrorActionFunction = (error: string) => SetErrorAction;
export const setError: SetErrorActionFunction = error => ({
  type: NotificationAction.SetErrorAction,
  error,
});
