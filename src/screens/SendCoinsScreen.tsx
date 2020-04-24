import bip21 from 'bip21';
import React, { Component } from 'react';
import { View, StyleSheet, Text, InteractionManager } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { NavigationScreenProps, NavigationInjectedProps } from 'react-navigation';

import { Header, ScreenTemplate, Button } from 'app/components';
import { Transaction, Route } from 'app/consts';
import i18n from 'app/locale';
import { typography, palette } from 'app/styles';

import BlueApp from '../../BlueApp';
import { Chain } from '../../models/bitcoinUnits';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../models/networkTransactionFees';
import { DashboardHeader } from './Dashboard/DashboardHeader';

type Props = NavigationInjectedProps<{ secret: string }>;

interface State {
  secret: string;
  addressText: string;
  bip21encoded: any;
  amount: number;
  address: string;
  wallet: any;
}
export class SendCoinsScreen extends Component<Props, State> {
  static navigationOptions = (props: NavigationScreenProps<{ transaction: Transaction }>) => {
    return {
      header: <Header navigation={props.navigation} isBackArrow title={i18n.send.header} />,
    };
  };

  constructor(props) {
    super(props);

    let fromAddress;
    if (props.navigation.state.params) fromAddress = props.navigation.state.params.fromAddress;
    let fromSecret;
    if (props.navigation.state.params) fromSecret = props.navigation.state.params.fromSecret;
    let fromWallet = null;
    if (props.navigation.state.params) fromWallet = props.navigation.state.params.fromWallet;

    const wallets = BlueApp.getWallets();

    if (wallets.length === 0) {
      alert('Before creating a transaction, you must first add a Bitcoin wallet.');
      return props.navigation.goBack(null);
    } else {
      if (!fromWallet && wallets.length > 0) {
        fromWallet = wallets[0];
        fromAddress = fromWallet.getAddress();
        fromSecret = fromWallet.getSecret();
      }
      this.state = {
        isLoading: false,
        wallets,
        showSendMax: false,
        isFeeSelectionModalVisible: false,
        isAdvancedTransactionOptionsVisible: false,
        recipientsScrollIndex: 0,
        fromAddress,
        fromWallet,
        fromSecret,
        addresses: [],
        memo: '',
        networkTransactionFees: new NetworkTransactionFee(1, 1, 1),
        fee: 1,
        feeSliderValue: 1,
        bip70TransactionExpiration: null,
        renderWalletSelectionButtonHidden: false,
      };
    }
  }

  // updateWallets = () => {
  //   const wallets = BlueApp.getWallets();
  //   const activeWallet = this.props.navigation.getParam('fromWallet');

  //   this.setState({
  //     wallets,
  //     activeWallet,
  //   });
  // };

