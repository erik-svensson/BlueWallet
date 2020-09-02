import { takeEvery, put, all, call } from 'redux-saga/effects';

import { BlueApp } from 'app/legacy';

import { WalletsAction, loadWalletsSuccess, loadWalletsFailure } from './actions';

const BlueElectrum = require('../../../BlueElectrum');

export function* loadWalletsSaga() {
  try {
    yield BlueElectrum.waitTillConnected();

    yield all([
      call(() => BlueApp.fetchWalletBalances()),
      call(() => BlueApp.fetchWalletTransactions()),
      call(() => BlueApp.fetchWalletUtxos()),
    ]);

    const wallets = BlueApp.getWallets();
    yield put(loadWalletsSuccess(wallets));
  } catch (e) {
    yield put(loadWalletsFailure(e.message));
  }
}

export default [takeEvery(WalletsAction.LoadWallets, loadWalletsSaga)];
