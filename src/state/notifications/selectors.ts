import { createSelector } from 'reselect';

import { checkSubscriptionEmail } from 'app/api';
import { Wallet } from 'app/consts';
import { getWalletHashedPublicKeys } from 'app/helpers/wallets';
import { ApplicationState } from 'app/state';
import { WalletsState } from 'app/state/wallets/reducer';
import { wallets, getById } from 'app/state/wallets/selectors';

import { checkSubscription, CheckSubscriptionAction, NotificationAction } from './actions';
import { NotificationState } from './reducer';

const local = (state: ApplicationState): NotificationState => state.notifications;

export const email = createSelector(local, state => state.email);
export const isNotificationEmailSet = createSelector(local, state => state.isNotificationEmailSet);
export const isNotificationEmailSkip = createSelector(local, state => state.isNotificationEmailSkip);
export const pin = createSelector(local, state => state.pin);

export const subscribedWallets = createSelector(wallets, local, (walletsList, state) => {
  const email = state.email;
  if (!email) return [];
  // const hashes = walletsList.map(wallet => wallet.id);
  const isSubscribedList = [true]; //checkSubscription(hashes, email);
  return walletsList.filter((wallet, index) => !!isSubscribedList[index] && wallet);
});
