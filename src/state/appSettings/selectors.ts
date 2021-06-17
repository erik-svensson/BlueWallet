import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';

import { AppSettingsState } from './reducer';

const local = (state: ApplicationState): AppSettingsState => state.appSettings;

export const language = createSelector(local, state => state.language);

export const isToast = createSelector(local, state => state.isToast);

export const fcmToken = createSelector(local, state => state.fcmToken);

export const pushnotificationsEnabled = createSelector(local, state => state.isPushnotificationsEnabled);

export const badge = createSelector(local, state => state.badge);
