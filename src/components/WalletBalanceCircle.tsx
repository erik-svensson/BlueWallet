import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { typography, palette } from 'app/styles';

import { formatToBtcvWithoutSign } from '../../utils/bitcoin';

const i18n = require('../../loc');

interface Props {
  balance: number;
  threshold: number;
}

export const WalletBalanceCircle: FC<Props> = ({ balance, threshold }: Props) => (
  <AnimatedCircularProgress
    size={149}
    width={8}
    fill={(balance / threshold) * 100}
    tintColor={palette.textSecondary}
    backgroundColor={palette.lightGrey}
    lineCap="round"
  >
    {() => (
      <View>
        <Text style={styles.airdropBTCVBalance}>{formatToBtcvWithoutSign(balance)}</Text>
        <Text style={styles.yourBalanceText}>{i18n.airdrop.circularWalletBalance.yourBalance}</Text>
      </View>
    )}
  </AnimatedCircularProgress>
);

const styles = StyleSheet.create({
  airdropBTCVBalance: {
    ...typography.headline5,
    textAlign: 'center',
    color: palette.textSecondary,
  },
  yourBalanceText: {
    fontSize: 11,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
});
