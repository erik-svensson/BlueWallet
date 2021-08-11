import { CONST, AirdropGoal, AirdropCarouselCardData, DateType } from 'app/consts';

import { formatToBtcvWithoutSign, satoshiToBtc } from '../../utils/bitcoin';

const i18n = require('../../loc');

export const getReadableOrder = () => [
  i18n.order.first,
  i18n.order.second,
  i18n.order.third,
  i18n.order.fourth,
  i18n.order.fifth,
  i18n.order.sixth,
];

export const getCarouselItem = (
  data: { balance: number; label: string },
  isAfterAirdrop: boolean,
  airdropGoals: AirdropGoal[],
): AirdropCarouselCardData => {
  const btcvBalance = satoshiToBtc(data.balance);
  const balance = formatToBtcvWithoutSign(btcvBalance);

  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > btcvBalance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals[0] || airdropGoals[airdropGoals.length - 1];
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  const reachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold <= btcvBalance);
  // TODO: edge case of "none goals reached" not covered by designs. Awaiting UX input. For now returning first one - "shrimp"
  const previousGoal = reachedGoals[reachedGoals.length - 1] || airdropGoals[0];

  return {
    header: data.label,
    circleInnerFirstLine: balance,
    circleInnerSecondLine: i18n.airdrop.circularWalletBalance.yourBalance,
    footerFirstLine: isAfterAirdrop
      ? i18n.airdrop.walletsCarousel.youReachedGoal
      : i18n.formatString(i18n.airdrop.walletsCarousel.yourNextGoal, {
          order: getReadableOrder()[nextGoalIndex],
        }),
    footerSecondLine: i18n.formatString(i18n.airdrop.walletsCarousel.avatarTeaser, {
      goalName: isAfterAirdrop ? previousGoal.value : nextGoal.value,
      goalThreshold: isAfterAirdrop ? previousGoal.threshold : nextGoal.threshold,
      unit: CONST.preferredBalanceUnit,
    }),
    circleFillPercentage: (data.balance / nextGoal.threshold) * 100,
  };
};
