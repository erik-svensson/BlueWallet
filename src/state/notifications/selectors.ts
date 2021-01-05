import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';
import { walletsWithRecoveryTransaction, wallets } from 'app/state/wallets/selectors';

import { checkSubscription, CheckSubscriptionAction } from './actions';
import { NotificationState } from './reducer';

const local = (state: ApplicationState): NotificationState => state.notifications;

export const email = createSelector(local, state => state.email);
export const isNotificationEmailSet = createSelector(local, state => state.isNotificationEmailSet);

export const subscribedWallets = createSelector(wallets, local, (walletsList, state) => {
  const email = state.email;
  if (!email) return [];
  const hashes = walletsList.map(wallet => wallet.id);
  return walletsList.map(wallet => {
    const isSubscribedList = checkSubscription(hashes, email);
    return { ...wallet, email };
  });
});
