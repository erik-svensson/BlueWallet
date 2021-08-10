import { takeEvery, put, call } from 'redux-saga/effects';

import {
  subscribeAirdropWallet,
  checkWalletsAirdropSubscription,
  checkBalance,
  checkBalanceWallet,
} from 'app/api/airdrop/client';
import { Wallet } from 'app/consts';
import { getUtcDate } from 'app/helpers/date';
import * as helpers from 'app/helpers/wallets';

import {
  AirdropAction,
  SubscribeWalletAction,
  subscribeWalletSuccess,
  subscribeWalletFailure,
  CheckSubscriptionAction,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  getAirdropStatusBalanceSuccess,
  getAirdropStatusBalanceFailure,
  setEndDateAirdropAction,
} from './actions';

enum Result {
  error = 'error',
  success = 'success',
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload, meta } = action as SubscribeWalletAction;

  try {
    const walletPayload: string = yield call(helpers.getWalletHashedPublicKeys, payload);

    const response: { msg?: string; result: Result } = yield call(subscribeAirdropWallet, { wallet: walletPayload });

    if (response.result === Result.error) {
      throw new Error(response.result);
    }

    //   //TODO:
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
      //@ts-ignore
      const walletsWithHashes = yield Promise.all(
        wallets.map(async (wallet: Wallet) => ({ ...wallet, hash: await helpers.getWalletHashedPublicKeys(wallet) })),
      );

      const hashes = walletsWithHashes.map((wallet: Wallet) => wallet.hash);
      //@ts-ignore
      const response = yield call(checkWalletsSubscription, { hashes });

      if (response.result === Result.error) {
        throw new Error(response.result);
      }

      walletsWithHashes.forEach((wallet: Wallet) => {
        Object.fromEntries(
          Object.entries(response.result).filter(async ([key, value]) => {
            if (wallet.hash === key && !!value) {
              ids.push(wallet.id);
            }
          }),
        );
      });
    }

    yield put(checkSubscriptionSuccess(ids));
  } catch (error) {
    yield put(checkSubscriptionFailure(error.msg));
  }
}

export function* getAirdropStatusBalanceSaga() {
  try {
    //@ts-ignore
    const response = yield call(checkBalance);
    const { result } = response;

    yield put(setEndDateAirdropAction(getUtcDate(result.ends)));
    yield put(getAirdropStatusBalanceSuccess(result.users));
  } catch (error) {
    yield put(getAirdropStatusBalanceFailure(error.msg));
  }
}

export default [
  takeEvery(AirdropAction.CheckSubscription, checkSubscriptionSaga),
  takeEvery(AirdropAction.SubscribeWallet, subscribeWalletSaga),
  takeEvery(AirdropAction.GetAirdropStatusBalance, getAirdropStatusBalanceSaga),
];