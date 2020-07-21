import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { NavigationScreenProps, NavigationInjectedProps } from 'react-navigation';

import { images, icons } from 'app/assets';
import { Header, ScreenTemplate, Button, InputItem, StyledText, Image } from 'app/components';
import { Transaction, Route } from 'app/consts';
import { processAddressData } from 'app/helpers/DataProcessing';
import { typography, palette } from 'app/styles';

import BlueApp from '../../BlueApp';
import BitcoinBIP70TransactionDecode from '../../bip70/bip70';
import { HDSegwitBech32Wallet, HDSegwitP2SHArWallet, WatchOnlyWallet } from '../../class';
import config from '../../config';
import { BitcoinTransaction } from '../../models/bitcoinTransactionInfo';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../models/networkTransactionFees';
import { DashboarContentdHeader } from './Dashboard/DashboarContentdHeader';

const BigNumber = require('bignumber.js');
const bitcoin = require('bitcoinjs-lib');

const i18n = require('../../loc');

type Props = NavigationInjectedProps<{ fromSecret: string; fromAddress: string; fromWallet: any; toAddress?: string }>;

interface State {
  isLoading: boolean;
  amount: number;
  wallets: any;
  showSendMax: boolean;
  isFeeSelectionModalVisible: boolean;
  isAdvancedTransactionOptionsVisible: boolean;
  recipientsScrollIndex: number;
  fromWallet: any;
  transaction: {
    amount: number;
    address: string;
  };
  memo: string;
  networkTransactionFees: any;
  fee: number;
  feeSliderValue: number;
  bip70TransactionExpiration: null;
  renderWalletSelectionButtonHidden: boolean;
}

const SATOSHI_IN_BTC = 100000000;

export class SendCoinsScreen extends Component<Props, State> {
  static navigationOptions = (props: NavigationScreenProps<{ transaction: Transaction }>) => {
    return {
      header: <Header navigation={props.navigation} isBackArrow title={i18n.send.header} />,
    };
  };

  constructor(props: Props) {
    super(props);

    const { navigation } = props;
    let fromWallet = navigation.getParam('fromWallet');
    const wallets = BlueApp.getWallets();
    const toAddress = navigation.getParam('toAddress');

    if (!fromWallet && wallets.length > 0) {
      fromWallet = wallets[0];
    }
    this.state = {
      isLoading: false,
      amount: 0,
      wallets,
      showSendMax: false,
      isFeeSelectionModalVisible: false,
      isAdvancedTransactionOptionsVisible: false,
      recipientsScrollIndex: 0,
      fromWallet,
      transaction: toAddress ? { address: toAddress, amount: undefined } : new BitcoinTransaction(),
      memo: '',
      networkTransactionFees: new NetworkTransactionFee(1, 1, 1),
      fee: 1,
      feeSliderValue: 1,
      bip70TransactionExpiration: null,
      renderWalletSelectionButtonHidden: false,
    };
  }

  async componentDidMount() {
    await this.loadTransactionsFees();
  }

  loadTransactionsFees = async () => {
    try {
      const recommendedFees = await NetworkTransactionFees.recommendedFees();
      if (recommendedFees && recommendedFees.hasOwnProperty('fastestFee')) {
        await AsyncStorage.setItem(NetworkTransactionFee.StorageKey, JSON.stringify(recommendedFees));
        this.setState({
          fee: recommendedFees.fastestFee,
          networkTransactionFees: recommendedFees,
          feeSliderValue: recommendedFees.fastestFee,
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
          fee: cachedNetworkTransactionFees.fastestFee,
          networkTransactionFees: cachedNetworkTransactionFees,
          feeSliderValue: cachedNetworkTransactionFees.fastestFee,
        });
      }
    } catch (_) {}
  };

  chooseItemFromModal = (index: number) => {
    const wallets = BlueApp.getWallets();

    const wallet = wallets[index];
    this.setState({
      fromWallet: wallet,
    });
  };

  showModal = () => {
    const { wallets, fromWallet } = this.state;
    const selectedIndex = wallets.findIndex((wallet: any) => wallet.label === fromWallet.label);
    this.props.navigation.navigate(Route.ActionSheet, {
      wallets,
      selectedIndex,
      onPress: this.chooseItemFromModal,
    });
  };

  saveTransactionFee = (fee: number) => {
    this.setState({ fee });
  };

