import { CONST, AirdropGoal } from 'app/consts';
import { formatDate, getTimezoneOffset, isAfter } from 'app/helpers/date';

import { formatToBtcvWithoutSign } from '../../utils/bitcoin';

const i18n = require('../../loc');

export const getFormattedAirdropDate = () =>
  `${formatDate(CONST.airdropDate.local(), 'DD/MM/YYYY h a')} ${getTimezoneOffset()}`;

export const isAfterAirdrop = () => isAfter(new Date(), CONST.airdropDate);

export const getCarouselItem = (data: { balance: number; label: string }) => {
  const _isAfterAirdrop = isAfterAirdrop();

  const airdropGoals: AirdropGoal[] = [
    { threshold: 5, name: i18n.airdrop.walletsCarousel.shrimp },
    { threshold: 25, name: i18n.airdrop.walletsCarousel.crab },
    { threshold: 100, name: i18n.airdrop.walletsCarousel.shark },
    { threshold: 1000, name: i18n.airdrop.walletsCarousel.whale },
  ];

  const readableOrder = [i18n.order.first, i18n.order.second, i18n.order.third, i18n.order.fourth];

  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > data.balance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals[0] || airdropGoals[airdropGoals.length - 1];
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  const reachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold <= data.balance);
  // TODO: edge case of "none goals reached" not covered by designs. Awaiting UX input. For now returning first one - "shrimp"
  const lastGoal = reachedGoals[reachedGoals.length - 1] || airdropGoals[0];

  return {
    header: data.label,
    circleInnerFirstLine: formatToBtcvWithoutSign(data.balance),
    circleInnerSecondLine: i18n.airdrop.circularWalletBalance.yourBalance,
    footerFirstLine: _isAfterAirdrop
      ? i18n.airdrop.walletsCarousel.youReachedGoal
      : i18n.formatString(i18n.airdrop.walletsCarousel.yourNextGoal, {
          order: readableOrder[nextGoalIndex],
        }),
    footerSecondLine: i18n.formatString(i18n.airdrop.walletsCarousel.avatarTeaser, {
      goalName: _isAfterAirdrop ? lastGoal.name : nextGoal.name,
      goalThreshold: _isAfterAirdrop ? lastGoal.threshold : nextGoal.threshold,
      unit: CONST.preferredBalanceUnit,
    }),
    circleFillPercentage: (data.balance / nextGoal.threshold) * 100,
  };
};
