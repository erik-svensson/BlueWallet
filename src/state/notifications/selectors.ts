import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';

import { NotificationState } from './reducer';

const local = (state: ApplicationState): NotificationState => state.notifications;

export const email = createSelector(local, state => state.email);
export const isNotificationEmailSet = createSelector(local, state => state.isNotificationEmailSet);
export const isNotificationEmailSkip = createSelector(local, state => state.isNotificationEmailSkip);
export const pin = createSelector(local, state => state.pin);
