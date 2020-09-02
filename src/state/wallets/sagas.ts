import { takeEvery, put } from 'redux-saga/effects';

import { Wallet } from 'app/consts';
import { BlueApp } from 'app/legacy';

import { WalletsAction, loadWalletsSuccess, loadWalletsFailure } from './actions';

const BlueElectrum = require('../../../BlueElectrum');

export function* loadWalletsSaga() {
  try {
    yield BlueElectrum.waitTillConnected();
    yield BlueApp.fetchWalletBalances();
    yield BlueApp.fetchWalletTransactions();
    const wallets = BlueApp.getWallets();
    yield put(loadWalletsSuccess(wallets));
  } catch (e) {
    yield put(loadWalletsFailure(e));
  }
}

export default [takeEvery(WalletsAction.LoadWallets, loadWalletsSaga)];
