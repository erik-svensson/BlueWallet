import NetInfo from '@react-native-community/netinfo';
import { eventChannel } from 'redux-saga';
import { takeLatest, take, put, call } from 'redux-saga/effects';

import { BlueApp } from 'app/legacy';

import { setSubscribedScriptHashes, startListeners } from '../electrumX/actions';
import { addToastMessage } from '../toastMessages/actions';
import { loadWalletsSuccess } from '../wallets/actions';
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

function* onConnect() {
  yield put(updateServerConnectionStatusSuccess(true));
}

function onClose() {
  addToastMessage({
    description: i18n.connectionIssue.offlineMessageDescription,
    title: i18n.connectionIssue.offlineMessageTitle,
    secondsAfterHide: 20,
  }),
    updateServerConnectionStatusSuccess(false);
}

function* onReconnect() {
  yield put(setSubscribedScriptHashes([]));
  yield put(startListeners());
  const wallets = BlueApp.getWallets();
  yield put(loadWalletsSuccess(wallets));
  yield put(updateServerConnectionStatusSuccess(false));
}

export function* updateServerConnectionStatusSaga(action: UpdateServerConnectionStatusAction | unknown) {
  yield BlueElectrum.subscribeToConnect(onConnect);
  yield BlueElectrum.subscribeToClose(onClose);
  yield BlueElectrum.subscribeToReconnect(onReconnect);
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
