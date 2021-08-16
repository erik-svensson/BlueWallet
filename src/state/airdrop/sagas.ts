import { takeEvery, put, call, take, all } from 'redux-saga/effects';

import { subscribeAirdropWallet, checkBalance, checkWalletsAirdropSubscription } from 'app/api/airdrop/client';
import { AirdropCheckWalletsSubscriptionResponse } from 'app/api/airdrop/types';
import { AirdropGoal, Wallet } from 'app/consts';
import { getUtcDate } from 'app/helpers/date';
import * as helpers from 'app/helpers/wallets';

import { prepareWallets, WalletsAction } from '../wallets/actions';
import {
  AirdropAction,
  SubscribeWalletAction,
  subscribeWalletSuccess,
  subscribeWalletFailure,
  CheckSubscriptionAction,
  checkSubscriptionSuccess,
  checkSubscriptionFailure,
  getAirdropStatusSuccess,
  getAirdropStatusFailure,
  setEndDateAirdropAction,
  setAirdropCommunityGoalsAction,
  setAirdropBadgesAction,
  completeThankYouFlow,
  getReadableOrderAction,
} from './actions';

interface WalletWithHash extends Wallet {
  hash: string;
}

enum Result {
  error = 'error',
  success = 'success',
}

export function* subscribeWalletSaga(action: SubscribeWalletAction) {
  const { payload, meta } = action as SubscribeWalletAction;

  try {
    yield put(prepareWallets([payload]));

    const { type } = yield take([WalletsAction.PrepareWalletsSuccess, WalletsAction.PrepareWalletsFailure]);

    if (type === WalletsAction.PrepareWalletsSuccess) {
      const walletHash: string = yield call(helpers.getWalletHashedPublicKeys, payload);

      const response: { msg?: string; result: Result } = yield call(subscribeAirdropWallet, { wallet: walletHash });

      if (response.result === Result.error) {
        throw new Error(response.result);
      }

      if (response.result === Result.success) {
        yield put(completeThankYouFlow());
        yield put(subscribeWalletSuccess(payload.id));

        if (meta?.onSuccess) {
          meta.onSuccess();
        }
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

    yield put(prepareWallets(wallets));

    const { type } = yield take([WalletsAction.PrepareWalletsSuccess, WalletsAction.PrepareWalletsFailure]);

    if (type === WalletsAction.PrepareWalletsFailure) {
      throw new Error('Prepare wallet saga failed');
    } else {
      if (wallets.length > 0) {
        const walletsWithHashes: WalletWithHash[] = yield all(
          wallets.map(async (wallet: Wallet) => ({ ...wallet, hash: await helpers.getWalletHashedPublicKeys(wallet) })),
        );

        const hashes = walletsWithHashes.map((wallet: WalletWithHash) => wallet.hash);
        const response: AirdropCheckWalletsSubscriptionResponse = yield call(checkWalletsAirdropSubscription, {
          wallets: hashes,
        });

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
    }
  } catch (error) {
    yield put(checkSubscriptionFailure(error.msg));
  }
}

export function* getAirdropStatusSaga() {
  try {
    //@ts-ignore
    const response = yield call(checkBalance);
    const { result } = response;
    const airdropCommunityGoals: AirdropGoal[] = [];
    const airdropBadges: AirdropGoal[] = [];
    const readableGoals: string[] = [];

    yield put(setEndDateAirdropAction(getUtcDate(result.ends)));
    yield put(getAirdropStatusSuccess(result.users));
    const goals = result.goals;
    const amounts = result.award_amount;
    const badges = result.badges;

    for (const [goal, goalValue] of Object.entries(goals)) {
      readableGoals.push(goalValue as string);
      for (const [amount, amountValue] of Object.entries(amounts)) {
        if (goal === amount) {
          airdropCommunityGoals.push({ threshold: Number(goal), value: amountValue as string });
        }
      }
    }
    yield put(getReadableOrderAction(readableGoals));
    yield put(setAirdropCommunityGoalsAction(airdropCommunityGoals));

    for (const [badge, badgeValue] of Object.entries(badges)) {
      airdropBadges.push({ threshold: Number(badge), value: badgeValue as string });
    }
    yield put(setAirdropBadgesAction(airdropBadges));
  } catch (error) {
    yield put(getAirdropStatusFailure(error.msg));
  }
}

export default [
  takeEvery(AirdropAction.CheckSubscription, checkSubscriptionSaga),
  takeEvery(AirdropAction.SubscribeWallet, subscribeWalletSaga),
  takeEvery(AirdropAction.GetAirdropStatus, getAirdropStatusSaga),
];
