import { AirdropAction, AirdropActionType } from './actions';

export interface AirdropState {
  thankYouSeen: boolean;
  thankYouFlowCompleted: boolean;
  isLoading: boolean;
  error: boolean;
  subscribedIds: string[];
}

const initialState: AirdropState = {
  thankYouSeen: false,
  thankYouFlowCompleted: false,
  isLoading: false,
  subscribedIds: [],
  error: false,
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
    case AirdropAction.CheckSubscriptionSuccess:
      return {
        ...state,
        subscribedIds: action.payload.subscribedIds,
        error: false,
      };
    case AirdropAction.SubscribeWalletSuccess:
      return {
        ...state,
        subscribedIds: [...state.subscribedIds, action.payload.id],
        error: false,
      };
    case AirdropAction.SubscribeWalletFailure:
    case AirdropAction.CheckSubscriptionFailure:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
