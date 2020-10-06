import { ElectrumXAction, ElectrymXActionType } from './actions';

export interface ElectrumXState {
  blockHeight: number;
}

const initialState: ElectrumXState = {
  blockHeight: 0,
};

export const electrumXReducer = (state = initialState, action: ElectrymXActionType): ElectrumXState => {
  switch (action.type) {
    case ElectrumXAction.SetBlockHeight:
      return {
        ...state,
        blockHeight: action.blockHeight,
      };
    default:
      return state;
  }
};
