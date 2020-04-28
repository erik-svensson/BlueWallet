import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProps, NavigationInjectedProps } from 'react-navigation';

import { icons, images } from 'app/assets';
import { Header, ScreenTemplate, Button, InputItem, StyledText, Image, Text } from 'app/components';
import { Transaction, Route } from 'app/consts';
import i18n from 'app/locale';
import { palette, typography } from 'app/styles';

import BlueApp from '../../BlueApp';
import BitcoinBIP70TransactionDecode from '../../bip70/bip70';
import { BitcoinTransaction } from '../../models/bitcoinTransactionInfo';
import { Chain } from '../../models/bitcoinUnits';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../models/networkTransactionFees';

const BigNumber = require('bignumber.js');
const bip21 = require('bip21');
const bitcoin = require('bitcoinjs-lib');

const ScreenFooter = () => (
  <View style={styles.footer}>
    <Button title={i18n.send.confirm.sendNow} containerStyle={styles.buttonContainer} disabled={true} />
    <StyledText title={i18n.transactions.details.transactionDetails} />
  </View>
);

export class SendCoinsConfirmScreen extends Component {
  static navigationOptions = (props: NavigationScreenProps<{ transaction: Transaction }>) => {
    return {
      header: <Header navigation={props.navigation} isBackArrow title={i18n.send.header} />,
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    const fromAddress = navigation.getParam('fromAddress');
    const fromSecret = navigation.getParam('fromSecret');
    const fromWallet = navigation.getParam('fromWallet');

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
        amount: 0,
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

  decodeBitcoinUri(uri) {
    let amount = '';
    let parsedBitcoinUri = null;
    let address = uri || '';
    let memo = '';
    try {
      parsedBitcoinUri = bip21.decode(uri);
      address = parsedBitcoinUri.hasOwnProperty('address') ? parsedBitcoinUri.address : address;
      if (parsedBitcoinUri.hasOwnProperty('options')) {
        if (parsedBitcoinUri.options.hasOwnProperty('amount')) {
          amount = parsedBitcoinUri.options.amount.toString();
          amount = parsedBitcoinUri.options.amount;
        }
        if (parsedBitcoinUri.options.hasOwnProperty('label')) {
          memo = parsedBitcoinUri.options.label || memo;
        }
      }
    } catch (_) {}
    return { address, amount, memo };
  }

  render() {
    const { navigation } = this.props;
    const amount = navigation.getParam('amount');
    const fromWallet = navigation.getParam('fromWallet');
    const address = navigation.getParam('address');
    const fee = navigation.getParam('fee');
    return (
      <ScreenTemplate footer={ScreenFooter()}>
        <View style={styles.container}>
          <View>
            <View style={styles.chooseWalletButton}>
              <Text style={typography.headline4}>
                {i18n.formatBalanceWithoutSuffix(Number(amount))} {fromWallet.preferredBalanceUnit}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.buttonDescription}>{fromWallet.label}</Text>
              <Image source={images.coin} style={styles.coinIcon} />
            </View>
          </View>
          <Text style={[styles.buttonDescription, { alignSelf: 'center' }]}>{i18n.send.details.to}</Text>
          <Text style={styles.address}>{address}</Text>
          <View style={styles.feeBoxContainer}>
            <Text style={typography.caption}>{i18n.send.details.fee}</Text>
            <View style={styles.feeBox}>
              <Text style={styles.fee}>
                {fee} {i18n.send.details.feeUnit}
              </Text>
            </View>
          </View>
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingVertical: '20%',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    width: '100%',
  },
  chooseWalletButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIcon: {
    width: 17,
    height: 17,
    margin: 4,
  },
  fee: {
    ...typography.headline9,
    color: palette.white,
  },
  feeBox: {
    backgroundColor: palette.textSecondary,
    borderRadius: 4,
    padding: 10,
  },
  feeBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDescription: {
    ...typography.caption,
    color: palette.textGrey,
  },
  address: {
    ...typography.headline9,
    textAlign: 'center',
  },
});
