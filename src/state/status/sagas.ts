import NetInfo from '@react-native-community/netinfo';
import { eventChannel } from 'redux-saga';
import { takeLatest, take, put, call, delay } from 'redux-saga/effects';

import { addToastMessage } from '../toastMessages/actions';
import {
  UpdateServerConnectionStatusAction,
  UpdateInternetConnectionStatusAction,
  updateInternetConnectionStatusSuccess,
  StatusAction,
  updateServerConnectionStatusSuccess,
} from './actions';

const BlueElectrum = require('../../../BlueElectrum');
const i18n = require('../../../loc');

function emitNetInfoStatus() {
  return eventChannel(emitter => {
    const eventListener = NetInfo.addEventListener(state => {
      emitter(state);
    });

    return () => {
      eventListener();
    };
  });
}

export function* updateServerConnectionStatusSaga(action: UpdateServerConnectionStatusAction | unknown) {
  while (true) {
    yield delay(10000);
    try {
      yield BlueElectrum.waitTillConnected();
      yield put(updateServerConnectionStatusSuccess(true));
    } catch (e) {
      yield put(
        addToastMessage({
          description: i18n.connectionIssue.noNetworkTitle,
          title: i18n.connectionIssue.noNetworkDescription,
          secondsAfterHide: 20,
        }),
      );
      yield put(updateServerConnectionStatusSuccess(false));
    }
  }
}

export function* updateInternetConnectionStatusSaga(action: UpdateInternetConnectionStatusAction | unknown) {
  const netInfoStatus = yield call(emitNetInfoStatus);
  while (true) {
    const { isInternetReachable } = yield take(netInfoStatus);
    if (!isInternetReachable) {
      yield put(
        addToastMessage({
          description: i18n.connectionIssue.offlineMessageDescription,
          title: i18n.connectionIssue.offlineMessageTitle,
          secondsAfterHide: 20,
        }),
      );
    }
    yield put(updateInternetConnectionStatusSuccess(isInternetReachable));
  }
}

export default [
  takeLatest(StatusAction.UpdateInternetConnectionStatus, updateInternetConnectionStatusSaga),
  takeLatest(StatusAction.UpdateServerConnectionStatus, updateServerConnectionStatusSaga),
];
