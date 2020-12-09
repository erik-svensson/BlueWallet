import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';

import { NotificationState } from './reducer';

const local = (state: ApplicationState): NotificationState => state.notifications;

export const email = createSelector(local, state => state.email);
export const isNotificationEmailSet = createSelector(local, state => state.isNotificationEmailSet);
