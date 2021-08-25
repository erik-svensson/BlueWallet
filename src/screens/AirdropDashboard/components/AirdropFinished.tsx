import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

import { images } from 'app/assets';
import { AirdropStayTuned, AirdropWalletsList, Image } from 'app/components';
import { RootStackParams, Route, Wallet } from 'app/consts';
import { typography, palette } from 'app/styles';

import { Error } from './Error';
import { Loading } from './Loading';

const i18n = require('../../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
  error: boolean;
  loading: boolean;
  wallets: Wallet[];
}

interface CallToActionProps {
  data: { balance: number; label: string };
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

const CallToAction: FC<CallToActionProps> = ({ data, navigation }) => {
  const goToWalletDetails = (data: { balance: number; label: string }) => {
    navigation.navigate(Route.AirdropFinishedWalletDetails, { balance: data.balance, header: data.label });
  };

  return (
    <TouchableOpacity
      style={styles.arrowContainer}
      testID="forward-button"
      onPress={() => goToWalletDetails(data)}
      hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
    >
      <Image style={styles.image} source={images.forwardArrow} />
    </TouchableOpacity>
  );
};

export const AirdropFinishedContent: FC<Props> = ({ navigation, error, loading, wallets }) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <AirdropWalletsList
      wallets={wallets}
      title={i18n.airdrop.finished.registeredWallets}
      itemCallToAction={data => <CallToAction data={data} navigation={navigation} />}
    />
  );
};

export const AirdropFinished: FC<Props> = props => {
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
        <AirdropFinishedContent {...props} />
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
