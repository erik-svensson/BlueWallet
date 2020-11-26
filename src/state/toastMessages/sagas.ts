import { takeEvery, put, delay } from 'redux-saga/effects';

import { ToastMessageAction, AddToastMessageAction, hideToastMessage } from './actions';

export function* addToastMessageSaga(action: AddToastMessageAction | unknown) {
  const { payload } = action as AddToastMessageAction;

  yield delay(payload.milisecondsAfterHide);

  yield put(hideToastMessage(payload));
}

export default [takeEvery(ToastMessageAction.AddToastMessage, addToastMessageSaga)];
