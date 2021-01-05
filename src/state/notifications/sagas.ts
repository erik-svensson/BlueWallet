import { Alert } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';

import { subscribeEmail, authenticateEmail, checkSubscriptionEmail } from 'app/api/emailApi';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
  SubscribeWalletAction,
  AuthenticateEmailAction,
  authenticateEmailSuccess,
  subscribeWalletSuccess,
  CheckSubscriptionAction,
  checkSubscription,
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
    const response: { session_token: string; result: 'success' | 'error' } = yield call(subscribeEmail, payload);
    if (response.session_token) {
      yield put(subscribeWalletSuccess(response.session_token));
    }
  } catch (error) {
    Alert.alert('Something went wrong');
    console.log('subscribeWalletSaga', error);
  }
}

export function* authenticateEmailSaga(action: AuthenticateEmailAction) {
  const { payload } = action as AuthenticateEmailAction;
  try {
    const response = yield call(authenticateEmail, payload);
    if (response.result === 'success') {
      yield put(authenticateEmailSuccess());
    }
    console.log('authenticateEmail', { response });
  } catch (error) {
    console.log('authenticateEmail', { error });
  }
}

export function* checkSubscriptionSaga(action: CheckSubscriptionAction) {
  const { payload } = action as CheckSubscriptionAction;
  try {
    const response = yield call(checkSubscriptionEmail, payload);
  } catch (error) {
    console.log('checkSubscriptionSaga error', error);
  }
}

export default [
  takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga),
  takeEvery(NotificationAction.SubscribeWalletAction, subscribeWalletSaga),
  takeEvery(NotificationAction.AuthenticateEmailAction, authenticateEmailSaga),
];
