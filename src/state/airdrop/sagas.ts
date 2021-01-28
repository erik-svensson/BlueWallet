import { takeEvery, put, call } from 'redux-saga/effects';

import { subscribeWallet, checkWalletsSubscription } from 'app/api/airdropApi';
import { Wallet } from 'app/consts';
import { getWalletHashedPublicKeys } from 'app/helpers/wallets';

import {
  AirdropAction,
  SubscribeWalletAction,
  subscribeWalletSuccess,
  subscribeWalletFailure,
  CheckSubscriptionAction,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
} from './actions';

enum Result {
  error = 'error',
  success = 'success',
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload } = action as SubscribeWalletAction;

  try {
    const response: { msg?: string; result: Result } = yield call(subscribeWallet, payload.wallet);

    if (response.result === Result.error) {
      throw new Error(response.result);
    }
    if (response.result === Result.success) {
      yield put(subscribeWalletSuccess(payload.id));
    }
  } catch (error) {
    yield put(subscribeWalletFailure(error.msg));
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
        wallets.map(async (wallet: Wallet) => ({ ...wallet, hash: await getWalletHashedPublicKeys(wallet) })),
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

export default [
  takeEvery(AirdropAction.CheckSubscription, checkSubscriptionSaga),
  takeEvery(AirdropAction.SubscribeWallet, subscribeWalletSaga),
];
