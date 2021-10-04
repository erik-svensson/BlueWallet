import { Wallet, ActionMeta, DateType, AirdropGoal } from 'app/consts';

export interface SocialLinks {
  medium: string;
  facebook: string;
  twitter: string;
}

export enum AirdropAction {
  ThankYouSeen = 'ThankYouSeen',
  ThankYouFlowCompleted = 'ThankYouFlowCompleted',
  SubscribeWallet = 'SubscribeWallet',
  SubscribeWalletSuccess = 'SubscribeWalletSuccess',
  SubscribeWalletFailure = 'SubscribeWalletFailure',
  CheckSubscription = 'CheckSubscription',
  CheckSubscriptionSuccess = 'CheckSubscriptionSuccess',
  CheckSubscriptionFailure = 'CheckSubscriptionFailure',
  GetAirdropStatus = 'GetAirdropStatus',
  GetAirdropStatusSuccess = 'GetAirdropStatusSuccess',
  GetAirdropStatusFailure = 'GetAirdropStatusFailure',
  SetEndDateAirdrop = 'SetEndDateAirdrop',
  SetAirdropCommunityGoals = 'SetAirdropCommunityGoals',
  SetAirdropBadges = 'SetAirdropBadges',
  GetReadableOrder = 'GetReadableOrder',
  SetAirdropsWalletsBalance = 'SetAirdropsWalletsBalance',
  GetSocialLinks = 'GetSocialLinks',
  GetSocialLinksSuccess = 'GetSocialLinksSuccess',
}

export interface GetAirdropStatusAction {
  type: AirdropAction.GetAirdropStatus;
}

export interface GetAirdropStatusSuccessAction {
  type: AirdropAction.GetAirdropStatusSuccess;
  users: number;
}

export interface GetAirdropStatusFailureAction {
  type: AirdropAction.GetAirdropStatusFailure;
  error: string;
}

export interface GetSocialLinksAction {
  type: AirdropAction.GetSocialLinks;
}
export interface GetSocialLinksSuccessAction {
  type: AirdropAction.GetSocialLinksSuccess;
  links: SocialLinks;
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
  meta?: ActionMeta;
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

export interface SetAirdropCommunityGoalsAction {
  type: AirdropAction.SetAirdropCommunityGoals;
  date: AirdropGoal[];
}

export interface SetAirdropBadgesAction {
  type: AirdropAction.SetAirdropBadges;
  date: AirdropGoal[];
}

export interface GetReadableOrderAction {
  type: AirdropAction.GetReadableOrder;
  date: string[];
}

export interface SetAirdropsWalletsBalanceAction {
  type: AirdropAction.SetAirdropsWalletsBalance;
  date: [];
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

export type CheckSubscriptionActionCreator = (wallets: Wallet[], meta?: ActionMeta) => CheckSubscriptionAction;

export const airdropCheckSubscription: CheckSubscriptionActionCreator = (wallets, meta) => ({
  type: AirdropAction.CheckSubscription,
  payload: { wallets },
  meta,
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

export type GetAirdropStatusActionCreator = () => GetAirdropStatusAction;

export const getAirdropStatus: GetAirdropStatusActionCreator = () => ({
  type: AirdropAction.GetAirdropStatus,
});

export type GetAirdropStatusSuccessActionCreator = (users: number) => GetAirdropStatusSuccessAction;

export const getAirdropStatusSuccess: GetAirdropStatusSuccessActionCreator = users => ({
  type: AirdropAction.GetAirdropStatusSuccess,
  users,
});

export type GetAirdropStatusFailureActionCreator = (error: string) => GetAirdropStatusFailureAction;

export const getAirdropStatusFailure: GetAirdropStatusFailureActionCreator = error => ({
  type: AirdropAction.GetAirdropStatusFailure,
  error,
});

export type GetSocialLinksActionCreator = () => GetSocialLinksAction;

export const getSocialLinks: GetSocialLinksActionCreator = () => ({
  type: AirdropAction.GetSocialLinks,
});

export type GetSocialLinksSuccessActionCreator = (links: SocialLinks) => GetSocialLinksSuccessAction;

export const getSocialLinksSuccess: GetSocialLinksSuccessActionCreator = links => ({
  type: AirdropAction.GetSocialLinksSuccess,
  links,
});

export type SetEndDateAirdropActionCreator = (date: string | DateType) => SetEndDateAirdropAction;

export const setEndDateAirdropAction: SetEndDateAirdropActionCreator = (date: string | DateType) => ({
  type: AirdropAction.SetEndDateAirdrop,
  date,
});

export type SetAirdropCommunityGoalsActionCreator = (date: AirdropGoal[]) => SetAirdropCommunityGoalsAction;

export const setAirdropCommunityGoalsAction: SetAirdropCommunityGoalsActionCreator = (date: AirdropGoal[]) => ({
  type: AirdropAction.SetAirdropCommunityGoals,
  date,
});

export type SetAirdropBadgesActionCreator = (date: AirdropGoal[]) => SetAirdropBadgesAction;

export const setAirdropBadgesAction: SetAirdropBadgesActionCreator = (date: AirdropGoal[]) => ({
  type: AirdropAction.SetAirdropBadges,
  date,
});

export type GetReadableOrderActionCreator = (date: string[]) => GetReadableOrderAction;

export const getReadableOrderAction: GetReadableOrderActionCreator = (date: string[]) => ({
  type: AirdropAction.GetReadableOrder,
  date,
});

export type SetAirdropsWalletsBalanceActionCreator = (date: []) => SetAirdropsWalletsBalanceAction;

export const setAirdropsWalletsBalanceAction: SetAirdropsWalletsBalanceActionCreator = (date: []) => ({
  type: AirdropAction.SetAirdropsWalletsBalance,
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
  | GetAirdropStatusAction
  | GetAirdropStatusSuccessAction
  | GetAirdropStatusFailureAction
  | SetEndDateAirdropAction
  | SetAirdropCommunityGoalsAction
  | SetAirdropBadgesAction
  | GetReadableOrderAction
  | SetAirdropsWalletsBalanceAction
  | GetSocialLinksAction
  | GetSocialLinksSuccessAction;
