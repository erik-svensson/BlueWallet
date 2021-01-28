import { createSelector } from 'reselect';

import { Wallet } from 'app/consts';
import { HDSegwitP2SHAirWallet } from 'app/legacy';
import { ApplicationState } from 'app/state';

import { WalletsState } from '../wallets/reducer';
import { AirdropState } from './reducer';

const local = (state: ApplicationState): AirdropState => state.airdrop;
const walletsState = (state: ApplicationState): WalletsState => state.wallets;

export const thankYouSeen = createSelector(local, state => state.thankYouSeen);
export const thankYouFlowCompleted = createSelector(local, state => state.thankYouFlowCompleted);
export const airdropReadyWallets = createSelector(walletsState, state => {
  return state.wallets.length > 0
    ? state.wallets.filter((wallet: Wallet) => wallet.type === HDSegwitP2SHAirWallet.type)
    : [];
});

export const subscribedWallets = createSelector([walletsState, local], (walletsState, airdropState) => {
  return walletsState.wallets.length > 0
    ? walletsState.wallets.filter(
        (wallet: Wallet) =>
          wallet.type === HDSegwitP2SHAirWallet.type && airdropState.subscribedIds.includes(wallet.id),
      )
    : [];
});

export const isLoading = createSelector(local, state => state.isLoading);
export const error = createSelector(local, state => state.error);
