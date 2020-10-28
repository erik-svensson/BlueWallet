import React from 'react';
import { StyleSheet } from 'react-native';

import { images } from 'app/assets';
import { Image, Dropdown, ElipisisText } from 'app/components';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  balance: number;
  unit: string;
  label: React.ReactNode;
  onSelectPress?: () => void;
}

export const WalletDropdown = ({ balance, unit, label, onSelectPress }: Props) => (
  <Dropdown
    label={
      <>
        <ElipisisText style={styles.buttonDescription}>{label}</ElipisisText>
        <Image source={images.coin} style={styles.coinIcon} />
      </>
    }
    title={i18n.formatBalance(Number(balance), unit, true)}
    onSelectPress={onSelectPress}
  />
);

const styles = StyleSheet.create({
  coinIcon: {
    width: 17,
    height: 17,
    margin: 4,
  },
  buttonDescription: {
    ...typography.caption,
    color: palette.textGrey,
  },
});
