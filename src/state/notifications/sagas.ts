import { takeEvery, put, call } from 'redux-saga/effects';

import { subscribeEmail } from 'app/api/emailApi';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
  SubscribeWalletAction,
  AuthenticateEmailAction,
  authenticateEmail,
} from './actions';

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  try {
    yield put(createNotificationEmailSuccess(payload.email));
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
  takeEvery(NotificationAction.SubscribeWalletAction, subscribeWalletSaga),
  takeEvery(NotificationAction.AuthenticateEmailAction, authenticateEmailSaga),
];
