import { createSelector } from 'reselect';

import { EmailNotificationsError } from 'app/api';
import { GeneralHttpError } from 'app/api/client';
import { ApplicationState } from 'app/state';
import { WalletsState } from 'app/state/wallets/reducer';
import { getById } from 'app/state/wallets/selectors';

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

export const readableError = createSelector(notificationError, errorMsg => {
  if (errorMsg.includes(GeneralHttpError.NO_MESSAGE) || errorMsg.includes(GeneralHttpError.NO_RESPONSE)) {
    return i18n.connectionIssue.couldntConnectToServer;
  }
  if (errorMsg.includes(EmailNotificationsError.FAILED_TO_SEND)) {
    return i18n.notifications.invalidAddressError;
  }
  if (errorMsg.includes(EmailNotificationsError.INVALID_EMAIL)) {
    return i18n.notifications.invalidAddressError;
  }
  if (
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_2_LEFT) ||
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_2_LEFT_2)
  ) {
    return i18n.formatString(i18n.notifications.codeError, {
      attemptsLeft: 2,
    });
  }
  if (
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_1_LEFT) ||
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_1_LEFT_2)
  ) {
    return i18n.formatString(i18n.notifications.codeError, {
      attemptsLeft: 1,
    });
  }
  if (
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_NO_TRIALS_LEFT) ||
    errorMsg.includes(EmailNotificationsError.WRONG_PIN_NO_TRIALS_LEFT_2)
  ) {
    return i18n.notifications.codeFinalError;
  }
  if (errorMsg) {
    return i18n.notifications.genericError;
  } else return errorMsg;
});

export const isLoading = createSelector(local, state => state.isLoading);

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
