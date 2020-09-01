import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import { BlueApp } from 'app/legacy';

import {
  loadAuthenticatorsFailure,
  loadAuthenticatorsSuccess,
  AuthenticatorsAction,
  deleteAuthenticatorSuccess,
  deleteAuthenticatorFailure,
  DeleteAuthenticatorAction,
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

export default [
  takeLatest(AuthenticatorsAction.LoadAuthenticators, loadAuthenticatorsSaga),
  takeEvery(AuthenticatorsAction.DeleteAuthenticator, deleteAuthenticatorSaga),
];
