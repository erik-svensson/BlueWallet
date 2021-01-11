import { createSelector } from 'reselect';

import { ApplicationState } from 'app/state';

import { AirdropState } from './reducer';

const local = (state: ApplicationState): AirdropState => state.airdrop;

export const thankYouSeen = createSelector(local, state => state.thankYouSeen);
export const thankYouFlowCompleted = createSelector(local, state => state.thankYouFlowCompleted);
