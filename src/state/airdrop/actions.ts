import { Wallet, WalletPayload } from 'app/consts';

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
  payload: {
    wallet: WalletPayload;
    id: string;
  };
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

export const markThankYouSeen = (): ThankYouSeenAction => ({
  type: AirdropAction.ThankYouSeen,
});

export const completeThankYouFlow = (): ThankYouFlowCompleted => ({
  type: AirdropAction.ThankYouFlowCompleted,
});

export const subscribeWallet = (payload: { wallet: WalletPayload; id: string }): SubscribeWalletAction => ({
  type: AirdropAction.SubscribeWallet,
  payload,
});

export const subscribeWalletSuccess = (id: string): SubscribeWalletSuccessAction => ({
  type: AirdropAction.SubscribeWalletSuccess,
  payload: { id },
});

export const subscribeWalletFailure = (error: string): SubscribeWalletFailureAction => ({
  type: AirdropAction.SubscribeWalletFailure,
  error,
});

export const checkSubscription = (wallets: Wallet[]): CheckSubscriptionAction => ({
  type: AirdropAction.CheckSubscription,
  payload: { wallets },
});

export const checkSubscriptionSuccess = (subscribedIds: string[]): CheckSubscriptionSuccessAction => ({
  type: AirdropAction.CheckSubscriptionSuccess,
  payload: { subscribedIds },
});

export const checkSubscriptionFailure = (error: string): CheckSubscriptionFailureAction => ({
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
  | SubscribeWalletSuccessAction;
