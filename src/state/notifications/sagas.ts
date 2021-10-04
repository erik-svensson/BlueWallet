import logger from 'app/../logger';
import { takeEvery, takeLatest, put, call, all, select, take } from 'redux-saga/effects';

import { CheckSubscriptionResponse, verifyEmail } from 'app/api';
import {
  subscribeEmail,
  authenticate,
  checkSubscriptionEmail,
  unsubscribeEmail,
  modifyEmail,
  subscribePush,
  removeDeviceFCM,
  checkSubscriptionPush as checkSubscriptionPushApi,
  unsubscribePush,
} from 'app/api/emailNotifications/client';
import { Wallet } from 'app/consts';
import { decryptCode } from 'app/helpers/decode';
import { getWalletHashedPublicKeys } from 'app/helpers/wallets';

import { updatePushnotificationsSetting } from '../appSettings/actions';
import * as appSettingsSelectors from '../appSettings/selectors';
import { prepareWallets, WalletsAction, authenticateWallet } from '../wallets/actions';
import * as walletsSelectors from '../wallets/selectors';
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
  SubscribePushAllWalletsAction,
  CheckSubscriptionPushAction,
  checkSubscriptionPushFailure,
  checkSubscriptionPushSuccess,
  UnsubscribePushWalletAction,
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
    if (error instanceof Error) {
      yield put(createNotificationEmailFailure(error.message));
    }

    if (meta?.onFailure) {
      meta.onFailure();
    }

    logger.captureException(error);
  }
}

export function* verifyNotificationEmailSaga(action: VerifyNotificationEmailAction | unknown) {
  const { meta, payload } = action as VerifyNotificationEmailAction;
  const { email } = payload;

  try {
    const { pin } = yield call(verifyEmail, { email });
    const decryptedCode: string = yield decryptCode(email, pin);

    yield put(verifyNotificationEmailSuccess(decryptedCode));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(verifyNotificationEmailFailure(error.message));
    }

    if (meta?.onFailure) {
      meta.onFailure();
    }

    logger.captureException(error);
  }
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const {
    payload: { wallets, email },
    meta,
  } = action as SubscribeWalletAction;

  try {
    yield put(prepareWallets(wallets));

    const { type } = yield take([WalletsAction.PrepareWalletsSuccess, WalletsAction.PrepareWalletsFailure]);

    if (type === WalletsAction.PrepareWalletsSuccess) {
      const hashes: string[] = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

      const language: string = yield select(appSettingsSelectors.language);
      // TODO: fix types
      const { session_token } = yield call(subscribeEmail as any, {
        email,
        wallets: hashes,
        language,
      });

      yield put(subscribeWalletSuccess(session_token));

      if (meta?.onSuccess) {
        meta.onSuccess();
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(subscribeWalletFailure(error.message));
    }

    if (meta?.onFailure) {
      meta.onFailure();
    }

    logger.captureException(error);
  }
}

export function* unsubscribeWalletSaga(action: UnsubscribeWalletAction) {
  const {
    payload: { wallets, email },
    meta,
  } = action as UnsubscribeWalletAction;

  try {
    const hashes: string[] = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

    const { session_token } = yield call(unsubscribeEmail, { data: { wallets: hashes, email } });

    yield put(unsubscribeWalletSuccess(session_token));

    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(unsubscribeWalletFailure(error.message));
    }

    if (meta?.onFailure) {
      meta.onFailure();
    }

    logger.captureException(error);
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
    if (error instanceof Error) {
      yield put(authenticateEmailFailure(error.message));
    }

    if (meta?.onFailure) {
      meta.onFailure();
    }

    logger.captureException(error);
  }
}

export function* updateEmailSaga(action: UpdateNotificationEmailAction) {
  const {
    payload: { wallets, currentEmail, newEmail },
    meta,
  } = action;

  try {
    const hashes: string[] = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

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
    if (error instanceof Error) {
      yield put(updateNotificationEmailFailure(error.message));
    }
    logger.captureException(error);
  }
}

