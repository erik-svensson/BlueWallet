import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Countdown } from 'app/components';
import { CONST, Wallet } from 'app/consts';
import { selectors } from 'app/state/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

import { AirdropInProgressContent } from './';

const i18n = require('../../../../loc');

interface Props {
  availableWallets: Wallet[];
  subscribedWallets: Wallet[];
  subscribeWallet: SubscribeWalletActionCreator;
  error: boolean;
  loading: boolean;
  usersQuantity: number;
}

export const AirdropInProgress: FC<Props> = props => {
  const airdropDate = useSelector(selectors.airdropDate);
  const getFormattedAirdropDate = useSelector(selectors.getFormattedAirdropDate);

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
        <Text style={[styles.description, styles.spaceTop]}>
          {props.subscribedWallets?.length > 0 ? i18n.airdrop.dashboard.desc1WithWallets : i18n.airdrop.dashboard.desc1}
        </Text>
        <Text style={styles.description}>
          {i18n.airdrop.dateOfAirdrop}&nbsp;
          {getFormattedAirdropDate}
        </Text>
      </View>
      <Countdown dataEnd={airdropDate} />
      <AirdropInProgressContent {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  spaceTop: {
    marginTop: 18,
  },
});
