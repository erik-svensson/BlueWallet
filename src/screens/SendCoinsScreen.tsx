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
import { HDLegacyP2PKHWallet, HDSegwitBech32Wallet, HDSegwitP2SHWallet, WatchOnlyWallet } from '../../class';
import config from '../../config';
import { BitcoinTransaction } from '../../models/bitcoinTransactionInfo';
import { BitcoinUnit } from '../../models/bitcoinUnits';
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
    await wallet.fetchUtxo();
    const changeAddress = await wallet.getAddressForTransaction();
    const requestedSatPerByte: string | number = +this.state.fee.toString().replace(/\D/g, '');

    const targets: any[] = [];
    const amount = new BigNumber(transaction.amount).multipliedBy(100000000).toNumber();
    if (amount > 0.0) {
      targets.push({ address: transaction.address, value: amount });
    }

    const { tx, fee, psbt } = await wallet.createTransaction(
      wallet.getUtxo(),
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
        fee: new BigNumber(fee).dividedBy(100000000).toNumber(),
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
      availableBalance = availableBalance.div(100000000); // sat2btc
      availableBalance = availableBalance.minus(amount);
      availableBalance = availableBalance.minus(fee);
      availableBalance = availableBalance.toString(10);
    } catch (err) {
      return balance;
    }

    return (availableBalance === 'NaN' && balance) || availableBalance;
  }

  calculateFee(utxos: any, txhex: any, utxoIsInSatoshis: any) {
    const index = {};
    let c = 1;
    index[0] = 0;
    for (const utxo of utxos) {
      if (!utxoIsInSatoshis) {
        utxo.value = new BigNumber(utxo.value).multipliedBy(100000000).toNumber();
      }
      index[c] = utxo.value + index[c - 1];
      c++;
    }

    const tx = bitcoin.Transaction.fromHex(txhex);
    const totalInput = index[tx.ins.length];
    // ^^^ dumb way to calculate total input. we assume that signer uses utxos sequentially
    // so total input == sum of yongest used inputs (and num of used inputs is `tx.ins.length`)
    // TODO: good candidate to refactor and move to appropriate class. some day

    let totalOutput = 0;
    for (const o of tx.outs) {
      totalOutput += o.value * 1;
    }

    return new BigNumber(totalInput - totalOutput).dividedBy(100000000).toNumber();
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

  confirmTransaction = async () => {
    this.setState({ isLoading: true });
    const requestedSatPerByte: any = this.state.fee.toString().replace(/\D/g, '');
    const error = this.validateTransaction();

    if (error) {
      this.setState({ isLoading: false });
      Alert.alert(error);
      return;
    }

    if (
      this.state.fromWallet.type === HDSegwitBech32Wallet.type ||
      this.state.fromWallet.type === WatchOnlyWallet.type
    ) {
      // new send is supported by BIP84 or watchonly with HW wallet support (it uses BIP84 under the hood anyway)
      try {
        await this.createHDBech32Transaction();
      } catch (Err) {
        this.setState({ isLoading: false }, () => {
          Alert.alert(Err.message);
        });
      }
      return;
    }

    // legacy send below

    this.setState({ isLoading: true }, async () => {
      let utxo: any;
      let actualSatoshiPerByte: any;
      let tx: any, txid: any;
      let tries = 1;
      let fee = 0.000001; // initial fee guess
      const firstTransaction = this.state.transaction;
      try {
        await this.state.fromWallet.fetchUtxo();
        utxo = this.state.fromWallet.utxo;
        do {
          console.log('try #', tries, 'fee=', fee);
          if (this.recalculateAvailableBalance(this.state.fromWallet.getBalance(), firstTransaction.amount, fee) < 0) {
            // we could not add any fee. user is trying to send all he's got. that wont work
            // throw new Error(loc.send.details.total_exceeds_balance);
          }

          const startTime = Date.now();
          tx = this.state.fromWallet.createTx(
            utxo,
            firstTransaction.amount,
            fee,
            firstTransaction.address,
            this.state.memo,
          );
          const endTime = Date.now();
          console.log('create tx ', (endTime - startTime) / 1000, 'sec');

          const txDecoded = bitcoin.Transaction.fromHex(tx);
          txid = txDecoded.getId();
          console.log('txid', txid);
          console.log('txhex', tx);

          const feeSatoshi = new BigNumber(fee).multipliedBy(100000000);
          actualSatoshiPerByte = feeSatoshi.dividedBy(Math.round(tx.length / 2));
          actualSatoshiPerByte = actualSatoshiPerByte.toNumber();
          console.log({ satoshiPerByte: actualSatoshiPerByte });

          if (Math.round(actualSatoshiPerByte) !== requestedSatPerByte * 1 || Math.floor(actualSatoshiPerByte) < 1) {
            console.log('fee is not correct, retrying');
            fee = feeSatoshi
              .multipliedBy(requestedSatPerByte / actualSatoshiPerByte)
              .plus(10)
              .dividedBy(100000000)
              .toNumber();
          } else {
            break;
          }
        } while (tries++ < 5);

        BlueApp.tx_metadata = BlueApp.tx_metadata || {};
        BlueApp.tx_metadata[txid] = {
          txhex: tx,
          memo: this.state.memo,
        };
        await BlueApp.saveToDisk();
      } catch (err) {
        Alert.alert(err.toString());
        this.setState({ isLoading: false });
        return;
      }

      this.setState({ isLoading: false }, () =>
        this.props.navigation.navigate(Route.SendCoinsConfirm, {
          recipients: [firstTransaction],
          // HD wallet's utxo is in sats, classic segwit wallet utxos are in btc
          fee: this.calculateFee(
            utxo,
            tx,
            this.state.fromWallet.type === HDSegwitP2SHWallet.type ||
              this.state.fromWallet.type === HDLegacyP2PKHWallet.type,
          ),
          memo: this.state.memo,
          fromWallet: this.state.fromWallet,
          tx,
          satoshiPerByte: actualSatoshiPerByte.toFixed(2),
        }),
      );
    });
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
