import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Image, Countdown } from 'app/components';
import { CONST, Route, RootStackParams, Wallet } from 'app/consts';
import { isAfterAirdrop, getFormattedAirdropDate } from 'app/helpers/airdrop';
import { ApplicationState } from 'app/state';
import { loadWallets, LoadWalletsAction } from 'app/state/wallets/actions';
import * as walletsSelectors from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

import { Footer, AirdropFinished } from './components';

const i18n = require('../../../loc');

interface Props {
  wallets: Wallet[];
  isInitialized: boolean;
  loadWallets: () => LoadWalletsAction;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

const error = false; // should come from API/Redux

export const AirdropDashboardScreen: FC<Props> = ({ navigation, isInitialized, wallets, loadWallets }) => {
  const _isAfterAirdrop = isAfterAirdrop();

  useEffect(() => {
    loadWallets();
  }, []);

  console.log('AirdropDashboardScreen wallets');
  console.log(wallets);

  return !isInitialized ? (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScreenTemplate
      footer={!_isAfterAirdrop && <Footer navigation={navigation} />}
      header={<Header isBackArrow title={i18n.airdrop.title} />}
    >
      <View style={styles.wrapper}>
        {_isAfterAirdrop ? (
          <AirdropFinished navigation={navigation} />
        ) : (
          <>
            <View style={styles.infoContainer}>
              <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
              <Text style={[styles.description, styles.spaceTop]}>{i18n.airdrop.dashboard.desc1}</Text>
              <Text style={styles.description}>
                {i18n.airdrop.dateOfAirdrop}&nbsp;
                {getFormattedAirdropDate()}
              </Text>
            </View>
            {/* TODO: if airdrop in progress, show wallets etc. */}
            <Countdown dataEnd={CONST.airdropDate} />
            <Image source={images.airdrop} style={styles.airdropImage} />
            {error ? (
              <>
                <Text style={styles.boldDescription}>{i18n.airdrop.dashboard.connectionError1}</Text>
                <Text style={styles.description}>{i18n.airdrop.dashboard.connectionError2}</Text>
              </>
            ) : (
              <Text style={styles.description}>{i18n.airdrop.dashboard.desc2}</Text>
            )}
          </>
        )}
      </View>
    </ScreenTemplate>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: walletsSelectors.allWallets(state),
  isLoading: walletsSelectors.isLoading(state),
  isInitialized: state.wallets.isInitialized,
});

const mapDispatchToProps = {
  loadWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(AirdropDashboardScreen);

const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  boldDescription: {
    ...typography.headline9,
    textAlign: 'center',
  },
  spaceTop: {
    marginTop: 18,
  },
});