export function* checkSubscriptionSaga(action: CheckSubscriptionAction) {
  const {
    meta,
    payload: { wallets, email },
  } = action;

  try {
    if (email) {
      const walletWithHashes: Wallet[] = yield Promise.all(
        wallets.map(async wallet => ({ ...wallet, hash: await getWalletHashedPublicKeys(wallet) })),
      );
      const hashes = walletWithHashes.map((wallet: Wallet) => wallet.hash);
      const response: CheckSubscriptionResponse = yield call(checkSubscriptionEmail as any, { wallets: hashes, email });
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
    } else {
      yield put(checkSubscriptionFailure('No email assigned to account'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(checkSubscriptionFailure(error.message));

      if (meta?.onFailure) {
        meta.onFailure(error.message);
      }
    }
  }
}

export function* checkSubscriptionPushSaga(action: CheckSubscriptionPushAction) {
  const {
    meta,
    payload: { wallets },
  } = action;

  try {
    const fcm: string = yield select(appSettingsSelectors.fcmToken);

    if (fcm) {
      const walletWithHashes: Wallet[] = yield Promise.all(
        wallets.map(async wallet => ({ ...wallet, hash: await getWalletHashedPublicKeys(wallet) })),
      );
      const hashes = walletWithHashes.map((wallet: Wallet) => wallet.hash);
      const response: CheckSubscriptionResponse = yield call(checkSubscriptionPushApi as any, {
        wallets: hashes,
        fcm,
      });
      const ids: string[] = [];

      walletWithHashes.forEach((wallet: Wallet, index: number) => {
        if (response.result[index]) {
          ids.push(wallet.id);
        }
      });

      yield put(checkSubscriptionPushSuccess(ids));

      if (meta?.onSuccess) {
        meta.onSuccess(ids);
      }
    } else {
      yield put(checkSubscriptionPushFailure('No fcmToken assigned to account'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(checkSubscriptionPushFailure(error.message));

      if (meta?.onFailure) {
        meta.onFailure(error.message);
      }
    }

    logger.captureException(error);
  }
}

export function* unsubscribePushAllWalletsSaga() {
  try {
    const fcm: string = yield select(appSettingsSelectors.fcmToken);

    yield call(removeDeviceFCM, { fcm });
  } catch (error) {
    logger.captureException(error);
  }
}

export function* unsubscribePushWalletSaga(action: UnsubscribePushWalletAction) {
  const {
    payload: { wallets },
  } = action;

  try {
    const fcm: string = yield select(appSettingsSelectors.fcmToken);
    const isPushnotificationsEnabled: boolean = yield select(appSettingsSelectors.pushnotificationsEnabled);
    const subscribedPushIds: string[] = yield select(walletsSelectors.subscribedPushIds);

    if (fcm) {
      const hashes: string[] = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

      yield call(unsubscribePush, {
        data: {
          fcm,
          wallets: hashes,
        },
      });
      if (wallets.length === 1) {
        const filteredSubscribedPushIds = subscribedPushIds.filter(id => id !== wallets[0].id);

        yield put(checkSubscriptionPushSuccess([...filteredSubscribedPushIds]));
      } else {
        yield put(checkSubscriptionPushSuccess([]));
      }

      if (wallets.length === 1 && isPushnotificationsEnabled) {
        yield put(updatePushnotificationsSetting(false));
      }
    }
  } catch (error) {}
}

export function* subscribePushWalletsSaga(action: SubscribePushAllWalletsAction) {
  const {
    payload: { wallets },
  } = action;

  try {
    yield put(prepareWallets(wallets));

    const walletWithHashes: Wallet[] = yield Promise.all(
      wallets.map(async wallet => ({ ...wallet, hash: await getWalletHashedPublicKeys(wallet) })),
    );

    const { type } = yield take([WalletsAction.PrepareWalletsSuccess, WalletsAction.PrepareWalletsFailure]);

    if (type === WalletsAction.PrepareWalletsSuccess) {
      const fcm: string = yield select(appSettingsSelectors.fcmToken);
      const language: string = yield select(appSettingsSelectors.language);
      const isPushnotificationsEnabled: boolean = yield select(appSettingsSelectors.pushnotificationsEnabled);
      const subscribedPushIds: string[] = yield select(walletsSelectors.subscribedPushIds);
      const allWallets: string[] = yield select(walletsSelectors.allWallets);
      const hashes: string[] = yield all(wallets.map(wallet => call(getWalletHashedPublicKeys, wallet)));

      yield call(subscribePush, {
        fcm,
        wallets: hashes,
        language,
      });

      const ids: string[] = [];

      walletWithHashes.forEach((wallet: Wallet) => {
        ids.push(wallet.id);
      });

      yield put(checkSubscriptionPushSuccess([...subscribedPushIds, ...ids]));

      if (allWallets.length - 1 === subscribedPushIds.length + 1 && !isPushnotificationsEnabled) {
        yield put(updatePushnotificationsSetting(true));
      }
    }
  } catch (error) {
    logger.captureException(error);
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
  takeLatest(NotificationAction.CheckSubscriptionPushAction, checkSubscriptionPushSaga),
  takeEvery(NotificationAction.UnsubscribePushAllWalletsAction, unsubscribePushAllWalletsSaga),
  takeEvery(NotificationAction.SubscribePushAllWalletsAction, subscribePushWalletsSaga),
  takeEvery(NotificationAction.UnsubscribePushWalletAction, unsubscribePushWalletSaga),
];
