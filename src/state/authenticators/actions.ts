import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Authenticator as IAuthenticator } from 'app/consts';
import { BlueApp, Authenticator } from 'app/legacy';

export enum AuthenticatorsAction {
  CreateAuthenticatorRequest = 'CreateAuthenticatorRequest',
  CreateAuthenticatorSuccess = 'CreateAuthenticatorSuccess',
  CreateAuthenticatorFailure = 'CreateAuthenticatorFailure',
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

export type AuthenticatorsActionType =
  | CreateAuthenticatorRequestAction
  | CreateAuthenticatorSuccessAction
  | CreateAuthenticatorFailureAction;

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

interface CreateAuthenticator {
  name: string;
  entropy: string;
}
interface Meta {
  onSuccess?: Function;
  onFailure?: Function;
}

export const createAuthenticator = ({ name, entropy }: CreateAuthenticator, meta?: Meta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticatorsActionType> => {
  try {
    dispatch(createAuthenticatorRequest());
    const authenticator = new Authenticator(name);
    await authenticator.init(entropy);
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
