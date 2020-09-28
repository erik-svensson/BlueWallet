import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  type: 'general' | 'detailed';
  amount?: number;
  balanceLeft?: number;
}

export const Warning = ({ type, amount, balanceLeft }: Props) => {
  const generalWarning = () => {
    let copy = i18n.send.warningGeneral;
    copy = copy.split(i18n.send.warningBold);
    return (
      <>
        <Text style={typography.warning}>{copy[0]}</Text>
        <Text style={typography.warningBold}>{i18n.send.warningBold}</Text>
        <Text style={typography.warning}>{copy[1]}</Text>
      </>
    );
  };
  const detailedWarning = (firstAmount: number, secondAmount: number) => {
    let copy = i18n.send.detailedWarning;
    copy = copy.replace('AMOUNT', firstAmount);
    copy = copy.replace('BALANCE_LEFT', secondAmount);
    copy = copy.split(i18n.send.warningBold);
    return (
      <>
        <Text style={typography.warning}>{copy[0]}</Text>
        <Text style={typography.warningBold}>{i18n.send.warningBold}</Text>
        <Text style={typography.warning}>{copy[1]}</Text>
      </>
    );
  };

  const warningText = () => {
    if (type === 'general') {
      return generalWarning();
    }
    if (type === 'detailed' && amount && balanceLeft) {
      return detailedWarning(amount, balanceLeft);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        <Text style={typography.warningBold}>{i18n.send.warning}</Text>
        {warningText()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: palette.lightRed, borderRadius: 6, padding: 13 },
});
