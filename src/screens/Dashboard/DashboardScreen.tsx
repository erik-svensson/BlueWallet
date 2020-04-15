import React, { Component } from 'react';
import { View, Text, StyleSheet, InteractionManager, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Wallet, Route } from 'consts';
import { DashboardHeader } from './DashboardHeader';
import { WalletsCarousel } from './WalletsCarousel';
import { ListEmptyState, Image } from 'components';
import { images } from 'assets';
import { typography, palette } from 'styles';
import { en } from 'locale';

import BlueApp from '../../../BlueApp';
import EV from '../../../events';

const BlueElectrum = require('../../../BlueElectrum');

interface State {
  wallets: Array<any>;
  activeWallet: Wallet;
}

export class DashboardScreen extends Component<any, State> {
  state = {
    wallets: [],
    activeWallet: null,
    test: 0,
  };
  setActiveWallet = (index: number) => {
    this.setState({
      activeWallet: this.state.wallets[index],
    });
  };

  updateWallets(prevState) {
    const wallets = BlueApp.getWallets();
    console.warn('updateWallets!', wallets.length, prevState.wallets.length);
    if (wallets.length !== prevState.wallets.length)
      this.setState({
        wallets,
      });
  }

  componentDidMount() {
    const wallets = BlueApp.getWallets() as Array<Wallet>;
    this.setState({
      wallets: BlueApp.getWallets() as Array<Wallet>,
      activeWallet: wallets[0],
    });
  }

  componentDidUpdate(prevProps, prevState) {
    EV(EV.enum.WALLETS_COUNT_CHANGED, () => this.updateWallets(prevState));

    // InteractionManager.runAfterInteractions(async () => {
    //   let noErr = true;
    //   try {
    //     await BlueElectrum.waitTillConnected();
    //     // const balanceStart = +new Date();
    //     // await BlueApp.fetchWalletBalances();
    //     // const balanceEnd = +new Date();
    //     // console.log('fetch all wallet balances took', (balanceEnd - balanceStart) / 1000, 'sec');
    //     // const start = +new Date();
    //     // await BlueApp.fetchWalletTransactions();
    //     // const end = +new Date();
    //     // console.log('fetch all wallet txs took', (end - start) / 1000, 'sec');
    //   } catch (_) {
    //     noErr = false;
    //   }
    //   if (noErr) {
    //     const wallets = BlueApp.getWallets();
    //     if (prevState.wallets.length !== wallets.length) {
    //       this.snapToLastItem();
    //       console.warn('!');
    //       this.setState({
    //         wallets,
    //       });
    //     }
    //   }
    // });
  }

  snapToLastItem = () => {
    // console.warn('now!');
  };

  sendCoins = () => {
    this.props.navigation.navigate('SendDetails', {
      fromAddress: this.state.activeWallet.address,
      fromSecret: this.state.activeWallet.secret,
      fromWallet: this.state.activeWallet,
    });
  };

  receiveCoins = () => {
    this.props.navigation.navigate('ReceiveDetails', {
      secret: this.state.activeWallet.secret,
    });
  };

  render() {
    const { activeWallet, wallets } = this.state;

    if (activeWallet) {
      return (
        <ScrollView>
          {/* <NavigationEvents onDidFocus={this.updateWallets} /> */}
          <DashboardHeader
            balance={activeWallet.balance}
            label={activeWallet.label}
            unit={activeWallet.preferredBalanceUnit}
            onReceivePress={this.receiveCoins}
            onSendPress={this.sendCoins}
          />
          <WalletsCarousel data={wallets} onSnapItem={this.setActiveWallet} />
          {!activeWallet.transactions.length && (
            <View style={styles.noTransactionsContainer}>
              <Image source={images.noTransactions} style={styles.noTransactionsImage} />
              <Text style={styles.noTransactionsLabel}>{en.dashboard.noTransactions}</Text>
            </View>
          )}
        </ScrollView>
      );
    }
    return (
      <ListEmptyState
        variant={ListEmptyState.Variant.Dashboard}
        onPress={() => this.props.navigation.navigate(Route.AddWallet)}
      />
    );
  }
}

const styles = StyleSheet.create({
  noTransactionsContainer: {
    alignItems: 'center',
  },
  noTransactionsImage: { height: 167, width: 167, marginVertical: 30 },
  noTransactionsLabel: {
    ...typography.caption,
    color: palette.textGrey,
  },
});
