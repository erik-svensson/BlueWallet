import { EncryptionAction, EncryptionActionType } from './actions';

export interface EncryptionState {
  loading: boolean;
}

const initialState: EncryptionState = {
  loading: false,
};

export const encryptionReducer = (state = initialState, action: EncryptionActionType): EncryptionState => {
  switch (action.type) {
    case EncryptionAction.EncryptPin:
    case EncryptionAction.EncryptPinSuccess:
    case EncryptionAction.EncryptPinFailure:
    default:
      return state;
  }
};
