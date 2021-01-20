import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Image, Countdown, AirdropWalletsList, ProgressButton } from 'app/components';
import { CONST, MainCardStackNavigatorParams, Route, RootStackParams, AirdropWalletDetails } from 'app/consts';
import { getFormattedAirdropDate } from 'app/helpers/airdrop';
import { typography, palette } from 'app/styles';

import { Footer } from './components';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.AirdropDashboard>
  >;
}

export const AirdropDashboardScreen: FC<Props> = ({ navigation }) => (
  <ScreenTemplate
    footer={<Footer navigation={navigation} />}
    header={<Header isBackArrow title={i18n.airdrop.title} />}
  >
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
        <Text style={[styles.description, styles.spaceTop]}>{i18n.airdrop.dashboard.desc1}</Text>
        <Text style={styles.description}>
          {i18n.airdrop.dateOfAirdrop}&nbsp;
          {getFormattedAirdropDate()}
        </Text>
      </View>
      <Countdown dataEnd={CONST.airdropDate} />
      {/* <Image source={images.airdrop} style={styles.airdropImage} /> */}
      <AirdropWalletsList
        wallets={[
          { balance: 2, name: 'Wallet name A', address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
          { balance: 13, name: 'Wallet name B', address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
        ]}
        title="Available wallets"
        itemCallToAction={(wallet: AirdropWalletDetails) => (
          <ProgressButton
            timeoutMilis={2000}
            stepIntervalMilis={100}
            onComplete={() => {
              console.log(wallet);
            }}
            title="Add"
            inProgressTitle="Undo"
          />
        )}
      />
      <Text style={styles.description}>{i18n.airdrop.dashboard.desc2}</Text>
    </View>
  </ScreenTemplate>
);

export default AirdropDashboardScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  airdropImage: {
    width: 189,
    height: 193,
    marginTop: 27.5,
    marginBottom: 20,
  },
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
