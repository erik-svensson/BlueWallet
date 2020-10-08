import { difference } from 'lodash';
import { flatten, compose, map } from 'lodash/fp';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, take, call, select } from 'redux-saga/effects';

import { Wallet } from 'app/consts';

import { actions as walletsActions, selectors as walletsSelectors } from '../wallets';
import { setBlockHeight, ElectrumXAction, scriptHashChanged, setSubscribedScriptHashes } from './actions';
import { subscribedScriptHashes } from './selectors';

const BlueElectrum = require('../../../BlueElectrum');

function emitBlockchainHeaders() {
  return eventChannel(emitter => {
    const eventName = 'blockchain.headers.subscribe';

    BlueElectrum.subscribe(eventName, (event: [{ height: number; hex: string }]) => {
      emitter(event[0]);
    });

    return () => {
      console.log('UNSUB emitBlockchainHeaders');

      BlueElectrum.unsubscribe(eventName);
    };
  });
}

export function* listenBlockchainHeadersSaga() {
  yield BlueElectrum.waitTillConnected();

  const { height: blockHeight } = yield BlueElectrum.getBlockchainHeaders();
  yield put(setBlockHeight(blockHeight));

  const chan = yield call(emitBlockchainHeaders);

  while (true) {
    const { height } = yield take(chan);
    yield put(setBlockHeight(height));
  }
}

function emitScriptHashesChange() {
  return eventChannel(emitter => {
    const eventName = 'blockchain.scripthash.subscribe';

    BlueElectrum.subscribe(eventName, (event: string[]) => {
      emitter(event);
    });

    return () => {
      console.log('UNSUB emitScriptHashesChange');
      BlueElectrum.unsubscribe(eventName);
    };
  });
}

export function* listenScriptHashesSaga() {
  yield BlueElectrum.waitTillConnected();
  console.log('listenScriptHashes');

  const chan = yield call(emitScriptHashesChange);

  while (true) {
    const event = yield take(chan);
    const [scriptHash] = event;
    console.log('scriptHash', scriptHash);

    yield put(scriptHashChanged(scriptHash));
  }
}

export function* subscribeToScriptHashes() {
  const wallets = yield select(walletsSelectors.wallets);

  const walletsScriptHashes = compose(
    flatten,
    map((wallet: Wallet) => wallet.getScriptHashes()),
  )(wallets);

  console.log('walletsScriptHashedsadsas', walletsScriptHashes);
  const subScriptHashes: string[] = yield select(subscribedScriptHashes);
  console.log('subscribedScriptHashes', subScriptHashes);

  // const scriptHashesToSub = walletsScriptHashes;
  // console.log('subscribedScriptHashes', subscribedScriptHashes);

  const scriptHashesToSub = difference(walletsScriptHashes, subScriptHashes);

  console.log('scriptHashesToSsssub', scriptHashesToSub);
  yield BlueElectrum.subscribeToSriptHashes(scriptHashesToSub);

  yield put(setSubscribedScriptHashes(scriptHashesToSub));
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
  takeLatest(ElectrumXAction.StartListeners, listenScriptHashesSaga),
  takeLatest(ElectrumXAction.StartListeners, listenBlockchainHeadersSaga),
];
