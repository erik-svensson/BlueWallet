import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';
import { WalletsState } from 'app/state/wallets/reducer';
import { getById } from 'app/state/wallets/selectors';

import { messages } from '../../../error';
import { NotificationState } from './reducer';

const i18n = require('../../../loc');

const local = (state: ApplicationState): NotificationState => state.notifications;

export const isNotificationEmailSet = createSelector(local, state => state.isNotificationEmailSet);
export const pin = createSelector(local, state => state.pin);
export const subscribedIds = createSelector(local, state => state.subscribedIds);
export const sessionToken = createSelector(local, state => state.sessionToken);
export const notificationError = createSelector(local, state => state.error);
export const storedEmail = createSelector(local, state => state.email);
export const storedPin = createSelector(local, state => state.pin);
export const readableError = createSelector(notificationError, err => {
  if (err.startsWith(messages.requestFailed5XX)) {
    return i18n.connectionIssue.couldntConnectToServer;
  }
  if (err === messages.alreadySubscribed) {
    return messages.alreadySubscribedReadable;
  }
  if (err === messages.invalidEmail) {
    return i18n.notifications.invalidAddressError;
  }
  return err;
});

export const isWalletSubscribed = createSelector(
  subscribedIds,
  getById,
  (_: WalletsState, id: string) => id,
  (ids, wallet) => {
    if (wallet) {
      return ids.some(id => id === wallet.id);
    }
    return false;
  },
);
