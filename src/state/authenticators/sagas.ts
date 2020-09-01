import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import { BlueApp, Authenticator } from 'app/legacy';

import {
  loadAuthenticatorsFailure,
  loadAuthenticatorsSuccess,
  AuthenticatorsAction,
  deleteAuthenticatorSuccess,
  deleteAuthenticatorFailure,
  DeleteAuthenticatorAction,
  createAuthenticatorSuccess,
  createAuthenticatorFailure,
  CreateAuthenticatorAction,
} from './actions';

export function* loadAuthenticatorsSaga() {
  try {
    const authenticators = BlueApp.getAuthenticators();

    yield put(loadAuthenticatorsSuccess(authenticators));
  } catch (e) {
    yield put(loadAuthenticatorsFailure(e.message));
  }
}

export function* deleteAuthenticatorSaga(action: DeleteAuthenticatorAction | unknown) {
  const {
    payload: { id },
    meta,
  } = action as DeleteAuthenticatorAction;

  try {
    const authenticator = BlueApp.removeAuthenticatorById(id);
    yield BlueApp.saveToDisk();
    yield put(deleteAuthenticatorSuccess(authenticator));

    if (meta?.onSuccess) {
      meta.onSuccess(authenticator);
    }
  } catch (e) {
    yield put(deleteAuthenticatorFailure(e.message));

    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export function* createAuthenticatorSaga(action: CreateAuthenticatorAction | unknown) {
  const {
    payload: { name, entropy, mnemonic },
    meta,
  } = action as CreateAuthenticatorAction;
  try {
    const authenticator = new Authenticator(name);
    yield authenticator.init({ entropy, mnemonic });
    BlueApp.addAuthenticator(authenticator);
    yield BlueApp.saveToDisk();
    yield put(createAuthenticatorSuccess(authenticator));
    if (meta?.onSuccess) {
      meta.onSuccess(authenticator);
    }
  } catch (e) {
    yield put(createAuthenticatorFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export default [
  takeLatest(AuthenticatorsAction.LoadAuthenticators, loadAuthenticatorsSaga),
  takeEvery(AuthenticatorsAction.DeleteAuthenticator, deleteAuthenticatorSaga),
  takeEvery(AuthenticatorsAction.CreateAuthenticator, createAuthenticatorSaga),
];
