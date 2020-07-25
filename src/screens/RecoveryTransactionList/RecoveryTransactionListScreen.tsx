import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
import { DashboarContentdHeader } from '../Dashboard/DashboarContentdHeader';

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

  render() {
    const { navigation, route, transactions } = this.props;
    const { wallet } = route.params;

    const areAllTransactionsSelected = this.areAllTransactionsSelected();
    return (
      <ScreenTemplate
        header={<Header title={i18n.send.recovery.recover} isBackArrow navigation={navigation} />}
        footer={<Button onPress={this.submit} disabled={!this.canSubmit()} title={i18n.send.details.next} />}
      >
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

        {/* {transactions.map((t: Transaction) => {
          const isChecked = this.isChecked(t);
          return (
            <View key={t.hash}>
              <TransactionItem
                onPress={() => (isChecked ? this.removeTranscation(t) : this.addTranscation(t))}
                item={t}
              />
              <CheckBox
                onPress={() => (isChecked ? this.removeTranscation(t) : this.addTranscation(t))}
                right
                checked={isChecked}
              />
            </View>
          );
        })} */}
        <SectionList
          sections={transactions.map(t => ({ data: [t] }))}
          keyExtractor={item => item.txid}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderListEmpty}
        />
      </ScreenTemplate>
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
