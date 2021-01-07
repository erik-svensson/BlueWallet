import { takeEvery, put, call } from 'redux-saga/effects';

import { verifyEmail } from 'app/api';
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
    yield put(setNotificationEmailSuccess(email));
    const verifyCode = yield call(() => verifyEmail({ email }));
    if (verifyCode.result === Result.success) {
      const decryptedCode = yield call(() => decryptCode(email, verifyCode.pin));
      yield StoreService.setStoreValue('email', email);
      //Temporaly till we dont have email services run we need know correct pin from backend, remove after
      console.log(decryptedCode, '>>>>');
      yield put(verifyNotificationEmail(decryptedCode));
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

export default [
  takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga),
  takeEvery(NotificationAction.SetNotificationEmail, setNotificationEmailSaga),
];
