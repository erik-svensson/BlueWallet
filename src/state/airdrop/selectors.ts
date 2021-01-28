import { differenceBy } from 'lodash';
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
export const airdropReadyWallets = createSelector(walletsState, state =>
  state.wallets.filter((w: Wallet) => w.type === HDSegwitP2SHAirWallet.type),
);

export const subscribedWallets = createSelector([walletsState, local], (walletsState, airdropState) =>
  walletsState.wallets.filter((w: Wallet) => airdropState.subscribedIds.includes(w.id)),
);

export const availableWallets = createSelector([walletsState, local], (walletsState, airdropState) =>
  walletsState.wallets.filter((w: Wallet) => !airdropState.subscribedIds.includes(w.id)),
);

export const isLoading = createSelector(local, state => state.isLoading);
export const error = createSelector(local, state => state.error);
