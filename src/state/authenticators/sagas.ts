import logger from 'app/../logger';
import { cloneDeep } from 'lodash';
import { takeLatest, takeEvery, put, select } from 'redux-saga/effects';

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
  signTransactionSuccess,
  signTransactionFailure,
  SignTransactionAction,
  UpdateAuthenticatorAction,
  updateAuthenticatorSuccess,
  updateAuthenticatorFailure,
} from './actions';
import { list } from './selectors';

const i18n = require('../../../loc');

export function* loadAuthenticatorsSaga() {
  try {
    const authenticators = BlueApp.getAuthenticators();

    yield put(loadAuthenticatorsSuccess(authenticators));
  } catch (e) {
    if (e instanceof Error) {
      yield put(loadAuthenticatorsFailure(e.message));
    }
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
    if (e instanceof Error) {
      yield put(deleteAuthenticatorFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }

    logger.captureException(e);
  }
}

export function* createAuthenticatorSaga(action: CreateAuthenticatorAction | unknown) {
  const {
    payload: { name, mnemonic },
    meta,
  } = action as CreateAuthenticatorAction;

  try {
    const authenticator = new Authenticator(name);

    yield authenticator.init({ mnemonic });
    BlueApp.addAuthenticator(authenticator);
    yield BlueApp.saveToDisk();
    yield put(createAuthenticatorSuccess(authenticator));
    if (meta?.onSuccess) {
      meta.onSuccess(authenticator);
    }
  } catch (e) {
    if (e instanceof Error) {
      yield put(createAuthenticatorFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }

    logger.captureException(e);
  }
}

export function* updateAuthenticatorSaga(action: UpdateAuthenticatorAction | unknown) {
  const { authenticator } = action as UpdateAuthenticatorAction;

  try {
    const updatedAuthenticator = cloneDeep(BlueApp.updateAuthenticator(authenticator));

    yield BlueApp.saveToDisk();
    yield put(updateAuthenticatorSuccess(updatedAuthenticator));
  } catch (e) {
    if (e instanceof Error) {
      yield put(updateAuthenticatorFailure(e.message));
    }

    logger.captureException(e);
  }
}

export function* signTransactionSaga(action: SignTransactionAction | unknown) {
  const {
    payload: { encodedPsbt },
    meta,
  } = action as SignTransactionAction;

  try {
    const authenticators: Authenticator[] = yield select(list);

    for (let i = 0; i < authenticators.length; i++) {
      try {
        const authenticator = authenticators[i];
        const finalizedPsbt: string = yield authenticator.signAndFinalizePSBT(encodedPsbt);

        yield put(signTransactionSuccess());
        if (meta?.onSuccess) {
          meta.onSuccess({ authenticator, finalizedPsbt });
        }
        return;
      } catch (_) {}
    }
    throw new Error(i18n.authenticators.sign.error);
  } catch (e) {
    if (e instanceof Error) {
      yield put(signTransactionFailure(e.message));
      if (meta?.onFailure) {
        meta.onFailure(e.message);
      }
    }

    logger.captureException(e);
  }
}

export default [
  takeLatest(AuthenticatorsAction.LoadAuthenticators, loadAuthenticatorsSaga),
  takeEvery(AuthenticatorsAction.DeleteAuthenticator, deleteAuthenticatorSaga),
  takeEvery(AuthenticatorsAction.CreateAuthenticator, createAuthenticatorSaga),
  takeEvery(AuthenticatorsAction.SignTransaction, signTransactionSaga),
  takeEvery(AuthenticatorsAction.UpdateAuthenticator, updateAuthenticatorSaga),
];
