import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { map, compose, flatten, reduce } from 'lodash/fp';
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';

import { images, icons } from 'app/assets';
import { Header, ScreenTemplate, Button, InputItem, StyledText, Image, RadioGroup, RadioButton } from 'app/components';
import {
  CONST,
  MainCardStackNavigatorParams,
  Route,
  RootStackParams,
  TransactionInput,
  Utxo,
  Wallet,
} from 'app/consts';
import { typography, palette } from 'app/styles';

import BlueApp from '../../../BlueApp';
import { HDSegwitBech32Wallet, HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet, WatchOnlyWallet } from '../../../class';
import config from '../../../config';
import { BitcoinTransaction } from '../../../models/bitcoinTransactionInfo';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../../models/networkTransactionFees';
import { btcToSatoshi, satoshiToBtc } from '../../../utils/bitcoin';
import { DashboarContentdHeader } from '../Dashboard/DashboarContentdHeader';

const BigNumber = require('bignumber.js');
const bitcoin = require('bitcoinjs-lib');

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.RecoverySend>
  >;

  route: RouteProp<MainCardStackNavigatorParams, Route.RecoverySend>;
}

interface State {
  isLoading: boolean;
  memo: string;
  fee: number;
  address: string;
}

export class RecoverySendScreen extends Component<Props, State> {
  state = {
    isLoading: false,
    address: '',
    memo: '',
    fee: 1,
  };

  async componentDidMount() {
    const { route } = this.props;

    await this.loadTransactionsFees();
    const { wallet, transactions } = route.params;
    const utxos = this.getUtxos();
    console.log('utxos', utxos);
    const amount = this.getTransactionsAmount();
    console.log('amount', amount);

    console.log('transactions', transactions);
  }

  loadTransactionsFees = async () => {
    try {
      const recommendedFees = await NetworkTransactionFees.recommendedFees();
      if (recommendedFees && recommendedFees.hasOwnProperty('fastestFee')) {
        await AsyncStorage.setItem(NetworkTransactionFee.StorageKey, JSON.stringify(recommendedFees));
        this.setState({
          fee: Number(recommendedFees.fastestFee),
        });
        return;
      }
    } catch (_) {}
    try {
      const cachedNetworkTransactionFees = JSON.parse(
        (await AsyncStorage.getItem(NetworkTransactionFee.StorageKey)) as string,
      );

      if (cachedNetworkTransactionFees && cachedNetworkTransactionFees.hasOwnProperty('halfHourFee')) {
        this.setState({
          fee: Number(cachedNetworkTransactionFees.fastestFee),
        });
      }
    } catch (_) {}
  };

