import { takeEvery, put } from 'redux-saga/effects';

import { Wallet, Transaction } from 'app/consts';
import { isAllWallets } from 'app/helpers/helpers';
import { BlueApp } from 'app/legacy';

import { loadTransactionsSuccess } from '../transactions/actions';
import { WalletsAction, loadWalletsSuccess, loadWalletsFailure } from './actions';

const BlueElectrum = require('../../../BlueElectrum');

export function* loadWalletsSaga(walletIndex?: number) {
  try {
    yield BlueElectrum.waitTillConnected();
    yield BlueApp.fetchWalletBalances(walletIndex);
    yield BlueApp.fetchWalletTransactions(walletIndex);
    yield BlueApp.saveToDisk();
    const allWalletsBalance = BlueApp.getBalance();
    const allWalletsIncomingBalance = BlueApp.getIncomingBalance();

    const allWallets = BlueApp.getWallets();
    const wallets: Wallet[] =
      allWallets.length > 1
        ? [
            {
              label: 'All wallets',
              balance: allWalletsBalance,
              incoming_balance: allWalletsIncomingBalance,
              preferredBalanceUnit: 'BTCV',
              type: '',
            },
            ...allWallets,
          ]
        : allWallets;

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      if (!isAllWallets(wallet)) {
        const walletBalanceUnit = wallet.getPreferredBalanceUnit();
        const walletLabel = wallet.getLabel();

        // mutating objects on purpose
        const enhanceTransactions = (t: Transaction) => {
          t.walletPreferredBalanceUnit = walletBalanceUnit;
          t.walletLabel = walletLabel;
        };
        wallet.transactions.forEach(enhanceTransactions);
        yield put(loadTransactionsSuccess(wallet.secret, wallet.transactions));
      }
    }
    yield put(loadWalletsSuccess(wallets));
  } catch (e) {
    yield put(loadWalletsFailure(e));
  }
}

export default [takeEvery(WalletsAction.LoadWallets, loadWalletsSaga)];
