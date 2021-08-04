import { Wallet, ActionMeta, DateType } from 'app/consts';

export enum AirdropAction {
  ThankYouSeen = 'ThankYouSeen',
  ThankYouFlowCompleted = 'ThankYouFlowCompleted',
  SubscribeWallet = 'SubscribeWallet',
  SubscribeWalletSuccess = 'SubscribeWalletSuccess',
  SubscribeWalletFailure = 'SubscribeWalletFailure',
  CheckSubscription = 'CheckSubscription',
  CheckSubscriptionSuccess = 'CheckSubscriptionSuccess',
  CheckSubscriptionFailure = 'CheckSubscriptionFailure',
  GetAirdropStatusBalance = 'GetAirdropStatusBalance',
  GetAirdropStatusBalanceSuccess = 'GetAirdropStatusBalanceSuccess',
  GetAirdropStatusBalanceFailure = 'GetAirdropStatusBalanceFailure',
  SetEndDateAirdrop = 'SetEndDateAirdrop',
}

export interface GetAirdropStatusBalanceAction {
  type: AirdropAction.GetAirdropStatusBalance;
}

export interface GetAirdropStatusBalanceSuccessAction {
  type: AirdropAction.GetAirdropStatusBalanceSuccess;
  users: number;
}

export interface GetAirdropStatusBalanceFailureAction {
  type: AirdropAction.GetAirdropStatusBalanceFailure;
  error: string;
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
  meta?: ActionMeta;
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

export interface SetEndDateAirdropAction {
  type: AirdropAction.SetEndDateAirdrop;
  date: string | DateType;
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

export type GetAirdropStatusBalanceActionCreator = () => GetAirdropStatusBalanceAction;

export const getAirdropStatusBalance: GetAirdropStatusBalanceActionCreator = () => ({
  type: AirdropAction.GetAirdropStatusBalance,
});

export type GetAirdropStatusBalanceSuccessActionCreator = (users: number) => GetAirdropStatusBalanceSuccessAction;

export const getAirdropStatusBalanceSuccess: GetAirdropStatusBalanceSuccessActionCreator = users => ({
  type: AirdropAction.GetAirdropStatusBalanceSuccess,
  users,
});

export type GetAirdropStatusBalanceFailureActionCreator = (error: string) => GetAirdropStatusBalanceFailureAction;

export const getAirdropStatusBalanceFailure: GetAirdropStatusBalanceFailureActionCreator = error => ({
  type: AirdropAction.GetAirdropStatusBalanceFailure,
  error,
});

export type SetEndDateAirdropActionCreator = (date: string | DateType) => SetEndDateAirdropAction;

export const setEndDateAirdropAction: SetEndDateAirdropActionCreator = (date: string | DateType) => ({
  type: AirdropAction.SetEndDateAirdrop,
  date,
});

export type AirdropActionType =
  | ThankYouSeenAction
  | ThankYouFlowCompleted
  | SubscribeWalletAction
  | CheckSubscriptionAction
  | SubscribeWalletFailureAction
  | CheckSubscriptionSuccessAction
  | SubscribeWalletSuccessAction
  | CheckSubscriptionFailureAction
  | GetAirdropStatusBalanceAction
  | GetAirdropStatusBalanceSuccessAction
  | GetAirdropStatusBalanceFailureAction
  | SetEndDateAirdropAction;