  renderSetTransactionFeeHeader = () => (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.setTransactionHeaderTitle}>{i18n.send.create.setTransactionFee}</Text>
      <Text style={styles.setTransactionHeaderDescription}>{i18n.send.create.headerText}</Text>
    </View>
  );

  validateTransaction = (): string | null => {
    const { fee: requestedSatPerByte, address } = this.state;

    if (!requestedSatPerByte || requestedSatPerByte < 1) {
      return i18n.send.details.fee_field_is_not_valid;
    }
    if (!address) {
      return i18n.send.details.address_field_is_not_valid;
    }
    if (address) {
      const addr = address.trim().toLowerCase();
      if (addr.startsWith('lnb') || addr.startsWith('lightning:lnb')) {
        return i18n.send.transaction.lightningError;
      }
    }

    try {
      bitcoin.address.toOutputScript(address, config.network);
    } catch (_) {
      return i18n.send.details.address_field_is_not_valid;
    }

    return null;
  };

  getActualSatoshi = (tx: string, feeSatoshi: any) => feeSatoshi.dividedBy(Math.round(tx.length / 2)).toNumber();

  increaseFee = ({
    feeSatoshi,
    requestedSatPerByte,
    actualSatoshiPerByte,
  }: {
    feeSatoshi: any;
    requestedSatPerByte: number;
    actualSatoshiPerByte: any;
  }) =>
    feeSatoshi
      .multipliedBy(requestedSatPerByte / actualSatoshiPerByte)
      .plus(10)
      .dividedBy(CONST.satoshiInBtc)
      .toNumber();

  isFeeEnough = ({
    actualSatoshiPerByte,
    requestedSatPerByte,
  }: {
    actualSatoshiPerByte: number;
    requestedSatPerByte: number;
  }) => !(Math.round(actualSatoshiPerByte) !== requestedSatPerByte || Math.floor(actualSatoshiPerByte) < 1);

  getTransactionsAmount = () => {
    const { transactions } = this.props.route.params;
    return transactions.reduce(
      (amount, transaction) => amount + transaction.inputs.reduce((inputsSum, input) => inputsSum + input.value, 0),
      0,
    );
  };

  getUtxos = () => {
    const { transactions } = this.props.route.params;

    return compose(
      map((i: TransactionInput) => ({ address: i.addresses[0], txid: i.txid, vout: i.vout, value: i.value })),
      flatten,
      map(({ inputs }) => inputs),
    )(transactions);
  };

  createRecoveryTransaction = async (keyPairs: any) => {
    await this.loadTransactionsFees();
    const { wallet } = this.props.route.params;
    const { fee: requestedSatPerByte, memo, address } = this.state;

    let fee = 0.000001; // initial fee guess
    let actualSatoshiPerByte: any;
    let tx = '';
    const MAX_TRIES = 5;

    const utxos = this.getUtxos();
    console.log('utxos', utxos);
    const amount = this.getTransactionsAmount();
    console.log('amount', amount);

    for (let tries = 0; tries < MAX_TRIES; tries++) {
      tx = await wallet.createTx({
        utxos,
        amount,
        fee,
        address,
        keyPairs,
        vaultTxType: bitcoin.payments.VaultTxType.Recovery,
      });

      const feeSatoshi = btcToSatoshi(fee);

      actualSatoshiPerByte = this.getActualSatoshi(tx, feeSatoshi);

      if (this.isFeeEnough({ requestedSatPerByte, actualSatoshiPerByte })) {
        break;
      }

      fee = this.increaseFee({ feeSatoshi, requestedSatPerByte, actualSatoshiPerByte });
    }

    const txDecoded = bitcoin.Transaction.fromHex(tx);
    const txid = txDecoded.getId();

    BlueApp.tx_metadata = BlueApp.tx_metadata || {};
    BlueApp.tx_metadata[txid] = {
      txhex: tx,
      memo,
    };
    await BlueApp.saveToDisk();
    // this.setState({ isLoading: false }, () => this.navigateToConfirm({ fee, tx, actualSatoshiPerByte }));
  };

  confirmTransaction = async () => {
    // this.setState({ isLoading: true });
    // const { wallet } = this.props.route.params;
    // const error = this.validateTransaction();
    // if (error) {
    //   this.setState({ isLoading: false });
    //   Alert.alert(error);
    //   return;
    // }
    // try {
    //   await this.createRecoveryTransaction();
    // } catch (err) {
    //   Alert.alert(err.message);
    //   this.setState({ isLoading: false });
    // }
  };

  renderFeeInput = () => {
    const { fee } = this.state;
    return (
      <InputItem
        label={i18n.transactions.details.transactioFee}
        suffix="Sat/B"
        keyboardType="numeric"
        value={fee.toString()}
        setValue={text => {
          const newFee = Number(text.replace(',', ''));
          this.setState({ fee: newFee });
        }}
      />
    );
  };

  setAddress = (address: string) => this.setState({ address });

  renderAddressInput = () => {
    const { address } = this.state;
    return (
      <InputItem
        multiline
        label={i18n.contactDetails.addressLabel}
        style={styles.addressInput}
        value={address}
        setValue={text => this.setAddress(text.trim())}
      />
    );
  };

  setCurrentWalletAddress = () => {
    const { wallet } = this.props.route.params;
    this.setState({ address: wallet.getAddressForTransaction() });
  };

  render() {
    const { wallet } = this.props.route.params;

    return (
      <ScreenTemplate
        footer={
          <Button
            title={i18n.send.details.next}
            onPress={this.confirmTransaction}
            containerStyle={styles.buttonContainer}
          />
        }
        header={<Header navigation={this.props.navigation} isBackArrow title={i18n.send.recovery.recover} />}
      >
        <DashboarContentdHeader balance={wallet.balance} label={wallet.label} unit={wallet.preferredBalanceUnit} />
        <View style={styles.inputsContainer}>
          {this.renderFeeInput()}

          <View style={styles.addressContainer}>
            {this.renderAddressInput()}
            <TouchableOpacity
              style={styles.addressBookIcon}
              onPress={() =>
                this.props.navigation.navigate(Route.ChooseContactList, {
                  onContactPress: this.setAddress,
                })
              }
            >
              <Image style={styles.icon} source={images.addressBook} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.qrCodeIcon}
              onPress={() =>
                this.props.navigation.navigate(Route.ScanQrCode, {
                  onBarCodeScan: this.setAddress,
                })
              }
            >
              <Image style={styles.icon} source={icons.qrCode} />
            </TouchableOpacity>
          </View>
          <View style={styles.useOwnAddressContainer}>
            <TouchableOpacity onPress={this.setCurrentWalletAddress}>
              <Text style={styles.useOwnAddressText}>{i18n.send.recovery.useWalletAddress}</Text>
            </TouchableOpacity>
          </View>

          <InputItem label={i18n.send.details.note} setValue={memo => this.setState({ memo })} />
        </View>
      </ScreenTemplate>
    );
  }
}

export default RecoverySendScreen;

const styles = StyleSheet.create({
  useOwnAddressContainer: {
    marginTop: -5,
    marginBottom: 24,
    display: 'flex',
    alignItems: 'flex-end',
  },
  useOwnAddressText: {
    color: palette.textSecondary,
    ...typography.headline6,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  setTransactionHeaderTitle: {
    ...typography.headline4,
  },
  setTransactionHeaderDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputsContainer: {},
  fee: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  addressContainer: {
    // marginTop: 24,
  },
  qrCodeIcon: { position: 'absolute', right: 0, bottom: 25 },
  addressBookIcon: { position: 'absolute', right: 40, bottom: 25 },
  icon: {
    width: 24,
    height: 24,
    padding: 8,
  },
  addressInput: {
    paddingEnd: 100,
  },
  radioButton: {
    paddingStart: 0,
    paddingVertical: 8,
  },
  radioButtonContent: {
    paddingStart: 10,
    top: -3,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
  },
  radioButtonsTitle: {
    ...typography.overline,
    color: palette.textGrey,
    marginBottom: 16,
  },
});
