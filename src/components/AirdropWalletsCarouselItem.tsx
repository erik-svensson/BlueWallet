import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { CONST, AirdropWalletDetails, AirdropGoal } from 'app/consts';

import { AirdropWalletBalance } from './AirdropWalletBalance';
import { AirdropWalletFooter } from './AirdropWalletFooter';

const i18n = require('../../loc');

const airdropGoals: AirdropGoal[] = [
  { threshold: 5, name: i18n.airdrop.walletsCarousel.shrimp },
  { threshold: 25, name: i18n.airdrop.walletsCarousel.crab },
  { threshold: 100, name: i18n.airdrop.walletsCarousel.shark },
  { threshold: 1000, name: i18n.airdrop.walletsCarousel.whale },
];

const readableOrder = [i18n.order.first, i18n.order.second, i18n.order.third, i18n.order.fourth];

interface Props {
  walletDetails: AirdropWalletDetails;
}

export const AirdropWalletsCarouselItem: FC<Props> = ({ walletDetails }) => {
  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > walletDetails.balance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals.length > 0 ? unreachedGoals[0] : airdropGoals[airdropGoals.length - 1];
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  return (
    <View style={styles.walletCard}>
      <AirdropWalletBalance
        balance={walletDetails.balance}
        walletName={walletDetails.name}
        threshold={nextGoal.threshold}
        footer={
          <AirdropWalletFooter
            firstLine={i18n.formatString(i18n.airdrop.walletsCarousel.nextGoal, {
              order: readableOrder[nextGoalIndex],
            })}
            secondLine={i18n.formatString(i18n.airdrop.walletsCarousel.nextAvatarTeaser, {
              nearestGoalName: nextGoal.name,
              nearestGoalThreshold: nextGoal.threshold,
              unit: CONST.preferredBalanceUnit,
            })}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  walletCard: { alignItems: 'center' },
});
