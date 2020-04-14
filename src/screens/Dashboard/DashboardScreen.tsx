import React, { Component } from 'react';
import { View } from 'react-native';

import { Wallet } from 'consts';
import { Header } from './Header';
import BlueApp from '../../../BlueApp';

interface State {
  activeWallet: Wallet;
}

const wallets = BlueApp.getWallets() as Array<Wallet>;

export class DashboardScreen extends Component<any, State> {
  state = {
    activeWallet: wallets[0],
  };

  sendCoins = () => {};

  receiveCoins = () => {};

  render() {
    const { activeWallet } = this.state;
    if (activeWallet) {
      return (
        <View>
          <Header
            balance={activeWallet.balance}
            unit={activeWallet.preferredBalanceUnit}
            onReceivePress={this.receiveCoins}
            onSendPress={this.sendCoins}
          />
        </View>
      );
    }
    return <View />;
  }
}
