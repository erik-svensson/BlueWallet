import NetInfo from '@react-native-community/netinfo';
import { difference } from 'lodash';
import { flatten, compose, map } from 'lodash/fp';
import RNBootSplash from 'react-native-bootsplash';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, take, call, select } from 'redux-saga/effects';

import { Wallet } from 'app/consts';

import { actions as walletsActions, selectors as walletsSelectors } from '../wallets';
import {
  setBlockHeight,
  fetchBlockHeightFailure,
  fetchBlockHeightSuccess,
  ElectrumXAction,
  scriptHashChanged,
  setSubscribedScriptHashes,
  setInternetConnection,
  setServerConnection,
  connectionClosed,
  connectionReconnected,
} from './actions';
import { subscribedScriptHashes } from './selectors';

const BlueElectrum = require('../../../BlueElectrum');

function emitBlockchainHeaders() {
  return eventChannel(emitter => {
    const eventName = 'blockchain.headers.subscribe';

    BlueElectrum.subscribe(eventName, (event: [{ height: number; hex: string }]) => {
      emitter(event[0]);
    });

    return () => {
      BlueElectrum.unsubscribe(eventName);
    };
  });
}

export function* listenBlockchainHeadersSaga() {
  const chan = yield call(emitBlockchainHeaders);

  while (true) {
    const { height } = yield take(chan);
    yield put(setBlockHeight(height));
  }
}

export function* fetchBlockchainHeadersSaga() {
  try {
    yield BlueElectrum.waitTillConnected();
    const { height: blockHeight } = yield BlueElectrum.getBlockchainHeaders();
    yield put(fetchBlockHeightSuccess(blockHeight));
  } catch (err) {
    yield put(fetchBlockHeightFailure(err.message));
  }
}

function emitScriptHashesChange() {
  return eventChannel(emitter => {
    const eventName = 'blockchain.scripthash.subscribe';

    BlueElectrum.subscribe(eventName, (event: string[]) => {
      emitter(event);
    });

    return () => {
      BlueElectrum.unsubscribe(eventName);
    };
  });
}

export function* listenScriptHashesSaga() {
  yield BlueElectrum.waitTillConnected();

  const chan = yield call(emitScriptHashesChange);

  while (true) {
    const event = yield take(chan);
    const [scriptHash] = event;

    yield put(scriptHashChanged(scriptHash));
  }
}

function emitOnConnect() {
  return eventChannel(emitter => {
    BlueElectrum.subscribeToOnConnect(() => {
      console.log('Connected');
      emitter(true);
    });

    return () => {};
  });
}

export function* listenOnConnect() {
  yield BlueElectrum.waitTillConnected();

  const chan = yield call(emitOnConnect);

  while (true) {
    const event = yield take(chan);
    console.log('listenOnConnect', event);
  }
}

function emitOnReconnect() {
  return eventChannel(emitter => {
    BlueElectrum.subscribeToOnReconnect(() => {
      console.log('Reconnected');
      emitter(true);
    });

    return () => {};
  });
}

export function* listenOnReconnect() {
  yield BlueElectrum.waitTillConnected();

  const chan = yield call(emitOnReconnect);

  while (true) {
    const event = yield take(chan);
    console.log('listenOnReconnect', event);
    yield put(connectionReconnected());
  }
}

function emitOnClose() {
  return eventChannel(emitter => {
    BlueElectrum.subscribeToOnClose(() => {
      console.log('Close');
      emitter(true);
    });

    return () => {};
  });
}

export function* listenOnClose() {
  yield BlueElectrum.waitTillConnected();

  const chan = yield call(emitOnClose);

  while (true) {
    yield take(chan);
    yield put(connectionClosed());
  }
}

export function* subscribeToScriptHashes() {
  const wallets = yield select(walletsSelectors.wallets);

  const walletsScriptHashes = compose(
    flatten,
    map((wallet: Wallet) => wallet.getScriptHashes()),
  )(wallets);

  const subScriptHashes: string[] = yield select(subscribedScriptHashes);

  const scriptHashesToSub = difference(walletsScriptHashes, subScriptHashes);

  yield BlueElectrum.subscribeToSriptHashes(scriptHashesToSub);

  const scriptHashesToUnsub = difference(subScriptHashes, walletsScriptHashes);

  yield BlueElectrum.unsubscribeFromSriptHashes(scriptHashesToUnsub);

  yield put(setSubscribedScriptHashes(walletsScriptHashes));
}

export function* checkConnection() {
  const { isInternetReachable } = yield NetInfo.fetch();
  yield put(setInternetConnection(isInternetReachable));

  const isServerConnected = yield BlueElectrum.ping();
  yield put(setServerConnection(isServerConnected));
  RNBootSplash.hide({ duration: 250 });
}

function emitInternetConnectionChange() {
  return eventChannel(emitter => {
    const unsubscribe = NetInfo.addEventListener(state => {
      emitter(state);
    });
    return () => {
      unsubscribe();
    };
  });
}

export function* listenToInternetConnection() {
  const chan = yield call(emitInternetConnectionChange);

  while (true) {
    const { isInternetReachable } = yield take(chan);
    yield put(setInternetConnection(!!isInternetReachable));
  }
}

export default [
  takeLatest(
    [
      walletsActions.WalletsAction.LoadWalletsSuccess,
      walletsActions.WalletsAction.ImportWalletSuccess,
      walletsActions.WalletsAction.CreateWalletSuccess,
      walletsActions.WalletsAction.DeleteWalletSuccess,
    ],
    subscribeToScriptHashes,
  ),
  takeLatest(ElectrumXAction.StartListeners, listenToInternetConnection),
  takeLatest(ElectrumXAction.StartListeners, checkConnection),
  takeLatest(ElectrumXAction.StartListeners, listenOnClose),
  takeLatest(ElectrumXAction.StartListeners, listenOnReconnect),
  takeLatest(ElectrumXAction.StartListeners, listenOnConnect),
  takeLatest([ElectrumXAction.StartListeners, ElectrumXAction.ConnectionReconnected], listenScriptHashesSaga),
  takeLatest([ElectrumXAction.StartListeners, ElectrumXAction.ConnectionReconnected], listenBlockchainHeadersSaga),
  takeLatest(ElectrumXAction.FetchBlockHeight, fetchBlockchainHeadersSaga),
];
