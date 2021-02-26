import { takeEvery, takeLatest, put, call, all, select } from 'redux-saga/effects';

import { verifyEmail } from 'app/api';
import {
  subscribeEmail,
  authenticate,
  checkSubscriptionEmail,
  unsubscribeEmail,
  modifyEmail,
} from 'app/api/emailNotifications/client';
import { Wallet } from 'app/consts';
import { decryptCode } from 'app/helpers/decode';
import { getWalletHashedPublicKeys, walletToAddressesGenerationBase } from 'app/helpers/wallets';

import * as appSettingsSelectors from '../appSettings/selectors';
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
  UpdateNotificationEmailAction,
  updateNotificationEmailSuccess,
  updateNotificationEmailFailure,
} from './actions';

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  const { email } = payload;

  try {
    yield put(createNotificationEmailSuccess(email));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(createNotificationEmailFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* verifyNotificationEmailSaga(action: VerifyNotificationEmailAction | unknown) {
  const { meta, payload } = action as VerifyNotificationEmailAction;
  const { email } = payload;

  try {
    const { pin } = yield call(verifyEmail, { email });
    const decryptedCode = yield decryptCode(email, pin);

    yield put(verifyNotificationEmailSuccess(decryptedCode));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(verifyNotificationEmailFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const {
    payload: { wallets, email },
    meta,
  } = action as SubscribeWalletAction;

  try {
    const walletsGenerationBase = yield all(wallets.map(wallet => call(walletToAddressesGenerationBase, wallet)));

    const lang = yield select(appSettingsSelectors.language);
    const { session_token } = yield call(subscribeEmail, {
      email,
      wallets: walletsGenerationBase,
      lang,
    });

    yield put(subscribeWalletSuccess(session_token));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(subscribeWalletFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* unsubscribeWalletSaga(action: UnsubscribeWalletAction) {
  const {
    payload: { wallets, email },
    meta,
  } = action as UnsubscribeWalletAction;

  try {
    const hashes = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

    const { session_token } = yield call(unsubscribeEmail, { hashes, email });

    yield put(unsubscribeWalletSuccess(session_token));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(unsubscribeWalletFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* authenticateEmailSaga(action: AuthenticateEmailAction) {
  const { payload, meta } = action as AuthenticateEmailAction;

  try {
    yield call(authenticate, payload);
    yield put(authenticateEmailSuccess());

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(authenticateEmailFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* updateEmailSaga(action: UpdateNotificationEmailAction) {
  const {
    payload: { wallets, currentEmail, newEmail },
    meta,
  } = action;

  try {
    const hashes = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

    const { session_token } = yield call(modifyEmail, {
      hashes,
      old_email: currentEmail,
      new_email: newEmail,
    });

    yield put(updateNotificationEmailSuccess(session_token));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    yield put(updateNotificationEmailFailure(error.message));
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
    console.log({ error });
    yield put(checkSubscriptionFailure(error.message));

    if (meta?.onFailure) {
      meta.onFailure(error.message);
    }
  }
}

export default [
  takeEvery(NotificationAction.CheckSubscriptionAction, checkSubscriptionSaga),
  takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga),
  takeLatest(NotificationAction.VerifyNotificationEmailAction, verifyNotificationEmailSaga),
  takeEvery(NotificationAction.SubscribeWalletAction, subscribeWalletSaga),
  takeEvery(NotificationAction.AuthenticateEmailAction, authenticateEmailSaga),
  takeEvery(NotificationAction.UnsubscribeWalletAction, unsubscribeWalletSaga),
  takeLatest(NotificationAction.UpdateNotificationEmailAction, updateEmailSaga),
];
