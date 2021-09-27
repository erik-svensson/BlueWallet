import { AirdropGoal, DateType } from 'app/consts';

import { AirdropAction, AirdropActionType, SocialLinks } from './actions';

export interface AirdropState {
  thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  isLoading: boolean;
  error: string;
  subscribedIds: string[];
  usersQuantity: number;
  endAirdrop: string | DateType;
  airdropCommunityGoals: AirdropGoal[];
  badges: AirdropGoal[];
  airdropsWalletBalance: [];
  socialLinks: SocialLinks;
}

const initialState: AirdropState = {
  thankYouSeen: false,
  thankYouFlowCompleted: false,
  isLoading: false,
  subscribedIds: [],
  error: '',
  usersQuantity: 0,
  endAirdrop: '',
  airdropCommunityGoals: [],
  badges: [],
  airdropsWalletBalance: [],
  socialLinks: {
    medium: '',
    facebook: '',
    twitter: '',
  },
};

export const airdropReducer = (state = initialState, action: AirdropActionType): AirdropState => {
  switch (action.type) {
    case AirdropAction.ThankYouSeen:
      return {
        ...state,
        thankYouSeen: true,
      };
    case AirdropAction.ThankYouFlowCompleted:
      return {
        ...state,
        thankYouFlowCompleted: true,
      };
    case AirdropAction.GetSocialLinksSuccess: {
      return {
        ...state,
        socialLinks: action.links,
      };
    }
    case AirdropAction.CheckSubscription:
    case AirdropAction.SubscribeWallet:
    case AirdropAction.GetAirdropStatus:
      return {
        ...state,
        isLoading: true,
      };
    case AirdropAction.SubscribeWalletFailure:
    case AirdropAction.CheckSubscriptionFailure:
    case AirdropAction.GetAirdropStatusFailure:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case AirdropAction.GetAirdropStatusSuccess:
      return {
        ...state,
        usersQuantity: action.users,
        error: '',
        isLoading: false,
      };
    case AirdropAction.CheckSubscriptionSuccess:
      return {
        ...state,
        subscribedIds: action.payload.subscribedIds,
        error: '',
        isLoading: false,
      };
    case AirdropAction.SubscribeWalletSuccess:
      return {
        ...state,
        subscribedIds: [...state.subscribedIds, action.payload.id],
        error: '',
        isLoading: false,
      };
    case AirdropAction.SetEndDateAirdrop:
      return {
        ...state,
        endAirdrop: action.date,
      };
    case AirdropAction.SetAirdropCommunityGoals:
      return {
        ...state,
        airdropCommunityGoals: action.date,
      };
    case AirdropAction.SetAirdropBadges:
      return {
        ...state,
        badges: action.date,
      };
    case AirdropAction.SetAirdropsWalletsBalance:
      return {
        ...state,
        airdropsWalletBalance: action.date,
      };
    default:
      return state;
  }
};
