import { createSelector } from 'reselect';

import { Wallet, AirdropGoal } from 'app/consts';
import { getReadableCommunityGoals } from 'app/helpers/airdrop';
import { formatDate, getTimezoneOffset, isAfter } from 'app/helpers/date';
import { ApplicationState } from 'app/state';

import { wallets } from '../wallets/selectors';
import { AirdropState } from './reducer';

const i18n = require('../../../loc');

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
export const goals = createSelector(local, state => state.airdropCommunityGoals);
export const badges = createSelector(local, state => state.badges);
export const airdropsWalletBalance = createSelector(local, state => state.airdropsWalletBalance);

export const getFormattedAirdropDate = createSelector(
  local,
  state => `${formatDate(state.endAirdrop as string, 'DD/MM/YYYY h A')} ${getTimezoneOffset()}`,
);

export const isAfterAirdrop = createSelector(local, state => isAfter(new Date(), state.endAirdrop));

export const getCommunityItem = createSelector(local, state => {
  const usersQuantity = state.usersQuantity;
  const goals = state.airdropCommunityGoals;

  const unreachedGoals = goals.filter((goal: AirdropGoal) => goal.threshold > usersQuantity);
  const nextGoal = unreachedGoals[0] || goals[goals.length - 1] || { threshold: 0 };
  const nextGoalIndex = goals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  return {
    header: i18n.airdrop.community.carouselItemHeader,
    circleInnerFirstLine: `${usersQuantity} ${
      usersQuantity == 1 ? i18n.airdrop.community.wallet : i18n.airdrop.community.wallets
    }`,
    circleInnerSecondLine: i18n.airdrop.community.airdropParticipants,
    footerFirstLine: getReadableCommunityGoals()[nextGoalIndex],
    footerSecondLine: `${nextGoal.threshold} ${i18n.airdrop.community.wallets}`,
    circleFillPercentage: (usersQuantity / nextGoal.threshold) * 100,
  };
});
