import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { ScreenTemplate, Header, AirdropWalletBalanceCard, AirdropStayTuned } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

type Props = {
  route: RouteProp<RootStackParams, Route.AirdropFinishedWalletDetails>;
};

export const AirdropFinishedWalletDetails: FC<Props> = ({ route }: Props) => (
  <ScreenTemplate header={<Header isBackArrow title={i18n.airdrop.title} />}>
    <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
    <AirdropWalletBalanceCard walletDetails={{ balance: route.params.balance, name: route.params.name }} />
    <View style={styles.stayTunedContainer}>
      <AirdropStayTuned />
    </View>
  </ScreenTemplate>
);

export default AirdropFinishedWalletDetails;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  stayTunedContainer: {
    marginTop: 36,
  },
});
