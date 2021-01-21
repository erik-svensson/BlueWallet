import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

import {
  ScreenTemplate,
  Header,
  AirdropWalletBalanceCard,
  SocialShareFacebookButton,
  SocialShareTwitterButton,
  AirdropStayTuned,
} from 'app/components';
import { Route, RootStackParams, CONST } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

type Props = {
  route: RouteProp<RootStackParams, Route.AirdropFinishedWalletDetails>;
};

export const AirdropFinished: FC<Props> = ({ route }: Props) => (
  <View>
    <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{i18n.airdrop.finished.checkOutData}</Text>
      <View>
        <Text style={styles.description}>{i18n.airdrop.finished.readFullReport} </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('www.medium.com');
          }}
        >
          <Text style={styles.link}>{i18n.airdrop.finished.medium}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <AirdropStayTuned />
  </View>
);

export default AirdropFinished;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  link: {
    ...typography.headline5,
    color: palette.textSecondary,
    top: 2.5,
    position: 'relative',
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
