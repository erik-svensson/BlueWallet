import { SubscribePayload, UnsubscribePayload, AuthenticatePayload, SubscribeWalletSuccessPayload } from 'app/api';
import { ActionMeta, WalletPayload, Wallet } from 'app/consts';

export enum NotificationAction {
  CreateNotificationEmail = 'CreateNotificationEmail',
  CreateNotificationEmailSuccess = 'CreateNotificationEmailSuccess',
  CreateNotificationEmailFailure = 'CreateNotificationEmailFailure',
  SetNotificationEmail = 'SetNotificationEmail',
  SetNotificationEmailSuccess = 'SetNotificationEmailSuccess',
  SetNotificationEmailFailure = 'SetNotificationEmailFailure',
  DeleteNotificationEmailAction = 'DeleteNotificationEmailAction',
  VerifyNotificationEmailAction = 'VerifyNotificationEmailAction',
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

export interface VerifyNotificationEmailAction {
  type: NotificationAction.VerifyNotificationEmailAction;
  payload: {
    pin: string;
  };
}
export interface SubscribeWalletAction {
  type: NotificationAction.SubscribeWalletAction;
  payload: SubscribePayload;
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
  payload: UnsubscribePayload;
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
  | SetNotificationEmailAction
  | SetNotificationEmailSuccessAction
  | SetNotificationEmailFailureAction
  | DeleteNotificationEmailAction
  | VerifyNotificationEmailAction
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
  | CheckSubscriptionFailureAction;

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

export const verifyNotificationEmail = (pin: string): VerifyNotificationEmailAction => ({
  type: NotificationAction.VerifyNotificationEmailAction,
  payload: { pin },
});

export const subscribeWallet = (wallets: WalletPayload[], email: string, lang: string): SubscribeWalletAction => ({
  type: NotificationAction.SubscribeWalletAction,
  payload: { wallets, email, lang },
});

export const subscribeWalletSuccess = (sessionToken: string): SubscribeWalletSuccessAction => ({
  type: NotificationAction.SubscribeWalletSuccessAction,
  payload: { sessionToken },
});

export const subscribeWalletFailure = (error: string): SubscribeWalletFailureAction => ({
  type: NotificationAction.SubscribeWalletFailureAction,
  error,
});

export const unsubscribeWallet = (hashes: string[], email: string): UnsubscribeWalletAction => ({
  type: NotificationAction.UnsubscribeWalletAction,
  payload: { hashes, email },
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
