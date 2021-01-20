import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import {
  ScreenTemplate,
  Header,
  AirdropWalletBalanceCard,
  SocialShareFacebookButton,
  SocialShareTwitterButton,
} from 'app/components';
import { Route, MainCardStackNavigatorParams, CONST } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

type Props = {
  route: RouteProp<MainCardStackNavigatorParams, Route.AirdropFinishedWalletDetails>;
};

export const AirdropFinishedWalletDetails: FC<Props> = ({ route }: Props) => (
  <ScreenTemplate header={<Header isBackArrow title={i18n.airdrop.title} />}>
    <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
    <AirdropWalletBalanceCard walletDetails={{ balance: route.params.balance, name: route.params.name }} />
    <View style={styles.stayTunedContainer}>
      <Text style={styles.firstLine}>
        {i18n.formatString(i18n.airdrop.finished.stayTuned, {
          period: CONST.nextAirdropPeriod,
        })}
      </Text>
      <Text style={styles.secondLine}>{i18n.airdrop.finished.shareIt}</Text>
      <View style={styles.socialsContainer}>
        <View style={styles.facebookButtonContainer}>
          {/* TODO: fill share buttons content */}
          <SocialShareFacebookButton shareOptions={{ message: 'Waiting for Content', title: 'Waiting for content' }} />
        </View>
        <SocialShareTwitterButton shareOptions={{ message: 'Waiting for Content', title: 'Waiting for content' }} />
      </View>
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
  firstLine: {
    ...typography.headline5,
    textAlign: 'center',
  },
  secondLine: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  socialsContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 8,
  },
  facebookButtonContainer: {
    marginRight: 23,
  },
});
