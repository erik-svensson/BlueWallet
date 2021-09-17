import { EncryptPinPayload } from 'app/api/encryption/types';

export enum EncryptionAction {
  EncryptPin = 'EncryptPin',
  EncryptPinSuccess = 'EncryptPinSuccess',
  EncryptPinFailure = 'EncryptPinFailure',
}

export type EncryptionActionType = EncryptPinAction | EncryptPinSuccessAction | EncryptPinFailureAction;

export interface EncryptPinAction {
  type: EncryptionAction.EncryptPin;
  payload: EncryptPinPayload;
}

export interface EncryptPinSuccessAction {
  type: EncryptionAction.EncryptPinSuccess;
  data: string;
}

export interface EncryptPinFailureAction {
  type: EncryptionAction.EncryptPinFailure;
  error: string;
}

export type EncryptPinActionCreator = (payload: EncryptPinPayload) => EncryptPinAction;

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
