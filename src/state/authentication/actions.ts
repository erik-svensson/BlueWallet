import SplashScreen from 'react-native-splash-screen';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { CONST, ActionMeta } from 'app/consts';
import { BlueApp } from 'app/legacy';
import { SecureStorageService } from 'app/services';

export enum AuthenticationAction {
  AuthenticateRequest = 'AuthenticateRequest',
  AuthenticateSuccess = 'AuthenticateSuccess',
  AuthenticateFailure = 'AuthenticateFailure',
  CheckCredentialsRequest = 'CheckCredentialsRequest',
  CheckCredentialsSuccess = 'CheckCredentialsSuccess',
  CheckCredentialsFailure = 'CheckCredentialsFailure',
  CreatePinRequest = 'CreatePinRequest',
  CreatePinSuccess = 'CreatePinSuccess',
  CreatePinFailure = 'CreatePinFailure',
  CreateTxPasswordRequest = 'CreateTxPasswordRequest',
  CreateTxPasswordSuccess = 'CreateTxPasswordSuccess',
  CreateTxPasswordFailure = 'CreateTxPasswordFailure',
  SetIsAuthenticated = 'SetIsAuthenticated',
}

export interface AuthenticateRequestAction {
  type: AuthenticationAction.AuthenticateRequest;
}

export interface AuthenticateSuccessAction {
  type: AuthenticationAction.AuthenticateSuccess;
}

export interface AuthenticateFailureAction {
  type: AuthenticationAction.AuthenticateFailure;
  error: string;
}

export interface CheckCredentialsRequestAction {
  type: AuthenticationAction.CheckCredentialsRequest;
}

export interface CheckCredentialsSuccessAction {
  type: AuthenticationAction.CheckCredentialsSuccess;
  isPinSet: boolean;
  isTxPasswordSet: boolean;
}

export interface CheckCredentialsFailureAction {
  type: AuthenticationAction.CheckCredentialsFailure;
  error: string;
}

export interface CreatePinRequestAction {
  type: AuthenticationAction.CreatePinRequest;
}

export interface CreatePinSuccessAction {
  type: AuthenticationAction.CreatePinSuccess;
}

export interface CreatePinFailureAction {
  type: AuthenticationAction.CreatePinFailure;
  error: string;
}

export interface CreateTxPasswordRequestAction {
  type: AuthenticationAction.CreateTxPasswordRequest;
}

export interface CreateTxPasswordSuccessAction {
  type: AuthenticationAction.CreateTxPasswordSuccess;
}

export interface CreateTxPasswordFailureAction {
  type: AuthenticationAction.CreateTxPasswordFailure;
  error: string;
}

export interface SetIsAuthenticatedAction {
  type: AuthenticationAction.SetIsAuthenticated;
  isAuthenticated: boolean;
}

export type AuthenticationActionType =
  | AuthenticateRequestAction
  | AuthenticateSuccessAction
  | AuthenticateFailureAction
  | CheckCredentialsRequestAction
  | CheckCredentialsSuccessAction
  | CheckCredentialsFailureAction
  | CreatePinRequestAction
  | CreatePinSuccessAction
  | CreatePinFailureAction
  | CreateTxPasswordRequestAction
  | CreateTxPasswordSuccessAction
  | CreateTxPasswordFailureAction
  | SetIsAuthenticatedAction;

export const authenticate = (pin: string, meta?: ActionMeta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  dispatch(authenticateRequest());
  try {
    const storedPin = await SecureStorageService.getSecuredValue(CONST.pin);

    if (pin !== storedPin) {
      throw new Error('Bad pin');
    }
    const success = dispatch(authenticateSuccess());

    if (meta?.onFailure) {
      meta.onFailure();
    }
    return success;
  } catch (e) {
    const failure = dispatch(authenticateFailure(e.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
    return failure;
  }
};

const authenticateRequest = (): AuthenticateRequestAction => ({
  type: AuthenticationAction.AuthenticateRequest,
});

const authenticateSuccess = (): AuthenticateSuccessAction => ({
  type: AuthenticationAction.AuthenticateSuccess,
});

const authenticateFailure = (error: string): AuthenticateFailureAction => ({
  type: AuthenticationAction.AuthenticateFailure,
  error,
});

export const checkCredentials = () => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  await BlueApp.startAndDecrypt();
  dispatch(checkCredentialsRequest());
  try {
    const pin = await SecureStorageService.getSecuredValue(CONST.pin);
    const transactionPassword = await SecureStorageService.getSecuredValue(CONST.transactionPassword);
    SplashScreen.hide();

    return dispatch(checkCredentialsSuccess({ isPinSet: !!pin, isTxPasswordSet: !!transactionPassword }));
  } catch (e) {
    return dispatch(checkCredentialsFailure(e.message));
  }
};

const checkCredentialsRequest = (): CheckCredentialsRequestAction => ({
  type: AuthenticationAction.CheckCredentialsRequest,
});

const checkCredentialsSuccess = ({
  isPinSet,
  isTxPasswordSet,
}: {
  isPinSet: boolean;
  isTxPasswordSet: boolean;
}): CheckCredentialsSuccessAction => ({
  type: AuthenticationAction.CheckCredentialsSuccess,
  isPinSet,
  isTxPasswordSet,
});

const checkCredentialsFailure = (error: string): CheckCredentialsFailureAction => ({
  type: AuthenticationAction.CheckCredentialsFailure,
  error,
});

export const createPin = (pin: string) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  dispatch(createPinRequest());
  try {
    await SecureStorageService.setSecuredValue(CONST.pin, pin);
    return dispatch(createPinSuccess());
  } catch (e) {
    return dispatch(createPinFailure(e.message));
  }
};

const createPinRequest = (): CreatePinRequestAction => ({
  type: AuthenticationAction.CreatePinRequest,
});

const createPinSuccess = (): CreatePinSuccessAction => ({
  type: AuthenticationAction.CreatePinSuccess,
});

const createPinFailure = (error: string): CreatePinFailureAction => ({
  type: AuthenticationAction.CreatePinFailure,
  error,
});

export const createTxPassword = (txPassword: string) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  dispatch(createTxPasswordRequest());
  try {
    await SecureStorageService.setSecuredValue(CONST.transactionPassword, txPassword);
    return dispatch(createTxPasswordSuccess());
  } catch (e) {
    return dispatch(createTxPasswordFailure(e.message));
  }
};

const createTxPasswordRequest = (): CreatePinRequestAction => ({
  type: AuthenticationAction.CreatePinRequest,
});

const createTxPasswordSuccess = (): CreatePinSuccessAction => ({
  type: AuthenticationAction.CreatePinSuccess,
});

const createTxPasswordFailure = (error: string): CreatePinFailureAction => ({
  type: AuthenticationAction.CreatePinFailure,
  error,
});

export const setIsAuthenticated = (isAuthenticated: boolean): SetIsAuthenticatedAction => ({
  type: AuthenticationAction.SetIsAuthenticated,
  isAuthenticated,
});
