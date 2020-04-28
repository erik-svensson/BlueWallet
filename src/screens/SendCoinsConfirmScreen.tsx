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
import { HDSegwitBech32Wallet } from '../../class';
import { BitcoinTransaction } from '../../models/bitcoinTransactionInfo';
import { BitcoinUnit, Chain } from '../../models/bitcoinUnits';
import NetworkTransactionFees, { NetworkTransactionFee } from '../../models/networkTransactionFees';

const Bignumber = require('bignumber.js');
const bip21 = require('bip21');
const bitcoin = require('bitcoinjs-lib');

const BlueElectrum = require('../../BlueElectrum');
const currency = require('../../currency');
const EV = require('../../events');

const ScreenFooter = onPress => (
  <View style={styles.footer}>
    <Button title={i18n.send.confirm.sendNow} containerStyle={styles.buttonContainer} onPress={onPress} />
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

    this.state = {
      isLoading: false,
      fee: props.navigation.getParam('fee'),
      feeSatoshi: new Bignumber(props.navigation.getParam('fee')).multipliedBy(100000000).toNumber(),
      memo: props.navigation.getParam('memo'),
      recipients: props.navigation.getParam('recipients'),
      size: Math.round(props.navigation.getParam('tx').length / 2),
      tx: props.navigation.getParam('tx'),
      satoshiPerByte: props.navigation.getParam('satoshiPerByte'),
      fromWallet: props.navigation.getParam('fromWallet'),
    };
  }

  broadcast = () => {
    this.setState({ isLoading: true }, async () => {
      try {
        await BlueElectrum.ping();
        await BlueElectrum.waitTillConnected();

        const result = await this.state.fromWallet.broadcastTx(this.state.tx);
        if (result && result.code) {
          if (result.code === 1) {
            const message = result.message.split('\n');
            throw new Error(`${message[0]}: ${message[2]}`);
          }
        } else {
          EV(EV.enum.REMOTE_TRANSACTIONS_COUNT_CHANGED); // someone should fetch txs
          let amount = 0;
          const recipients = this.state.recipients;
          if (recipients[0].amount === BitcoinUnit.MAX) {
            amount = this.state.fromWallet.getBalance() - this.state.feeSatoshi;
          } else {
            for (const recipient of recipients) {
              amount += recipient.amount ? +recipient.amount : recipient.value;
            }
          }

          if (this.state.fromWallet.type === HDSegwitBech32Wallet.type) {
            amount = i18n.formatBalanceWithoutSuffix(amount, BitcoinUnit.BTC, false);
          }

          this.props.navigation.navigate(Route.TransactionSuccess);
          this.setState({ isLoading: false });
        }
      } catch (error) {
        this.setState({ isLoading: false });
        alert(error.message);
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const fromWallet = navigation.getParam('fromWallet');
    const recipients = navigation.getParam('recipients');
    const item = recipients[0];
    const fee = navigation.getParam('fee');
    return (
      <ScreenTemplate footer={ScreenFooter(this.broadcast)}>
        <View style={styles.container}>
          <View>
            <View style={styles.chooseWalletButton}>
              <Text style={typography.headline4}>
                {item.amount || currency.satoshiToBTC(item.value)} {fromWallet.preferredBalanceUnit}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.buttonDescription}>{fromWallet.label}</Text>
              <Image source={images.coin} style={styles.coinIcon} />
            </View>
          </View>
          <Text style={[styles.buttonDescription, { alignSelf: 'center' }]}>{i18n.send.details.to}</Text>
          <Text style={styles.address}>{item.address}</Text>
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
