// @ts-nocheck
import moment from 'moment';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { NavigationScreenProps, NavigationInjectedProps } from 'react-navigation';

import { images } from 'app/assets';
import { Image, Header, StyledText, Chip, ScreenTemplate } from 'app/components';
import { CopyButton } from 'app/components/CopyButton';
import i18n from 'app/locale';
import { typography, palette } from 'app/styles';

import BlueApp from '../../BlueApp';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function arrDiff(a1, a2) {
  const ret = [];
  for (const v of a2) {
    if (a1.indexOf(v) === -1) {
      ret.push(v);
    }
  }
  return ret;
}

type Props = Partial<NavigationScreenProps>;

interface State {
  isLoading: boolean;
  tx: any;
  from: any[];
  to: any[];
  wallet: any;
}

export class TransactionDetailsScreen extends Component<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => {
    const transaction = props.navigation.getParam('item');
    return {
      header: <Header navigation={props.navigation} isBackArrow title={moment.unix(transaction.time).format('lll')} />,
    };
  };

  constructor(props: Props) {
    super(props);
    const { hash } = props.navigation.getParam('item');
    let foundTx = {};
    let from = [];
    let to = [];
    for (const tx of BlueApp.getTransactions()) {
      if (tx.hash === hash) {
        foundTx = tx;
        for (const input of foundTx.inputs) {
          from = from.concat(input.addresses);
        }
        for (const output of foundTx.outputs) {
          if (output.addresses) to = to.concat(output.addresses);
          if (output.scriptPubKey && output.scriptPubKey.addresses) to = to.concat(output.scriptPubKey.addresses);
        }
      }
    }

    let wallet = false;
    for (const w of BlueApp.getWallets()) {
      for (const t of w.getTransactions()) {
        if (t.hash === hash) {
          console.log('tx', hash, 'belongs to', w.getLabel());
          wallet = w;
        }
      }
    }
    this.state = {
      isLoading: true,
      tx: foundTx,
      from,
      to,
      wallet,
    };
  }

  async componentDidMount() {
    console.log('transactions/details - componentDidMount');
    this.setState({
      isLoading: false,
    });
  }

  sendCoins = () => {
    const { wallet } = this.state;

    this.props.navigation.navigate('SendDetails', {
      fromAddress: wallet.getAddress(),
      fromSecret: wallet.getSecret(),
      fromWallet: wallet,
    });
  };

  render() {
    const transaction = this.props.navigation.getParam('item');
    return (
      <ScreenTemplate>
        <View style={styles.headerContainer}>
          <Image source={transaction.value < 0 ? images.bigMinus : images.bigPlus} style={styles.image} />
          <Text style={styles.walletLabel}>{transaction.walletLabel}</Text>
          <Text style={styles.value}>{i18n.formatBalanceWithoutSuffix(Number(transaction.value))}</Text>
          <Chip
            label={`${transaction.confirmations < 7 ? transaction.confirmations : '6'} ${
              i18n.transactions.details.confirmations
            }`}
            textStyle={typography.overline}
          />
          <StyledText title={i18n.transactions.details.addNote} />
        </View>
        <View style={styles.contentRowContainer}>
          <Text style={styles.contentRowTitle}>{i18n.transactions.details.from}</Text>
          <Text style={styles.contentRowBody}>{this.state.from.filter(onlyUnique).join(', ')}</Text>
          <StyledText title={i18n.transactions.details.sendCoins} onPress={this.sendCoins} />
        </View>
        <View style={styles.contentRowContainer}>
          <View style={styles.row}>
            <Text style={styles.contentRowTitle}>{i18n.transactions.details.to}</Text>
            <CopyButton textToCopy={arrDiff(this.state.from, this.state.to.filter(onlyUnique)).join(', ')} />
          </View>
          <Text style={styles.contentRowBody}>
            {arrDiff(this.state.from, this.state.to.filter(onlyUnique)).join(', ')}
          </Text>
        </View>
        <View style={styles.contentRowContainer}>
          <View style={styles.row}>
            <Text style={styles.contentRowTitle}>{i18n.transactions.details.transactionId}</Text>
            <CopyButton textToCopy={this.state.tx.txid} />
          </View>
          <Text style={styles.contentRowBody}>{this.state.tx.txid}</Text>
          <StyledText
            title={i18n.transactions.details.viewInBlockRxplorer}
            onPress={() => {
              const url = `http://explorer.bitcoinvault.global/tx/${this.state.tx.txid}`;
              Linking.canOpenURL(url).then(supported => {
                if (supported) {
                  Linking.openURL(url);
                }
              });
            }}
          />
        </View>
        <View style={styles.contentRowContainer}>
          <Text style={styles.contentRowTitle}>{i18n.transactions.details.inputs}</Text>
          <Text style={styles.contentRowBody}>{transaction.inputs.length}</Text>
        </View>
        <View style={styles.contentRowContainer}>
          <Text style={styles.contentRowTitle}>{i18n.transactions.details.ouputs}</Text>
          <Text style={styles.contentRowBody}>{transaction.outputs.length}</Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 13,
  },
  walletLabel: {
    ...typography.headline8,
  },
  value: { ...typography.headline5, marginTop: 6, marginBottom: 10 },
  image: {
    height: 90,
    width: 90,
    margin: 15,
  },
  contentRowContainer: { marginVertical: 14 },
  contentRowTitle: { ...typography.overline, color: palette.textGrey },
  contentRowBody: { ...typography.caption, marginTop: 4, marginBottom: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
