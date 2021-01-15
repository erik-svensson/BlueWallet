import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { typography, palette } from 'app/styles';

interface Props {
  firstLine: string;
  secondLine: string;
}

export const AirdropWalletFooter: FC<Props> = ({ firstLine, secondLine }) => (
  <>
    <Text style={styles.firstLine}>{firstLine}</Text>
    <Text style={styles.secondLine}>{secondLine}</Text>
  </>
);

const styles = StyleSheet.create({
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
