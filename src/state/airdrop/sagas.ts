import { takeEvery, put, call } from 'redux-saga/effects';

import { subscribeWallet, checkWalletsSubscription, getUsersQuantity } from 'app/api/airdrop/client';
import { Wallet, WalletPayload } from 'app/consts';
import * as helpers from 'app/helpers/wallets';

import {
  AirdropAction,
  SubscribeWalletAction,
  subscribeWalletSuccess,
  subscribeWalletFailure,
  CheckSubscriptionAction,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  getUsersQuantitySuccess,
  getUsersQuantityFailure,
} from './actions';

enum Result {
  error = 'error',
  success = 'success',
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload, meta } = action as SubscribeWalletAction;

  try {
    const walletPayload: WalletPayload = yield call(helpers.walletToAddressesGenerationBase, payload);
    const response: { msg?: string; result: Result } = yield call(subscribeWallet, walletPayload);

    if (response.result === Result.error) {
      throw new Error(response.result);
    }
    if (response.result === Result.success) {
      yield put(subscribeWalletSuccess(payload.id));

      if (meta?.onSuccess) {
        meta.onSuccess();
      }
    }
  } catch (error) {
    yield put(subscribeWalletFailure(error.msg));

    if (meta?.onFailure) {
      meta.onFailure();
    }
  }
}

export function* checkSubscriptionSaga(action: CheckSubscriptionAction) {
  const {
    payload: { wallets },
  } = action;

  try {
    const ids: string[] = [];

    if (wallets.length > 0) {
      const walletsWithHashes = yield Promise.all(
        wallets.map(async (wallet: Wallet) => ({ ...wallet, hash: await helpers.getWalletHashedPublicKeys(wallet) })),
      );
      const hashes = walletsWithHashes.map((wallet: Wallet) => wallet.hash);
      const response = yield call(checkWalletsSubscription, { hashes });

      if (response.result === Result.error) {
        throw new Error(response.result);
      }

      walletsWithHashes.forEach((wallet: Wallet, index: number) => {
        if (response.result[index]) {
          ids.push(wallet.id);
        }
      });
    }

    yield put(checkSubscriptionSuccess(ids));
  } catch (error) {
    yield put(checkSubscriptionFailure(error.msg));
  }
}

export function* getUsersQuantitySaga() {
  try {
    const response: { msg?: string; result: Result; users: number } = yield call(getUsersQuantity);

    if (response.result === Result.error) {
      throw new Error(response.result);
    }
    if (response.result === Result.success) {
      yield put(getUsersQuantitySuccess(response.users));
    }
  } catch (error) {
    yield put(getUsersQuantityFailure(error.msg));
  }
}

export default [
  takeEvery(AirdropAction.CheckSubscription, checkSubscriptionSaga),
  takeEvery(AirdropAction.SubscribeWallet, subscribeWalletSaga),
  takeEvery(AirdropAction.GetUsersQuantity, getUsersQuantitySaga),
];
