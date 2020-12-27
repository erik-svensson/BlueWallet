import { takeEvery, put } from 'redux-saga/effects';

import {
  createNotificationEmailFailure,
  createNotificationEmailSuccess,
  CreateNotificationEmailAction,
  NotificationAction,
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

export default [takeEvery(NotificationAction.CreateNotificationEmail, createNotificationEmailSaga)];