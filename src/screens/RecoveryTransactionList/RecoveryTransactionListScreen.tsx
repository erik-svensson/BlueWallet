import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { groupBy, sortBy, map, compose } from 'lodash/fp';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Header, Image, ScreenTemplate, TransactionItem, Button, CheckBox } from 'app/components';
import { MainCardStackNavigatorParams, Route, RootStackParams, Transaction } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';
import { NavigationService } from 'app/services';
import { ApplicationState } from 'app/state';
import { selectors } from 'app/state/transactions';
import { TransactionsState } from 'app/state/transactions/reducer';
import { palette, typography } from 'app/styles';

import BlueApp from '../../../BlueApp';
import { formatDate } from '../../../utils/date';
import { DashboarContentdHeader } from '../Dashboard/DashboarContentdHeader';

const mapNoCap = map.convert({ cap: false });

const i18n = require('../../../loc');

interface NavigationProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.RecoveryTransactionList>
  >;

  route: RouteProp<MainCardStackNavigatorParams, Route.RecoveryTransactionList>;
}

interface MapStateProps {
  transactions: Transaction[];
}
interface State {
  selectedTransactions: Transaction[];
}

type Props = NavigationProps & MapStateProps;

export class RecoveryTransactionListScreen extends Component<Props, State> {
  state = {
    selectedTransactions: [],
  };

  renderSectionTitle = ({ section }: { section: any }) => {
    return (
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Text style={{ ...typography.caption, color: palette.textGrey }}>{section.title}</Text>
      </View>
    );
  };

  onTransactionItemPress = (item: Transaction) => {
    NavigationService.navigate(Route.TransactionDetails, { transaction: item });
  };

  canMakeRecoveryTransactions = (wallet: any) =>
    [HDSegwitP2SHArWallet.type, HDSegwitP2SHAirWallet.type].includes(wallet.type);

  showModal = () => {
    const wallets = BlueApp.getWallets();
    const { navigation, route } = this.props;
    const { wallet } = route.params;
    const recoveryWallets = wallets.filter(this.canMakeRecoveryTransactions);

    const selectedIndex = recoveryWallets.findIndex((w: any) => w.label === wallet.label);

    navigation.navigate(Route.ActionSheet, {
      wallets: recoveryWallets,
      selectedIndex,
      onPress: (index: number) => {
        const newWallet = recoveryWallets[index];
        this.setState({ selectedTransactions: [] }, () => {
          navigation.setParams({ wallet: newWallet });
        });
      },
    });
  };

  renderListEmpty = () => {
    return (
      <View style={styles.noTransactionsContainer}>
        <Image source={images.noTransactions} style={styles.noTransactionsImage} />
        <Text style={styles.noTransactionsLabel}>{i18n.wallets.dashboard.noTransactions}</Text>
      </View>
    );
  };

  addTranscation = (transaction: Transaction) => {
    this.setState((state: State) => ({ selectedTransactions: [...state.selectedTransactions, transaction] }));
  };

  removeTranscation = (transaction: Transaction) => {
    this.setState((state: State) => ({
      selectedTransactions: state.selectedTransactions.filter(t => t.hash !== transaction.hash),
    }));
  };

  isChecked = (transaction: Transaction) => {
    const { selectedTransactions } = this.state;

    return selectedTransactions.some((t: Transaction) => t.hash === transaction.hash);
  };

  areAllTransactionsSelected = () => {
    const { selectedTransactions } = this.state;
    const { transactions } = this.props;

    return !!!transactions.filter(t => !!!selectedTransactions.find((s: Transaction) => s.txid === t.txid)).length;
  };

  addAllTransactions = () => {
    const { transactions } = this.props;

    this.setState({ selectedTransactions: transactions });
  };

  removeAllTransactions = () => {
    this.setState({ selectedTransactions: [] });
  };

  toggleAllTransactions = (areAllTransactionsSelected: boolean) => () => {
    areAllTransactionsSelected ? this.removeAllTransactions() : this.addAllTransactions();
  };

  canSubmit = () => {
    const { selectedTransactions } = this.state;
    return !!selectedTransactions.length;
  };

  submit = () => {
    const { navigation, route } = this.props;
    const { wallet } = route.params;
    const { selectedTransactions } = this.state;

    navigation.navigate(Route.RecoverySend, { wallet, transactions: selectedTransactions });
  };

  toggleTransaction = (isChecked: boolean, transaction: Transaction) => () =>
    isChecked ? this.removeTranscation(transaction) : this.addTranscation(transaction);

  renderItem = ({ item: transaction }: { item: Transaction }) => {
    const isChecked = this.isChecked(transaction);
    const toggle = this.toggleTransaction(isChecked, transaction);
    return (
      <View style={styles.itemWrapper}>
        <TransactionItem onPress={toggle} item={transaction} />
        <CheckBox onPress={toggle} right checked={isChecked} />
      </View>
    );
  };

