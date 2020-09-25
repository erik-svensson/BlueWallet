import { takeEvery, takeLatest, put, all, call, select } from 'redux-saga/effects';

import { Wallet } from 'app/consts';
import { BlueApp } from 'app/legacy';

import {
  WalletsAction,
  loadWalletsSuccess,
  loadWalletsFailure,
  DeleteWalletAction,
  deleteWalletSuccess,
  deleteWalletFailure,
  CreateWalletAction,
  ImportWalletAction,
  createWalletSuccess,
  createWalletFailure,
  importWalletSuccess,
  importWalletFailure,
  UpdateWalletAction,
  updateWalletSuccess,
  updateWalletFailure,
  SendTransactionAction,
  sendTransactionSuccess,
  sendTransactionFailure,
  refreshWalletsSuccess,
  refreshWalletsFailure,
  RefreshWalletsAction,
} from './actions';
import { wallets as walletsSelector } from './selectors';

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

export function* deleteWalletSaga(action: DeleteWalletAction | unknown) {
  const {
    payload: { id },
    meta,
  } = action as DeleteWalletAction;
  try {
    const wallet = BlueApp.removeWalletById(id);
    yield BlueApp.saveToDisk();

    yield put(deleteWalletSuccess(wallet));
    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    yield put(deleteWalletFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export function* createWalletSaga(action: CreateWalletAction | unknown) {
  const {
    payload: { wallet },
    meta,
  } = action as CreateWalletAction;
  try {
    yield wallet.generate();

    BlueApp.addWallet(wallet);
    yield BlueApp.saveToDisk();

    yield put(createWalletSuccess(wallet));
    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    yield put(createWalletFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export function* importWalletSaga(action: ImportWalletAction | unknown) {
  const {
    payload: { wallet },
    meta,
  } = action as ImportWalletAction;
  try {
    yield all([
      call(() => wallet.fetchBalance()),
      call(() => wallet.fetchTransactions()),
      call(() => wallet.fetchUtxos()),
    ]);
    BlueApp.addWallet(wallet);
    yield BlueApp.saveToDisk();

    yield put(importWalletSuccess(wallet));
    if (meta?.onSuccess) {
      meta.onSuccess(wallet);
    }
  } catch (e) {
    yield put(importWalletFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export function* updateWalletSaga(action: UpdateWalletAction | unknown) {
  const { wallet } = action as UpdateWalletAction;
  try {
    const updatedWallet = BlueApp.updateWallet(wallet);
    yield BlueApp.saveToDisk();

    yield put(updateWalletSuccess(updatedWallet));
  } catch (e) {
    yield put(updateWalletFailure(e.message));
  }
}

export function* sendTransactionSaga(action: SendTransactionAction | unknown) {
  const {
    payload: { txDecoded },
    meta,
  } = action as SendTransactionAction;

  try {
    yield BlueElectrum.ping();
    yield BlueElectrum.waitTillConnected();
    const result = BlueElectrum.broadcast(txDecoded.toHex());

    if (result?.code === 1) {
      const message = result.message.split('\n');
      throw new Error(`${message[0]}: ${message[2]}`);
    }

    yield put(sendTransactionSuccess());
    if (meta?.onSuccess) {
      meta.onSuccess(result);
    }
  } catch (e) {
    yield put(sendTransactionFailure(e.message));
    if (meta?.onFailure) {
      meta.onFailure(e.message);
    }
  }
}

export function* refreshWalletsSaga(action: RefreshWalletsAction | unknown) {
  const {
    payload: { addresses },
  } = action as RefreshWalletsAction;
  try {
    const wallets: Wallet[] = yield select(walletsSelector);
    const walletsToRefresh = wallets.filter(w => w.isAnyOfAddressesMine(addresses));

    yield all([
      call(() => Promise.all(walletsToRefresh.map(w => w.fetchBalance()))),
      call(() => Promise.all(walletsToRefresh.map(w => w.fetchTransactions()))),
      call(() => Promise.all(walletsToRefresh.map(w => w.fetchUtxos()))),
    ]);

    yield put(refreshWalletsSuccess(walletsToRefresh));
  } catch (e) {
    yield put(refreshWalletsFailure(e.message));
  }
}

export default [
  takeEvery(WalletsAction.DeleteWallet, deleteWalletSaga),
  takeLatest(WalletsAction.LoadWallets, loadWalletsSaga),
  takeEvery(WalletsAction.CreateWallet, createWalletSaga),
  takeEvery(WalletsAction.ImportWallet, importWalletSaga),
  takeEvery(WalletsAction.UpdateWallet, updateWalletSaga),
  takeEvery(WalletsAction.SendTransaction, sendTransactionSaga),
  takeEvery(WalletsAction.RefreshWallets, refreshWalletsSaga),
];
