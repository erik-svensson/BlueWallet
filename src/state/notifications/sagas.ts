import { takeEvery, put, call } from 'redux-saga/effects';

import { verifyEmail } from 'app/api';
import { subscribeEmail } from 'app/api/emailApi';
import { decryptCode } from 'app/helpers/decode';
import { StoreService } from 'app/services';

import {
  createNotificationEmailFailure,
  setNotificationEmailFailure,
  createNotificationEmailSuccess,
  setNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
  verifyNotificationEmail,
  skipNotificationEmail,
  SetNotificationEmailAction,
  SubscribeWalletAction,
  AuthenticateEmailAction,
  authenticateEmail,
} from './actions';

enum Result {
  error = 'error',
  success = 'success',
}

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  const email = payload.email;
  try {
    const savedEmail = yield StoreService.getStoreValue('email');
    if (!savedEmail && !!email) {
      yield put(createNotificationEmailSuccess(email));
    } else {
      yield put(skipNotificationEmail());
    }
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

export function* setNotificationEmailSaga(action: SetNotificationEmailAction | unknown) {
  const { meta, payload } = action as SetNotificationEmailAction;
  const email = payload.email;
  try {
    const verifyCode = yield call(() => verifyEmail({ email }));
    if (verifyCode.result === Result.success) {
      const decryptedCode = yield call(() => decryptCode(email, verifyCode.pin));
      yield put(setNotificationEmailSuccess(email));
      yield StoreService.setStoreValue('email', email);
      //Temporaly till we dont have email services run we need know correct pin from backend, remove after
      console.log(decryptedCode, '>>>>');
      yield put(verifyNotificationEmail(decryptedCode));
    } else {
      yield put(setNotificationEmailFailure('Your email cannot be verified'));
    }
    if (meta?.onSuccess) {
      meta.onSuccess();
    }
  } catch (e) {
    yield put(setNotificationEmailFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload } = action as SubscribeWalletAction;
  try {
    yield call(() => subscribeEmail(payload));
  } catch (error) {
    console.log({ error });
  }
}

export function* authenticateEmailSaga(action: AuthenticateEmailAction) {
  console.log({ action });
  const { payload } = action as AuthenticateEmailAction;
  try {
    const response = yield call(authenticateEmail);
    console.log({ response });
  } catch (error) {
    console.log({ error });
  }
}

export default [
  takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga),
  takeEvery(NotificationAction.SetNotificationEmail, setNotificationEmailSaga),
  takeEvery(NotificationAction.SubscribeWalletAction, subscribeWalletSaga),
  takeEvery(NotificationAction.AuthenticateEmailAction, authenticateEmailSaga),
];
