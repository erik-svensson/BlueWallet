import { StatusActionType, StatusAction } from './actions';

export interface StatusState {
  internetConnectionStatus: boolean;
  serverConnectionStatus: boolean;
}

const initialState: StatusState = {
  internetConnectionStatus: true,
  serverConnectionStatus: true,
};

export const statusReducer = (state = initialState, action: StatusActionType): StatusState => {
  switch (action.type) {
    case StatusAction.UpdateInternetConnectionStatus:
      return {
        ...state,
      };
    case StatusAction.UpdateInternetConnectionStatusSuccess:
      return {
        ...state,
        internetConnectionStatus: action.payload,
      };
    case StatusAction.UpdateServerConnectionStatus:
      return {
        ...state,
      };
    case StatusAction.UpdateServerConnectionStatusSuccess:
      return {
        ...state,
        serverConnectionStatus: action.payload,
      };
    default:
      return state;
  }
};
