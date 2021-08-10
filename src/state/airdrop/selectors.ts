import { createSelector } from 'reselect';

import { Wallet, CONST, AirdropGoal, AirdropCarouselCardData, DateType } from 'app/consts';
import { formatDate, getTimezoneOffset, isAfter } from 'app/helpers/date';
import { ApplicationState } from 'app/state';

import { formatToBtcvWithoutSign, satoshiToBtc } from '../../../utils/bitcoin';
import { wallets } from '../wallets/selectors';
import { AirdropState } from './reducer';

const local = (state: ApplicationState): AirdropState => state.airdrop;

export const subscribedIds = createSelector(local, state => state.subscribedIds);
export const thankYouSeen = createSelector(local, state => state.thankYouSeen);
export const thankYouFlowCompleted = createSelector(local, state => state.thankYouFlowCompleted);

export const airdropReadyWallets = createSelector(wallets, wallets => wallets);
export const subscribedWallets = createSelector([wallets, subscribedIds], (wallets, subscribedIds) =>
  wallets.filter((w: Wallet) => subscribedIds.includes(w.id)),
);
export const availableWallets = createSelector([wallets, subscribedIds], (wallets, subscribedIds) =>
  wallets.filter((w: Wallet) => !subscribedIds.includes(w.id)),
);
export const airdropUsersQuantity = createSelector(local, state => state.usersQuantity);
export const isLoading = createSelector(local, state => state.isLoading);
export const hasError = createSelector(local, state => !!state.error);
export const airdropDate = createSelector(local, state => state.endAirdrop);

export const getFormattedAirdropDate = createSelector(local, state => {
  const date = state.endAirdrop;

  return `${formatDate(date as string, 'DD/MM/YYYY h a')} ${getTimezoneOffset()}`;
});

export const isAfterAirdrop = createSelector(local, state => {
  const date = state.endAirdrop;

  return isAfter(new Date(), date);
});