  renderSetTransactionFeeHeader = () => (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.setTransactionHeaderTitle}>{i18n.send.create.setTransactionFee}</Text>
      <Text style={styles.setTransactionHeaderDescription}>{i18n.send.create.headerText}</Text>
    </View>
  );

  setTransactionFee = () => {
    this.props.navigation.navigate(Route.EditText, {
      title: i18n.send.create.fee,
      label: i18n.send.create.amount,
      onSave: this.saveTransactionFee,
      value: this.state.amount,
      header: this.renderSetTransactionFeeHeader(),
    });
  };

  createHDBech32Transaction = async () => {
    /** @type {HDSegwitBech32Wallet} */
    const { transaction } = this.state;
    const wallet = this.state.fromWallet;
    await wallet.fetchUtxos();
    const changeAddress = await wallet.getAddressForTransaction();
    const requestedSatPerByte: string | number = +this.state.fee.toString().replace(/\D/g, '');

    const targets: any[] = [];
    const amount = this.satoshiToNumber(transaction.amount).toNumber();
    if (amount > 0.0) {
      targets.push({ address: transaction.address, value: amount });
    }

    const { tx, fee, psbt } = await wallet.createTransaction(
      wallet.getUtxos(),
      targets,
      requestedSatPerByte,
      changeAddress,
    );

    if (wallet.type === WatchOnlyWallet.type) {
      // watch-only wallets with enabled HW wallet support have different flow. we have to show PSBT to user as QR code
      // so he can scan it and sign it. then we have to scan it back from user (via camera and QR code), and ask
      // user whether he wants to broadcast it

      this.setState({ isLoading: false }, () =>
        this.props.navigation.navigate('PsbtWithHardwareWallet', {
          memo: this.state.memo,
          fromWallet: wallet,
          psbt,
        }),
      );
      return;
    }

    BlueApp.tx_metadata = BlueApp.tx_metadata || {};
    BlueApp.tx_metadata[tx.getId()] = {
      txhex: tx.toHex(),
      memo: this.state.memo,
    };
    await BlueApp.saveToDisk();
    this.setState({ isLoading: false }, () =>
      this.props.navigation.navigate(Route.SendCoinsConfirm, {
        fee: this.numberToSatoshi(fee).toNumber(),
        memo: this.state.memo,
        fromWallet: wallet,
        tx: tx.toHex(),
        recipients: targets,
        satoshiPerByte: requestedSatPerByte,
      }),
    );
  };

  recalculateAvailableBalance(balance: number, amount: number, fee: number) {
    if (!amount) amount = 0;
    if (!fee) fee = 0;
    let availableBalance;
    try {
      availableBalance = new BigNumber(balance);
      availableBalance = availableBalance.div(SATOSHI_IN_BTC); // sat2btc
      availableBalance = availableBalance.minus(amount);
      availableBalance = availableBalance.minus(fee);
      availableBalance = availableBalance.toString(10);
    } catch (err) {
      return balance;
    }

    return (availableBalance === 'NaN' && balance) || availableBalance;
  }

  validateTransaction = (): string | null => {
    const { fee: requestedSatPerByte, transaction } = this.state;

    if (!transaction.amount || transaction.amount < 0 || transaction.amount === 0) {
      return i18n.send.details.amount_field_is_not_valid;
    }
    if (!requestedSatPerByte || requestedSatPerByte < 1) {
      return i18n.send.details.fee_field_is_not_valid;
    }
    if (!transaction.address) {
      return i18n.send.details.address_field_is_not_valid;
    }
    if (this.recalculateAvailableBalance(this.state.fromWallet.getBalance(), transaction.amount, 0) < 0) {
      // first sanity check is that sending amount is not bigger than available balance
      return i18n.send.details.total_exceeds_balance;
    }
    if (BitcoinBIP70TransactionDecode.isExpired(this.state.bip70TransactionExpiration)) {
      return 'Transaction has expired.';
    }
    if (transaction.address) {
      const address = transaction.address.trim().toLowerCase();
      if (address.startsWith('lnb') || address.startsWith('lightning:lnb')) {
        return 'This address appears to be for a Lightning invoice. Please, go to your Lightning wallet in order to make a payment for this invoice.';
      }
    }

    try {
      bitcoin.address.toOutputScript(transaction.address, config.network);
    } catch (_) {
      return i18n.send.details.address_field_is_not_valid;
    }

    return null;
  };

  getActualSatoshi = (tx: any, feeSatoshi: any) => feeSatoshi.dividedBy(Math.round(tx.length / 2)).toNumber();

  increaseFee = ({ feeSatoshi, requestedSatPerByte, actualSatoshiPerByte }: any) =>
    feeSatoshi
      .multipliedBy(requestedSatPerByte / actualSatoshiPerByte)
      .plus(10)
      .dividedBy(SATOSHI_IN_BTC)
      .toNumber();

  isFeeEnough = ({ actualSatoshiPerByte, requestedSatPerByte }: any) =>
    !(Math.round(actualSatoshiPerByte) !== Number(requestedSatPerByte) || Math.floor(actualSatoshiPerByte) < 1);

  numberToSatoshi = (amount: number) => new BigNumber(amount).multipliedBy(SATOSHI_IN_BTC);

  satoshiToNumber = (amount: number) => new BigNumber(amount).dividedBy(SATOSHI_IN_BTC);

  navigateToConfirm = ({ fee, tx, actualSatoshiPerByte }: any) => {
    const { transaction } = this.state;

    this.props.navigation.navigate(Route.SendCoinsConfirm, {
      recipients: [transaction],
      // HD wallet's utxo is in sats, classic segwit wallet utxos are in btc
      fee,
      memo: this.state.memo,
      fromWallet: this.state.fromWallet,
      tx,
      satoshiPerByte: actualSatoshiPerByte.toFixed(2),
    });
  };

  createStandardTransaction = async (createTx: Function) => {
    const { fee: requestedSatPerByte, transaction, memo, fromWallet: wallet } = this.state;
    await wallet.fetchUtxos();
    const utxos = wallet.getUtxos();
    const utxosAbleToSpent = utxos.filter((u: any) => u.spent_height === 0);
    let fee = 0.000001; // initial fee guess
    let actualSatoshiPerByte: any;
    let tx: any;
    const MAX_TRIES = 5;

    for (let tries = 0; tries < MAX_TRIES; tries++) {
      tx = await createTx(utxosAbleToSpent, transaction.amount, fee, transaction.address);

      const feeSatoshi = this.numberToSatoshi(fee);

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
    this.setState({ isLoading: false }, () => this.navigateToConfirm({ fee, tx, actualSatoshiPerByte }));
  };

  createTransactionByWallet = async (wallet: any) => {
    const { type } = wallet;
    switch (type) {
      case HDSegwitP2SHArWallet.type:
        return this.createStandardTransaction((utxos: any, amount: number, fee: number, address: string) =>
          wallet.createTx({
            utxos,
            amount,
            fee,
            address,
            vaultTxType: bitcoin.payments.VaultTxType.Alert,
          }),
        );
      case WatchOnlyWallet.type:
      case HDSegwitBech32Wallet.type:
        return this.createHDBech32Transaction();
      default:
        return this.createStandardTransaction((utxos: any, amount: number, fee: number, address: string) =>
          wallet.createTx(utxos, amount, fee, address),
        );
    }
  };

  confirmTransaction = async () => {
    this.setState({ isLoading: true });
    const { fromWallet } = this.state;
    const error = this.validateTransaction();

    if (error) {
      this.setState({ isLoading: false });
      Alert.alert(error);
      return;
    }
    try {
      await this.createTransactionByWallet(fromWallet);
    } catch (err) {
      Alert.alert(err.message);
      this.setState({ isLoading: false });
    }
  };

  renderAmountInput = () => {
    const { transaction } = this.state;
    return (
      <InputItem
        label={i18n.transactions.details.amount}
        suffix="BTCV"
        keyboardType="numeric"
        value={transaction.amount?.toString().replace(',', '.')}
        setValue={text => {
          transaction.amount = Number(text);
          this.setState({ transaction });
        }}
      />
    );
  };

  renderAddressInput = () => {
    const { transaction } = this.state;
    return (
      <InputItem
        multiline
        label={i18n.contactDetails.addressLabel}
        style={styles.addressInput}
        value={transaction.address}
        setValue={text => this.processAddressData(text.trim())}
      />
    );
  };

  /**
   * TODO: refactor this mess, get rid of regexp, use https://github.com/bitcoinjs/bitcoinjs-lib/issues/890 etc etc
   *
   * @param data {String} Can be address or `bitcoin:xxxxxxx` uri scheme, or invalid garbage
   */
  processAddressData = (data: string) => {
    const { transaction } = this.state;

    const newTransaction = processAddressData(data, transaction.amount);
    this.setState({
      transaction: newTransaction,
    });
    return newTransaction;
  };

  render() {
    const { fromWallet, fee, isLoading } = this.state;
    return (
      <ScreenTemplate
        footer={
          <Button
            title={i18n.send.details.next}
            onPress={this.confirmTransaction}
            containerStyle={styles.buttonContainer}
            disabled={isLoading}
          />
        }
      >
        <DashboarContentdHeader
          onSelectPress={this.showModal}
          balance={fromWallet.balance}
          label={fromWallet.label}
          unit={fromWallet.preferredBalanceUnit}
        />
        <View style={styles.inputsContainer}>
          {this.renderAmountInput()}

          <View style={styles.fee}>
            <Text>{i18n.send.details.fee}</Text>
            <StyledText title={`${fee} ${i18n.send.details.feeUnit}`} onPress={this.setTransactionFee} />
          </View>
          <View style={styles.addressContainer}>
            {this.renderAddressInput()}
            <TouchableOpacity
              style={styles.addressBookIcon}
              onPress={() =>
                this.props.navigation.navigate(Route.ChooseContactList, {
                  onContactPress: this.processAddressData,
                })
              }
            >
              <Image style={styles.icon} source={images.addressBook} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.qrCodeIcon}
              onPress={() =>
                this.props.navigation.navigate(Route.ScanQrCode, {
                  onBarCodeScan: this.processAddressData,
                })
              }
            >
              <Image style={styles.icon} source={icons.qrCode} />
            </TouchableOpacity>
          </View>

          <InputItem label={i18n.send.details.note} setValue={memo => this.setState({ memo })} />
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 40,
  },
  qrCodeIcon: { position: 'absolute', right: 0, bottom: 36 },
  addressBookIcon: { position: 'absolute', right: 40, bottom: 36 },
  icon: {
    width: 24,
    height: 24,
    padding: 8,
  },
  addressInput: {
    paddingEnd: 100,
  },
});
