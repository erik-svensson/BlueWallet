import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

import { images } from 'app/assets';
import { AirdropStayTuned, AirdropWalletsList, Image } from 'app/components';
import { RootStackParams, Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

interface CallToActionProps {
  wallet: { balance: number; label: string };
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

const CallToAction: FC<CallToActionProps> = ({ wallet, navigation }) => {
  const goToWalletDetails = (wallet: { balance: number; label: string }) => {
    navigation.navigate(Route.AirdropFinishedWalletDetails, { balance: wallet.balance, label: wallet.label });
  };

  return (
    <TouchableOpacity style={styles.arrowContainer} testID="forward-button" onPress={() => goToWalletDetails(wallet)}>
      <Image style={styles.image} source={images.forwardArrow} />
    </TouchableOpacity>
  );
};

export const AirdropFinished: FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{i18n.airdrop.finished.checkOutData}</Text>
        <View style={styles.inline}>
          <Text style={styles.description}>{i18n.airdrop.finished.readFullReport} </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('www.medium.com'); // TODO: replace with proper URL
            }}
          >
            <Text style={styles.link}>{i18n.airdrop.finished.medium}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AirdropStayTuned />
      <View style={styles.walletsListContainer}>
        <AirdropWalletsList
          wallets={
            [
              // TODO: connect it and put subscribedWallets here
              // { balance: 2, label: 'Wallet name A', address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
              // { balance: 13, label: 'Wallet name B', address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
            ]
          }
          title={i18n.airdrop.finished.registeredWallets}
          itemCallToAction={wallet => <CallToAction wallet={wallet} navigation={navigation} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  arrowContainer: {
    height: 12,
    width: 7,
  },
  image: {
    width: 7,
    height: 12,
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
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
  walletsListContainer: {
    marginTop: 36,
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
});
