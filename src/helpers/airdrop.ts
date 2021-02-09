import { CONST, AirdropGoal, AirdropCarouselCardData } from 'app/consts';
import { formatDate, getTimezoneOffset, isAfter } from 'app/helpers/date';

import { formatToBtcvWithoutSign } from '../../utils/bitcoin';

const i18n = require('../../loc');

export const getFormattedAirdropDate = () =>
  `${formatDate(CONST.airdropDate.local(), 'DD/MM/YYYY h a')} ${getTimezoneOffset()}`;

export const isAfterAirdrop = () => isAfter(new Date(), CONST.airdropDate);

export const getReadableOrder = () => [
  i18n.order.first,
  i18n.order.second,
  i18n.order.third,
  i18n.order.fourth,
  i18n.order.fifth,
  i18n.order.sixth,
];

export const lastThresholdBeforeInfinity = 20000;

export const airdropCommunityGoals: AirdropGoal[] = [
  { threshold: 2500, value: '25000' },
  { threshold: 5000, value: '50000' },
  { threshold: 10000, value: '100000' },
  { threshold: lastThresholdBeforeInfinity, value: '200000' },
  { threshold: 40000, value: '500000' }, // TODO: for now it s 400000 so users can see some progress in progress bar, but in reality if it s 20k+ it s already unlocked
];

export const getCommunityItem = (usersQuantity: number): AirdropCarouselCardData => {
  const unreachedGoals = airdropCommunityGoals.filter((goal: AirdropGoal) => goal.threshold > usersQuantity);
  const nextGoal = unreachedGoals[0] || airdropCommunityGoals[airdropCommunityGoals.length - 1];
  const nextGoalIndex = airdropCommunityGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  return {
    header: i18n.airdrop.community.carouselItemHeader,
    circleInnerFirstLine: `${usersQuantity} ${
      usersQuantity == 1 ? i18n.airdrop.community.user : i18n.airdrop.community.users
    }`,
    circleInnerSecondLine: i18n.airdrop.community.airdropParticipants,
    footerFirstLine: i18n.formatString(i18n.airdrop.community.goal, {
      order: getReadableOrder()[nextGoalIndex],
    }),
    footerSecondLine: `${nextGoal.threshold} ${i18n.airdrop.community.users}`,
    circleFillPercentage: (usersQuantity / nextGoal.threshold) * 100,
  };
};

export const getCarouselItem = (data: { balance: number; label: string }): AirdropCarouselCardData => {
  const _isAfterAirdrop = isAfterAirdrop();

  const airdropGoals: AirdropGoal[] = [
    { threshold: 5, value: i18n.airdrop.walletsCarousel.shrimp },
    { threshold: 25, value: i18n.airdrop.walletsCarousel.crab },
    { threshold: 100, value: i18n.airdrop.walletsCarousel.shark },
    { threshold: 1000, value: i18n.airdrop.walletsCarousel.whale },
  ];

  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > data.balance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals[0] || airdropGoals[airdropGoals.length - 1];
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  const reachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold <= data.balance);
  // TODO: edge case of "none goals reached" not covered by designs. Awaiting UX input. For now returning first one - "shrimp"
  const previousGoal = reachedGoals[reachedGoals.length - 1] || airdropGoals[0];

  return {
    header: data.label,
    circleInnerFirstLine: formatToBtcvWithoutSign(data.balance),
    circleInnerSecondLine: i18n.airdrop.circularWalletBalance.yourBalance,
    footerFirstLine: _isAfterAirdrop
      ? i18n.airdrop.walletsCarousel.youReachedGoal
      : i18n.formatString(i18n.airdrop.walletsCarousel.yourNextGoal, {
          order: getReadableOrder()[nextGoalIndex],
        }),
    footerSecondLine: i18n.formatString(i18n.airdrop.walletsCarousel.avatarTeaser, {
      goalName: _isAfterAirdrop ? previousGoal.value : nextGoal.value,
      goalThreshold: _isAfterAirdrop ? previousGoal.threshold : nextGoal.threshold,
      unit: CONST.preferredBalanceUnit,
    }),
    circleFillPercentage: (data.balance / nextGoal.threshold) * 100,
  };
};
