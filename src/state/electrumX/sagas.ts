import { eventChannel } from 'redux-saga';
import { takeLatest, put, take, call } from 'redux-saga/effects';

import { setBlockHeight, ElectrumXAction } from './actions';

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
  yield BlueElectrum.waitTillConnected();

  const { height: blockHeight } = yield BlueElectrum.getBlockchainHeaders();
  yield put(setBlockHeight(blockHeight));

  const chan = yield call(emitBlockchainHeaders);

  while (true) {
    const { height } = yield take(chan);
    yield put(setBlockHeight(height));
  }
}

export default [takeLatest(ElectrumXAction.StartListeners, listenBlockchainHeadersSaga)];
