import { CONST, AirdropGoal, AirdropCarouselCardData } from 'app/consts';

import { satoshiToBtc, formatToBtcvWithoutSign } from '../../utils/bitcoin';

const i18n = require('../../loc');

export const getReadableCommunityGoals = () => [
  i18n.airdrop.readableCommunityGoals.first,
  i18n.airdrop.readableCommunityGoals.second,
  i18n.airdrop.readableCommunityGoals.third,
  i18n.airdrop.readableCommunityGoals.fourth,
];

export const getReadableGoals = () => [
  i18n.airdrop.readableGoals.first,
  i18n.airdrop.readableGoals.second,
  i18n.airdrop.readableGoals.third,
  i18n.airdrop.readableGoals.fourth,
];

export const getCarouselItem = (
  data: { balance: number; label: string; id?: string },
  isAfterAirdrop: boolean,
  airdropGoals: AirdropGoal[],
): AirdropCarouselCardData => {
  const btcvBalance = satoshiToBtc(data.balance);
  const balance = formatToBtcvWithoutSign(btcvBalance);

  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > btcvBalance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals[0] || airdropGoals[airdropGoals.length - 1] || { value: 0, threshold: 1 };
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  const reachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold <= btcvBalance);
  // TODO: edge case of "none goals reached" not covered by designs. Awaiting UX input. For now returning first one - "shrimp"
  const previousGoal = reachedGoals[reachedGoals.length - 1] || airdropGoals[0];

  return {
    header: data.label,
    circleInnerFirstLine: balance,
    circleInnerSecondLine: i18n.airdrop.circularWalletBalance.yourBalance,
    footerFirstLine: isAfterAirdrop ? i18n.airdrop.walletsCarousel.youReachedGoal : getReadableGoals()[nextGoalIndex],
    footerSecondLine: i18n.formatString(i18n.airdrop.walletsCarousel.avatarTeaser, {
      goalName: isAfterAirdrop ? previousGoal.value : nextGoal.value,
      goalThreshold: isAfterAirdrop ? previousGoal.threshold : nextGoal.threshold,
      unit: CONST.preferredBalanceUnit,
    }),
    circleFillPercentage: (btcvBalance / nextGoal.threshold) * 100,
  };
};
