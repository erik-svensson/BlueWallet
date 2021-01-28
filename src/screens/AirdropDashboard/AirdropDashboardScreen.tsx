import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams, Wallet } from 'app/consts';
import { isAfterAirdrop } from 'app/helpers/airdrop';
import { walletToAddressesGenerationBase } from 'app/helpers/wallets';
import { ApplicationState } from 'app/state';
import {
  checkSubscription,
  CheckSubscriptionActionCreator,
  subscribeWallet,
  SubscribeWalletActionCreator,
} from 'app/state/airdrop/actions';
import * as airdropSelectors from 'app/state/airdrop/selectors';

import { AirdropFinished, AirdropInProgress, Footer } from './components';

const i18n = require('../../../loc');

interface Props {
  wallets: Wallet[];
  error: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  checkSubscription: CheckSubscriptionActionCreator;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
  subscribedWallets: Wallet[];
  availableWallets: Wallet[];
  subscribeWallet: SubscribeWalletActionCreator;
}

export const AirdropDashboardScreen: FC<Props> = ({
  navigation,
  isInitialized,
  wallets,
  checkSubscription,
  subscribedWallets,
  subscribeWallet,
  availableWallets,
  isLoading,
  error,
}) => {
  useEffect(() => {
    checkSubscription(wallets);
  }, [checkSubscription, wallets]);
  const airdropFinished = isAfterAirdrop();

  return !isInitialized ? (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScreenTemplate
      header={<Header isBackArrow title={i18n.airdrop.title} />}
      footer={!airdropFinished && <Footer navigation={navigation} />}
    >
      <View style={styles.wrapper}>
        {airdropFinished ? (
          <AirdropFinished wallets={subscribedWallets} loading={isLoading} error={error} navigation={navigation} />
        ) : (
          <AirdropInProgress
            loading={isLoading}
            error={error}
            availableWallets={availableWallets}
            subscribedWallets={subscribedWallets}
            subscribeWallet={async (wallet: Wallet) => {
              subscribeWallet({ wallet: await walletToAddressesGenerationBase(wallet), id: wallet.id });
            }}
          />
        )}
      </View>
    </ScreenTemplate>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: airdropSelectors.airdropReadyWallets(state),
  availableWallets: airdropSelectors.availableWallets(state),
  subscribedWallets: airdropSelectors.subscribedWallets(state),
  isLoading: airdropSelectors.isLoading(state),
  error: airdropSelectors.error(state),
  isInitialized: state.wallets.isInitialized,
});

const mapDispatchToProps = {
  checkSubscription,
  subscribeWallet,
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
});
