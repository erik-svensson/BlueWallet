/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TxType } from 'app/consts';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

const readableTransactionType = {
  [TxType.ALERT_PENDING]: i18n.transactions.label.pending,
  [TxType.ALERT_RECOVERED]: i18n.transactions.label.cancelled,
  [TxType.ALERT_CONFIRMED]: i18n.transactions.label.done,
  [TxType.RECOVERY]: i18n.transactions.label.recovered,
};

interface Props {
  type: TxType;
}

export const Label = ({ type }: Props) => (
  <View style={styles.labelWrapper}>
    <Text style={[styles.label, styles[type]]}>{readableTransactionType[type]}</Text>
  </View>
);

const styles = StyleSheet.create({
  labelWrapper: {
    display: 'flex',
  },
  label: {
    ...typography.status,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    textAlign: 'center',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  ALERT_PENDING: {
    backgroundColor: palette.textSecondary,
  },
  ALERT_CONFIRMED: {
    backgroundColor: palette.green,
  },
  RECOVERY: {
    backgroundColor: palette.textRed,
  },
  ALERT_RECOVERED: {
    backgroundColor: palette.mediumGrey,
  },
});
