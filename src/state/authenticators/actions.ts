import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Authenticator as IAuthenticator, ActionMeta } from 'app/consts';
import { BlueApp, Authenticator } from 'app/legacy';

const i18n = require('../../../loc');

export enum AuthenticatorsAction {
  CreateAuthenticatorRequest = 'CreateAuthenticatorRequest',
  CreateAuthenticatorSuccess = 'CreateAuthenticatorSuccess',
  CreateAuthenticatorFailure = 'CreateAuthenticatorFailure',
  LoadAuthenticators = 'LoadAuthenticators',
  LoadAuthenticatorsSuccess = 'LoadAuthenticatorsSuccess',
  LoadAuthenticatorsFailure = 'LoadAuthenticatorsFailure',
  DeleteAuthenticator = 'DeleteAuthenticator',
  DeleteAuthenticatorSuccess = 'DeleteAuthenticatorSuccess',
  DeleteAuthenticatorFailure = 'DeleteAuthenticatorFailure',
  SignTransactionRequest = 'SignTransactionRequest',
  SignTransactionSuccess = 'SignTransactionSuccess',
  SignTransactionFailure = 'SignTransactionFailure',
}

export interface CreateAuthenticatorRequestAction {
  type: AuthenticatorsAction.CreateAuthenticatorRequest;
}

export interface CreateAuthenticatorSuccessAction {
  type: AuthenticatorsAction.CreateAuthenticatorSuccess;
  authenticator: IAuthenticator;
}
export interface CreateAuthenticatorFailureAction {
  type: AuthenticatorsAction.CreateAuthenticatorFailure;
  error: string;
}
export interface LoadAuthenticatorsAction {
  type: AuthenticatorsAction.LoadAuthenticators;
}

export interface LoadAuthenticatorsSuccessAction {
  type: AuthenticatorsAction.LoadAuthenticatorsSuccess;
  authenticators: IAuthenticator[];
}
export interface LoadAuthenticatorsFailureAction {
  type: AuthenticatorsAction.LoadAuthenticatorsFailure;
  error: string;
}

export interface DeleteAuthenticatorAction {
  type: AuthenticatorsAction.DeleteAuthenticator;
  payload: {
    id: string;
  };
  meta?: ActionMeta;
}

export interface DeleteAuthenticatorSuccessAction {
  type: AuthenticatorsAction.DeleteAuthenticatorSuccess;
  authenticator: IAuthenticator;
}
export interface DeleteAuthenticatorFailureAction {
  type: AuthenticatorsAction.DeleteAuthenticatorFailure;
  error: string;
}

export interface SignTransactionRequestAction {
  type: AuthenticatorsAction.SignTransactionRequest;
}
export interface SignTransactionSuccessAction {
  type: AuthenticatorsAction.SignTransactionSuccess;
}
export interface SignTransactionFailureAction {
  type: AuthenticatorsAction.SignTransactionFailure;
  error: string;
}

export type AuthenticatorsActionType =
  | CreateAuthenticatorRequestAction
  | CreateAuthenticatorSuccessAction
  | CreateAuthenticatorFailureAction
  | LoadAuthenticatorsAction
  | LoadAuthenticatorsSuccessAction
  | LoadAuthenticatorsFailureAction
  | DeleteAuthenticatorAction
  | DeleteAuthenticatorSuccessAction
  | DeleteAuthenticatorFailureAction
  | SignTransactionSuccessAction
  | SignTransactionFailureAction
  | SignTransactionRequestAction;

const createAuthenticatorRequest = (): CreateAuthenticatorRequestAction => ({
  type: AuthenticatorsAction.CreateAuthenticatorRequest,
});

const createAuthenticatorSuccess = (authenticator: IAuthenticator): CreateAuthenticatorSuccessAction => ({
  type: AuthenticatorsAction.CreateAuthenticatorSuccess,
  authenticator,
});

const createAuthenticatorFailure = (error: string): CreateAuthenticatorFailureAction => ({
  type: AuthenticatorsAction.CreateAuthenticatorFailure,
  error,
});

export const loadAuthenticators = (): LoadAuthenticatorsAction => ({
  type: AuthenticatorsAction.LoadAuthenticators,
});

export const loadAuthenticatorsSuccess = (authenticators: IAuthenticator[]): LoadAuthenticatorsSuccessAction => ({
  type: AuthenticatorsAction.LoadAuthenticatorsSuccess,
  authenticators,
});

export const loadAuthenticatorsFailure = (error: string): LoadAuthenticatorsFailureAction => ({
  type: AuthenticatorsAction.LoadAuthenticatorsFailure,
  error,
});

export const deleteAuthenticator = (id: string, meta: ActionMeta): DeleteAuthenticatorAction => ({
  type: AuthenticatorsAction.DeleteAuthenticator,
  payload: { id },
  meta,
});

export const deleteAuthenticatorSuccess = (authenticator: IAuthenticator): DeleteAuthenticatorSuccessAction => ({
  type: AuthenticatorsAction.DeleteAuthenticatorSuccess,
  authenticator,
});

export const deleteAuthenticatorFailure = (error: string): DeleteAuthenticatorFailureAction => ({
  type: AuthenticatorsAction.DeleteAuthenticatorFailure,
  error,
});

const signTransactionRequest = (): SignTransactionRequestAction => ({
  type: AuthenticatorsAction.SignTransactionRequest,
});

const signTransactionSuccess = (): SignTransactionSuccessAction => ({
  type: AuthenticatorsAction.SignTransactionSuccess,
});

const signTransactionFailure = (error: string): SignTransactionFailureAction => ({
  type: AuthenticatorsAction.SignTransactionFailure,
  error,
});

interface CreateAuthenticator {
  name: string;
  entropy?: string;
  mnemonic?: string;
}

export const createAuthenticator = ({ name, entropy, mnemonic }: CreateAuthenticator, meta?: ActionMeta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticatorsActionType> => {
  try {
    dispatch(createAuthenticatorRequest());
    const authenticator = new Authenticator(name);
    await authenticator.init({ entropy, mnemonic });
    BlueApp.addAuthenticator(authenticator);
    await BlueApp.saveToDisk();
    const createAuthenticatorSuccessDispatch = dispatch(createAuthenticatorSuccess(authenticator));
    if (meta?.onSuccess) {
      meta.onSuccess(authenticator);
    }
    return createAuthenticatorSuccessDispatch;
  } catch (e) {
    const createAuthenticatorFailureDispatch = dispatch(createAuthenticatorFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
    return createAuthenticatorFailureDispatch;
  }
};

export const signTransaction = (encodedPsbt: string, meta: ActionMeta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
  getState: Function,
): Promise<AuthenticatorsActionType> => {
  try {
    dispatch(signTransactionRequest());
    const {
      authenticators: { authenticators },
    } = getState();
    for (let i = 0; i < authenticators.length; i++) {
      try {
        const authenticator = authenticators[i];
        const finalizedPsbt = await authenticator.signAndFinalizePSBT(encodedPsbt);
        const signTransactionSuccessDispatch = dispatch(signTransactionSuccess());
        if (meta?.onSuccess) {
          meta.onSuccess({ authenticator, finalizedPsbt });
        }
        return signTransactionSuccessDispatch;
      } catch (_) {}
    }
    throw new Error(i18n.authenticators.sign.error);
  } catch (e) {
    const signTransactionFailureDispatch = dispatch(signTransactionFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
    return signTransactionFailureDispatch;
  }
};
