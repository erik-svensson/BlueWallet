import { Wallet, WalletPayload, ActionMeta } from 'app/consts';

export enum AirdropAction {
  ThankYouSeen = 'ThankYouSeen',
  ThankYouFlowCompleted = 'ThankYouFlowCompleted',
  SubscribeWallet = 'SubscribeWallet',
  SubscribeWalletSuccess = 'SubscribeWalletSuccess',
  SubscribeWalletFailure = 'SubscribeWalletFailure',
  CheckSubscription = 'CheckSubscription',
  CheckSubscriptionSuccess = 'CheckSubscriptionSuccess',
  CheckSubscriptionFailure = 'CheckSubscriptionFailure',
}

export interface ThankYouSeenAction {
  type: AirdropAction.ThankYouSeen;
}

export interface ThankYouFlowCompleted {
  type: AirdropAction.ThankYouFlowCompleted;
}

export interface SubscribeWalletAction {
  type: AirdropAction.SubscribeWallet;
  payload: Wallet;
}

export interface SubscribeWalletSuccessAction {
  type: AirdropAction.SubscribeWalletSuccess;
  payload: {
    id: string;
  };
}

export interface SubscribeWalletFailureAction {
  type: AirdropAction.SubscribeWalletFailure;
  error: string;
}

export interface CheckSubscriptionAction {
  type: AirdropAction.CheckSubscription;
  payload: {
    wallets: Wallet[];
  };
}

export interface CheckSubscriptionFailureAction {
  type: AirdropAction.CheckSubscriptionFailure;
  error: string;
}

export interface CheckSubscriptionSuccessAction {
  type: AirdropAction.CheckSubscriptionSuccess;
  payload: { subscribedIds: string[] };
}

export type MarkThankYouSeenActionCreator = () => ThankYouSeenAction;

export const markThankYouSeen: MarkThankYouSeenActionCreator = () => ({
  type: AirdropAction.ThankYouSeen,
});

export type CompleteThankYouFlowActionCreator = () => ThankYouFlowCompleted;

export const completeThankYouFlow: CompleteThankYouFlowActionCreator = () => ({
  type: AirdropAction.ThankYouFlowCompleted,
});

export type SubscribeWalletActionCreator = (payload: Wallet, meta?: ActionMeta) => SubscribeWalletAction;

export const subscribeWallet: SubscribeWalletActionCreator = (payload, meta) => ({
  type: AirdropAction.SubscribeWallet,
  payload,
  meta,
});

export type SubscribeWalletSuccessActionCreator = (id: string) => SubscribeWalletSuccessAction;

export const subscribeWalletSuccess: SubscribeWalletSuccessActionCreator = id => ({
  type: AirdropAction.SubscribeWalletSuccess,
  payload: { id },
});

export type SubscribeWalletFailureActionCreator = (error: string) => SubscribeWalletFailureAction;

export const subscribeWalletFailure = (error: string): SubscribeWalletFailureAction => ({
  type: AirdropAction.SubscribeWalletFailure,
  error,
});

export type CheckSubscriptionActionCreator = (wallets: Wallet[]) => CheckSubscriptionAction;

export const checkSubscription: CheckSubscriptionActionCreator = wallets => ({
  type: AirdropAction.CheckSubscription,
  payload: { wallets },
});

export type CheckSubscriptionSuccessActionCreator = (subscribedIds: string[]) => CheckSubscriptionSuccessAction;

export const checkSubscriptionSuccess: CheckSubscriptionSuccessActionCreator = subscribedIds => ({
  type: AirdropAction.CheckSubscriptionSuccess,
  payload: { subscribedIds },
});

export type CheckSubscriptionFailureActionCreator = (error: string) => CheckSubscriptionFailureAction;

export const checkSubscriptionFailure: CheckSubscriptionFailureActionCreator = error => ({
  type: AirdropAction.CheckSubscriptionFailure,
  error,
});

export type AirdropActionType =
  | ThankYouSeenAction
  | ThankYouFlowCompleted
  | SubscribeWalletAction
  | CheckSubscriptionAction
  | SubscribeWalletFailureAction
  | CheckSubscriptionSuccessAction
  | SubscribeWalletSuccessAction
  | CheckSubscriptionFailureAction;
