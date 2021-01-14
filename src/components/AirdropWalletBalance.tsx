import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { typography } from 'app/styles';

import { AirdropWalletBalanceCircle } from './AirdropWalletBalanceCircle';

interface Props {
  balance: number;
  walletName: string;
  footer: React.ReactNode;
  threshold: number;
}

export const AirdropWalletBalance: FC<Props> = ({ balance, walletName, footer, threshold }) => (
  <View>
    <Text style={styles.header}>{walletName}</Text>
    <AirdropWalletBalanceCircle balance={balance} threshold={threshold} />
    <View style={styles.footerContainer}>{footer}</View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    ...typography.headline10,
    textAlign: 'center',
    marginBottom: 13,
  },
  footerContainer: {
    marginTop: 11,
  },
});
