import { takeEvery, put, call } from 'redux-saga/effects';

import { verifyEmail } from 'app/api';
import { StoreService } from 'app/services';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
  verifyNotificationEmail,
} from './actions';

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  const email = payload.email;
  try {
    const savedEmail = yield StoreService.getStoreValue('email');
    if (!savedEmail || !!email) {
      yield StoreService.setStoreValue('email', email);
      yield put(createNotificationEmailSuccess(email));
      const verifyCode = yield call(() => verifyEmail({ email }));
      yield put(verifyNotificationEmail(verifyCode));
      if (meta?.onSuccess) {
        meta.onSuccess();
      }
    }
  } catch (e) {
    yield put(createNotificationEmailFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export default [takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga)];
