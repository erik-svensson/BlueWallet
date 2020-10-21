import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';

import { StatusState } from './reducer';

const local = (state: ApplicationState): StatusState => state.status;

export const internetConnectionStatus = createSelector(local, state => state.internetConnectionStatus);
export const serverConnectionStatus = createSelector(local, state => state.serverConnectionStatus);
