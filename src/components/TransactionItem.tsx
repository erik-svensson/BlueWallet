import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import i18n, { en } from 'app/locale';
import { typography, palette } from 'app/styles';

export const TransactionItem = ({ item }) => {
  const confirmations = () => {
    return i18n.transactions.list.conf + ': ' + (item.confirmations < 7 ? item.confirmations : '6') + '/6 ';
  };
  console.log('transaction item', item);
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text style={typography.headline5}>{item.walletLabel}</Text>
        <Text style={styles.label}>{confirmations()}</Text>
        <Text style={styles.label}>{moment.unix(item.time).format('LT')}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={typography.headline5}>{i18n.formatBalanceWithoutSuffix(Number(item.value))}</Text>
        <Text style={typography.headline5}>{item.walletPreferredBalanceUnit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 58,
    marginVertical: 8,
  },
  label: {
    ...typography.caption,
    color: palette.textGrey,
  },
  leftColumn: { justifyContent: 'space-between' },
  rightColumn: { alignItems: 'flex-end' },
});