  getDataForSectionList = () => {
    const { transactions } = this.props;
    console.log('transactions', transactions);
    const mocked = [
      {
        confirmations: 0,
        hash: '8cb583f4a57b2edsadsa17353375dee5007018cee7d4d4213e00c203fed5164b03260f',
        received: '2020-07-25T14:30:32.145Z',
        tx_type: 'ALERT_PENDING',
        txid: '9a8d1729867776747dsadasaf8e5f40fbeff91375e223b0ce08b8dbc7a38f8f73f41a0',
        version: 1,
        vsize: 189,
        value: -400500,
        walletLabel: 'Ar',
        walletPreferredBalanceUnit: 'BTCV',
        weight: 755,
      },
      {
        confirmations: 0,
        hash: '8cb583f4a57b2e173dsaddsad53375dee5007018cee7d4d4213e00c203fed5164b03260f',
        received: '2020-07-25T12:30:32.145Z',
        tx_type: 'ALERT_PENDING',
        txid: '9a8d17298677767dsadsa47af8e5f40fbeff91375e223b0ce08b8dbc7a38f8f73f41a0',
        version: 1,
        vsize: 189,
        value: -404000,
        walletLabel: 'Ar',
        walletPreferredBalanceUnit: 'BTCV',
        weight: 755,
      },
      {
        confirmations: 0,
        hash: '8cb583f4a57b2e1735fdsfdsfds3375dee5007018cee7d4d4213e00c203fed5164b03260f',
        received: '2020-05-25T14:30:32.145Z',
        tx_type: 'ALERT_PENDING',
        txid: '9a8d17298677767fdsfdsfsfd47af8e5f40fbeff91375e223b0ce08b8dbc7a38f8f73f41a0',
        version: 1,
        value: -50000,

        vsize: 189,
        walletLabel: 'Ar',
        walletPreferredBalanceUnit: 'BTCV',
        weight: 755,
      },
      {
        confirmations: 0,
        hash: '8cb583f4a57bfdsfds2e17353375dee5007018cee7d4d4213e00c203fed5164b03260f',
        received: '2020-07-23T14:30:32.145Z',
        tx_type: 'ALERT_PENDING',
        txid: '9a8d1fdsfsd729867776747af8e5f40fbeff91375e223b0ce08b8dbc7a38f8f73f41a0',
        version: 1,
        value: -40000,
        vsize: 189,
        walletLabel: 'Ar',
        walletPreferredBalanceUnit: 'BTCV',
        weight: 755,
      },
      {
        confirmations: 0,
        hash: '8cb583f4a57bfdsgdfgfds2e17353375dee5007018cee7d4d4213e00c203fed5164b03260f',
        received: '2020-03-23T14:30:32.145Z',
        tx_type: 'ALERT_PENDING',
        txid: '9a8d1fdsfsd72gfgd9867776747af8e5f40fbeff91375e223b0ce08b8dbc7a38f8f73f41a0',
        version: 1,
        value: -40000,
        vsize: 189,
        walletLabel: 'Ar',
        walletPreferredBalanceUnit: 'BTCV',
        weight: 755,
      },
    ];

    return compose(
      mapNoCap((txs: Transaction[], date: string) => ({
        title: date,
        data: txs,
      })),
      groupBy(({ received }) => formatDate(received, 'll')),
      sortBy('received'),
    )(mocked) as [{ title: string; data: Transaction[] }];
  };

  render() {
    const { navigation, route, transactions } = this.props;
    const { wallet } = route.params;

    const areAllTransactionsSelected = this.areAllTransactionsSelected();
    return (
      <View
      // header={<Header title={i18n.send.recovery.recover} isBackArrow navigation={navigation} />}
      // footer={<Button onPress={this.submit} disabled={!this.canSubmit()} title={i18n.send.details.next} />}
      >
        <Header title={i18n.send.recovery.recover} isBackArrow navigation={navigation} />
        <DashboarContentdHeader
          onSelectPress={this.showModal}
          balance={wallet.balance}
          label={wallet.label}
          unit={wallet.preferredBalanceUnit}
        />
        <TouchableOpacity
          style={styles.toggleAllWrapper}
          onPress={this.toggleAllTransactions(areAllTransactionsSelected)}
        >
          <Text style={styles.toggleAllText}>{areAllTransactionsSelected ? '-' : '+'}</Text>
        </TouchableOpacity>
        <SectionList
          sections={this.getDataForSectionList()}
          keyExtractor={item => item.txid}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderListEmpty}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: ApplicationState & TransactionsState, props: Props): MapStateProps => {
  const { wallet } = props.route.params;
  return {
    transactions: selectors.getTransactionsToRecoverByWalletSecret(state, wallet.secret),
  };
};

export default connect(mapStateToProps)(RecoveryTransactionListScreen);

const styles = StyleSheet.create({
  noTransactionsContainer: {
    alignItems: 'center',
  },
  noTransactionsImage: { height: 167, width: 167, marginVertical: 30 },
  noTransactionsLabel: {
    ...typography.caption,
    color: palette.textGrey,
  },
  toggleAllWrapper: {
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    display: 'flex',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleAllText: {
    ...typography.headline2,

    color: palette.textSecondary,
  },
});
