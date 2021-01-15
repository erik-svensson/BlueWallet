import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { CONST, AirdropWalletDetails, AirdropGoal } from 'app/consts';
import { isAfterAirdrop } from 'app/helpers/airdrop';
import { typography, palette } from 'app/styles';

import { AirdropWalletBalance } from './AirdropWalletBalance';

const i18n = require('../../loc');

interface Props {
  walletDetails: AirdropWalletDetails;
}

export const AirdropWalletBalanceCard: FC<Props> = ({ walletDetails }) => {
  const airdropGoals: AirdropGoal[] = [
    { threshold: 5, name: i18n.airdrop.walletsCarousel.shrimp },
    { threshold: 25, name: i18n.airdrop.walletsCarousel.crab },
    { threshold: 100, name: i18n.airdrop.walletsCarousel.shark },
    { threshold: 1000, name: i18n.airdrop.walletsCarousel.whale },
  ];

  const _isAfterAirdrop = isAfterAirdrop();

  const readableOrder = [i18n.order.first, i18n.order.second, i18n.order.third, i18n.order.fourth];
  const unreachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold > walletDetails.balance);
  // TODO: edge case of "all goals reached" not covered by designs. Awaiting UX input. For now returning last one - "whale"
  const nextGoal = unreachedGoals[0] || airdropGoals[airdropGoals.length - 1];
  const nextGoalIndex = airdropGoals.findIndex((goal: AirdropGoal) => goal.threshold === nextGoal.threshold);

  const reachedGoals = airdropGoals.filter((goal: AirdropGoal) => goal.threshold < walletDetails.balance);
  // TODO: edge case of "none goals reached" not covered by designs. Awaiting UX input. For now returning first one - "shrimp"
  const lastGoal = reachedGoals[reachedGoals.length - 1] || airdropGoals[0];

  return (
    <View style={styles.walletCard}>
      <AirdropWalletBalance
        balance={walletDetails.balance}
        walletName={walletDetails.name}
        threshold={nextGoal.threshold}
        footer={
          <>
            <Text style={styles.firstLine}>
              {_isAfterAirdrop
                ? i18n.airdrop.walletsCarousel.youReachedGoal
                : i18n.formatString(i18n.airdrop.walletsCarousel.yourNextGoal, {
                    order: readableOrder[nextGoalIndex],
                  })}
            </Text>
            <Text style={styles.secondLine}>
              {i18n.formatString(i18n.airdrop.walletsCarousel.avatarTeaser, {
                goalName: _isAfterAirdrop ? lastGoal.name : nextGoal.name,
                goalThreshold: _isAfterAirdrop ? lastGoal.threshold : nextGoal.threshold,
                unit: CONST.preferredBalanceUnit,
              })}
            </Text>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  walletCard: { alignItems: 'center' },
  firstLine: {
    ...typography.headline5,
    textAlign: 'center',
  },
  secondLine: {
    ...typography.body,
    color: palette.textGrey,
    lineHeight: 19,
  },
});
