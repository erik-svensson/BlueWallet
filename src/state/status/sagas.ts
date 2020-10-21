import { UpdateServerConnectionStatusAction, UpdateInternetConnectionStatusAction, updateInternetConnectionStatusSuccess, StatusAction, updateServerConnectionStatusSuccess } from "./actions";
import NetInfo from "@react-native-community/netinfo";
import { takeLatest, take, put, call, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
const BlueElectrum = require('../../../BlueElectrum');

function emitNetInfoStatus() {
  return eventChannel(emitter => {
    const eventListener = NetInfo.addEventListener(state => {
      emitter(state);
    });

    return () => {
      eventListener();
    };
  })
}

export function* updateServerConnectionStatusSaga(action: UpdateServerConnectionStatusAction | unknown) {
  while (true) {
    yield delay(10000);
    console.log('asd');
    try {
      yield BlueElectrum.waitTillConnected();
      yield put(updateServerConnectionStatusSuccess(true));
    } catch (e) {
      yield put(updateServerConnectionStatusSuccess(false));
    }
  }
}

export function* updateInternetConnectionStatusSaga(action: UpdateInternetConnectionStatusAction | unknown) {
  const netInfoStatus = yield call(emitNetInfoStatus);
  while (true) {
    const { isInternetReachable } = yield take(netInfoStatus);
    yield put(updateInternetConnectionStatusSuccess(isInternetReachable))
  }
}

export default [
  takeLatest(StatusAction.UpdateInternetConnectionStatus, updateInternetConnectionStatusSaga),
  takeLatest(StatusAction.UpdateServerConnectionStatus, updateServerConnectionStatusSaga),
];