  async componentDidMount() {
    console.log('send/details - componentDidMount');

    const addresses = [];
    let initialMemo = '';
    if (this.props.navigation.state.params.uri) {
      const uri = this.props.navigation.state.params.uri;
      if (BitcoinBIP70TransactionDecode.matchesPaymentURL(uri)) {
        const { recipient, memo, fee, feeSliderValue } = await this.processBIP70Invoice(uri);
        addresses.push(recipient);
        initialMemo = memo;
        this.setState({
          addresses,
          memo: initialMemo,
          fee,
          feeSliderValue,
          isLoading: false,
        });
      } else {
        try {
          const { address, amount, memo } = this.decodeBitcoinUri(uri);
          addresses.push(new BitcoinTransaction(address, amount));
          initialMemo = memo;
          this.setState({ addresses, memo: initialMemo, isLoading: false });
        } catch (error) {
          console.log(error);
          alert('Error: Unable to decode Bitcoin address');
        }
      }
    } else if (this.props.navigation.state.params.address) {
      addresses.push(new BitcoinTransaction(this.props.navigation.state.params.address));
      if (this.props.navigation.state.params.memo) initialMemo = this.props.navigation.state.params.memo;
      this.setState({ addresses, memo: initialMemo, isLoading: false });
    } else {
      this.setState({
        addresses: [new BitcoinTransaction()],
        isLoading: false,
      });
    }

    try {
      const cachedNetworkTransactionFees = JSON.parse(await AsyncStorage.getItem(NetworkTransactionFee.StorageKey));

      if (cachedNetworkTransactionFees && cachedNetworkTransactionFees.hasOwnProperty('halfHourFee')) {
        this.setState({
          fee: cachedNetworkTransactionFees.fastestFee,
          networkTransactionFees: cachedNetworkTransactionFees,
          feeSliderValue: cachedNetworkTransactionFees.fastestFee,
        });
      }
    } catch (_) {}

    try {
      const recommendedFees = await NetworkTransactionFees.recommendedFees();
      if (recommendedFees && recommendedFees.hasOwnProperty('fastestFee')) {
        await AsyncStorage.setItem(NetworkTransactionFee.StorageKey, JSON.stringify(recommendedFees));
        this.setState({
          fee: recommendedFees.fastestFee,
          networkTransactionFees: recommendedFees,
          feeSliderValue: recommendedFees.fastestFee,
        });

        if (this.props.navigation.state.params.uri) {
          if (BitcoinBIP70TransactionDecode.matchesPaymentURL(this.props.navigation.state.params.uri)) {
            this.processBIP70Invoice(this.props.navigation.state.params.uri);
          } else {
            try {
              const { address, amount, memo } = this.decodeBitcoinUri(this.props.navigation.getParam('uri'));
              this.setState({ address, amount, memo, isLoading: false });
            } catch (error) {
              console.log(error);
              this.setState({ isLoading: false });
              alert('Error: Unable to decode Bitcoin address');
            }
          }
        }
      } else {
        this.setState({ isLoading: false });
      }
    } catch (_e) {}
  }

  updateAmount = (amount: number) => {
    const bip21encoded = bip21.encode(this.state.address, {
      amount,
    });
    this.setState({
      amount,
      bip21encoded,
    });
  };

  editAmount = () => {
    this.props.navigation.navigate(Route.EditText, {
      title: i18n.receive.header,
      label: i18n.receive.details.amount,
      onSave: this.updateAmount,
      value: this.state.amount,
    });
  };

  createTransaction() {
    // to copy
  }

  chooseItemFromModal = async (index: number) => {
    const wallets = BlueApp.getWallets();

    const fromWallet = wallets[index];
    this.setState({ fromWallet, wallets });
  };

  showModal = () => {
    const { wallets, fromWallet } = this.state;
    const selectedIndex = wallets.findIndex(wallet => wallet.label === fromWallet.label);
    this.props.navigation.navigate(Route.ActionSheet, {
      wallets,
      selectedIndex,
      onPress: this.chooseItemFromModal,
    });
  };

  render() {
    const { fromWallet } = this.state;
    return (
      <ScreenTemplate
        footer={
          <Button
            title={i18n.receive.details.share}
            onPress={this.createTransaction}
            containerStyle={styles.buttonContainer}
          />
        }
      >
        <DashboardHeader
          onSelectPress={this.showModal}
          balance={fromWallet.balance}
          label={fromWallet.label}
          unit={fromWallet.preferredBalanceUnit}
        />
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  qrcontainer: {
    alignSelf: 'center',
    width: 140,
    height: 140,
  },
  address: { ...typography.headline9, alignSelf: 'center', marginVertical: 30 },
  inputTitle: { ...typography.headline4, alignSelf: 'center', marginVertical: 20 },
  amountInput: { width: '100%', borderBottomColor: palette.grey, borderBottomWidth: 1, paddingBottom: 10 },
  amount: { ...typography.caption, color: palette.textGrey },
  buttonContainer: {
    marginBottom: 20,
  },
});
