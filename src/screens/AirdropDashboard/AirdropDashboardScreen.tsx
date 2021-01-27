import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { differenceBy } from 'lodash';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams, Wallet, WalletPayload } from 'app/consts';
import { isAfterAirdrop } from 'app/helpers/airdrop';
import { walletToAddressesGenerationBase } from 'app/helpers/wallets';
import { ApplicationState } from 'app/state';
import {
  checkSubscription,
  CheckSubscriptionAction,
  subscribeWallet,
  SubscribeWalletAction,
} from 'app/state/airdrop/actions';
import * as airdropSelectors from 'app/state/airdrop/selectors';

import { AirdropFinished, AirdropInProgress } from './components';

const i18n = require('../../../loc');

interface Props {
  wallets: Wallet[];
  error: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  checkSubscription: (wallets: Wallet[]) => CheckSubscriptionAction;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
  subscribedWallets: Wallet[];
  subscribeWallet: (payload: { wallet: WalletPayload; id: string }) => SubscribeWalletAction;
}

export const AirdropDashboardScreen: FC<Props> = ({
  navigation,
  isInitialized,
  wallets,
  checkSubscription,
  subscribedWallets,
  subscribeWallet,
  isLoading,
  error,
}) => {
  useEffect(() => {
    checkSubscription(wallets);
  }, [checkSubscription, wallets]);

  const getAvailableWallets = (wallets: Wallet[]) => differenceBy(wallets, subscribedWallets, 'id');

  const renderContent = () => {
    return isAfterAirdrop() ? (
      <AirdropFinished navigation={navigation} />
    ) : (
      <AirdropInProgress
        navigation={navigation}
        availableWallets={getAvailableWallets(wallets)}
        subscribedWallets={subscribedWallets}
        subscribeWallet={async (wallet: Wallet) => {
          subscribeWallet({ wallet: await walletToAddressesGenerationBase(wallet), id: wallet.id });
        }}
      />
    );
  };

  return !isInitialized ? (
    <View style={styles.loadingIndicatorContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScreenTemplate header={<Header isBackArrow title={i18n.airdrop.title} />}>
      <View style={styles.wrapper}>{renderContent()}</View>
    </ScreenTemplate>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: airdropSelectors.airdropReadyWallets(state),
  subscribedWallets: airdropSelectors.subscribedWallets(state),
  isLoading: airdropSelectors.isLoading(state),
  isInitialized: state.wallets.isInitialized,
  error: state.airdrop.error,
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
