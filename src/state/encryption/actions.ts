export enum EncryptionAction {
  EncryptPin = 'EncryptPin',
  EncryptPinSuccess = 'EncryptPinSuccess',
  EncryptPinFailure = 'EncryptPinFailure',
}

export type EncryptionActionType = EncryptPinAction | EncryptPinSuccessAction | EncryptPinFailureAction;
export type ActionPayload = {
  data: string;
  keyPair: { private: string; public: string };
};
export interface EncryptPinAction {
  type: EncryptionAction.EncryptPin;
  payload: ActionPayload;
}

export interface EncryptPinSuccessAction {
  type: EncryptionAction.EncryptPinSuccess;
  data: string;
}

export interface EncryptPinFailureAction {
  type: EncryptionAction.EncryptPinFailure;
  error: string;
}

export type EncryptPinActionCreator = (payload: ActionPayload) => EncryptPinAction;

export const encryptPin: EncryptPinActionCreator = payload => ({
  type: EncryptionAction.EncryptPin,
  payload,
});

export type EncryptPinSuccessActionCreator = (data: string) => EncryptPinSuccessAction;

export const encryptPinSuccess: EncryptPinSuccessActionCreator = data => ({
  type: EncryptionAction.EncryptPinSuccess,
  data,
});

export type EncryptPinFailureActionCreator = (error: string) => EncryptPinFailureAction;

export const encryptPinFailure: EncryptPinFailureActionCreator = error => ({
  type: EncryptionAction.EncryptPinFailure,
  error,
});
