import { AirdropAction, AirdropActionType } from './actions';

export interface AirdropState {
  thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  isLoading: boolean;
  error: string;
  subscribedIds: string[];
  usersQuantity: number;
}

const initialState: AirdropState = {
  thankYouSeen: false,
  thankYouFlowCompleted: false,
  isLoading: false,
  subscribedIds: [],
  error: '',
  usersQuantity: 0,
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
    case AirdropAction.CheckSubscription:
    case AirdropAction.SubscribeWallet:
    case AirdropAction.GetUsersQuantity:
      return {
        ...state,
        isLoading: true,
      };
    case AirdropAction.SubscribeWalletFailure:
    case AirdropAction.CheckSubscriptionFailure:
    case AirdropAction.GetUsersQuantityFailure:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case AirdropAction.GetUsersQuantitySuccess:
      return {
        ...state,
        usersQuantity: action.payload.users,
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
    default:
      return state;
  }
};
