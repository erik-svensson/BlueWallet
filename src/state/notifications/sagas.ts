import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';

import { verifyEmail } from 'app/api';
import { subscribeEmail, authenticateEmail, checkSubscriptionEmail, unsubscribeEmail } from 'app/api/emailApi';
import { Wallet, NotificationApiErrorMessages } from 'app/consts';
import { decryptCode } from 'app/helpers/decode';
import { getWalletHashedPublicKeys } from 'app/helpers/wallets';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
  verifyNotificationEmailSuccess,
  VerifyNotificationEmailAction,
  verifyNotificationEmailFailure,
  SubscribeWalletAction,
  AuthenticateEmailAction,
  authenticateEmailSuccess,
  authenticateEmailFailure,
  subscribeWalletSuccess,
  CheckSubscriptionAction,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  UnsubscribeWalletAction,
  unsubscribeWalletFailure,
  unsubscribeWalletSuccess,
  subscribeWalletFailure,
} from './actions';

const i18n = require('../../../loc');

enum Result {
  error = 'error',
  success = 'success',
}

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  const email = payload.email;
  try {
    yield put(createNotificationEmailSuccess(email));
    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (e) {
    yield put(createNotificationEmailFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* verifyNotificationEmailSaga(action: VerifyNotificationEmailAction | unknown) {
  const { meta, payload } = action as VerifyNotificationEmailAction;
  const email = payload.email;
  try {
    const verifyCode = yield call(verifyEmail, { email });
    if (verifyCode.result === Result.success) {
      const decryptedCode = yield decryptCode(email, verifyCode.pin);
      yield put(verifyNotificationEmailSuccess(decryptedCode));
    } else {
      throw new Error('Your email cannot be verified');
    }
    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (e) {
    yield put(verifyNotificationEmailFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload } = action as SubscribeWalletAction;
  try {
    const response: { session_token: string; result: Result } = yield call(subscribeEmail, payload);
    if (response.session_token) {
      yield put(subscribeWalletSuccess(response.session_token));
    }
  } catch (error) {
    yield put(subscribeWalletFailure(error.msg));
  }
}

export function* unsubscribeWalletSaga(action: UnsubscribeWalletAction) {
  const { payload } = action as UnsubscribeWalletAction;
  try {
    const response = yield call(unsubscribeEmail, payload);
    if (response.session_token) {
      yield put(unsubscribeWalletSuccess(response.session_token));
    }
  } catch (error) {
    yield put(unsubscribeWalletFailure(error.msg));
  }
}

export function* authenticateEmailSaga(action: AuthenticateEmailAction) {
  const { payload, meta } = action as AuthenticateEmailAction;
  try {
    const response = yield call(authenticateEmail, payload);
    if (response.result === Result.success) {
      yield put(authenticateEmailSuccess());
      if (meta?.onSuccess) {
        meta.onSuccess();
      }
    }
  } catch (error) {
    const { msg } = error.response.data;
    yield put(authenticateEmailFailure(msg));
    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* checkSubscriptionSaga(action: CheckSubscriptionAction) {
  const {
    meta,
    payload: { wallets, email },
  } = action;
  try {
    const walletWithHashes = yield Promise.all(
      wallets.map(async wallet => ({ ...wallet, hash: await getWalletHashedPublicKeys(wallet) })),
    );
    const hashes = walletWithHashes.map((wallet: Wallet) => wallet.hash);
    const response = yield call(checkSubscriptionEmail, { hashes, email });
    const ids: string[] = [];
    walletWithHashes.forEach((wallet: Wallet, index: number) => {
      if (response.result[index]) {
        ids.push(wallet.id);
      }
    });
    yield put(checkSubscriptionSuccess(ids));
    if (meta?.onSuccess) {
      meta.onSuccess(ids);
    }
  } catch (error) {
    const { msg } = error.response.data;
    if (meta?.onFailure) {
      meta.onFailure(msg);
    }
    yield put(checkSubscriptionFailure(msg));
  }
}

export default [
  takeEvery(NotificationAction.CheckSubscriptionAction, checkSubscriptionSaga),
  takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga),
  takeLatest(NotificationAction.VerifyNotificationEmailAction, verifyNotificationEmailSaga),
  takeEvery(NotificationAction.SubscribeWalletAction, subscribeWalletSaga),
  takeEvery(NotificationAction.AuthenticateEmailAction, authenticateEmailSaga),
  takeEvery(NotificationAction.UnsubscribeWalletAction, unsubscribeWalletSaga),
];
