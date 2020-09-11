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
      throw new Error('Wrong pin');
    }
    const success = dispatch(authenticateSuccess());

    if (meta?.onSuccess) {
      meta.onSuccess();
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

    const success = dispatch(
      checkCredentialsSuccess({
        isPinSet: !!pin,
        isTxPasswordSet: !!transactionPassword,
      }),
    );

    return success;
  } catch (e) {
    const failure = dispatch(checkCredentialsFailure(e.message));

    return failure;
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

export const createPin = (pin: string, meta?: ActionMeta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  dispatch(createPinRequest());
  try {
    await SecureStorageService.setSecuredValue(CONST.pin, pin);
    const success = dispatch(createPinSuccess());

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
    return success;
  } catch (e) {
    const failure = dispatch(createPinFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
    return failure;
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

export const createTxPassword = (txPassword: string, meta?: ActionMeta) => async (
  dispatch: ThunkDispatch<any, any, AnyAction>,
): Promise<AuthenticationActionType> => {
  dispatch(createTxPasswordRequest());
  try {
    await SecureStorageService.setSecuredValue(CONST.transactionPassword, txPassword);
    if (meta?.onSuccess) {
      meta.onSuccess();
    }
    const success = dispatch(createTxPasswordSuccess());
    return success;
  } catch (e) {
    const failure = dispatch(createTxPasswordFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
    return failure;
  }
};

const createTxPasswordRequest = (): CreateTxPasswordRequestAction => ({
  type: AuthenticationAction.CreateTxPasswordRequest,
});

const createTxPasswordSuccess = (): CreateTxPasswordSuccessAction => ({
  type: AuthenticationAction.CreateTxPasswordSuccess,
});

const createTxPasswordFailure = (error: string): CreateTxPasswordFailureAction => ({
  type: AuthenticationAction.CreateTxPasswordFailure,
  error,
});

export const setIsAuthenticated = (isAuthenticated: boolean): SetIsAuthenticatedAction => ({
  type: AuthenticationAction.SetIsAuthenticated,
  isAuthenticated,
});
