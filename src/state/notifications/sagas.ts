import { takeEvery, put, call } from 'redux-saga/effects';

import { StoreService } from 'app/services';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
} from './actions';

export function* createNotificationEmailSaga(action: CreateNotificationEmailAction | unknown) {
  const { meta, payload } = action as CreateNotificationEmailAction;
  try {
    yield call(StoreService.setStoreValue, 'email', payload.email);
    yield put(createNotificationEmailSuccess());
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

export default [takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga)];
