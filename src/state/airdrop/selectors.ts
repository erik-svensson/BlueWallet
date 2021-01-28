import { createSelector } from 'reselect';

import { Wallet } from 'app/consts';
import { HDSegwitP2SHAirWallet } from 'app/legacy';
import { ApplicationState } from 'app/state';

import { wallets } from '../wallets/selectors';
import { AirdropState } from './reducer';

const local = (state: ApplicationState): AirdropState => state.airdrop;

export const subscribedIds = createSelector(local, state => state.subscribedIds);
export const thankYouSeen = createSelector(local, state => state.thankYouSeen);
export const thankYouFlowCompleted = createSelector(local, state => state.thankYouFlowCompleted);
export const airdropReadyWallets = createSelector(wallets, wallets =>
  wallets.filter((w: Wallet) => w.type === HDSegwitP2SHAirWallet.type),
);
export const subscribedWallets = createSelector([wallets, subscribedIds], (wallets, subscribedIds) =>
  wallets.filter((w: Wallet) => subscribedIds.includes(w.id)),
);
export const availableWallets = createSelector([wallets, subscribedIds], (wallets, subscribedIds) =>
  wallets.filter((w: Wallet) => !subscribedIds.includes(w.id)),
);
export const isLoading = createSelector(local, state => state.isLoading);
export const error = createSelector(local, state => state.error);
