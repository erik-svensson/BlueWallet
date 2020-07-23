import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { SectionList, SectionListData, StyleSheet, Text, View } from 'react-native';

import { images } from 'app/assets';
import { Header, Image, ScreenTemplate } from 'app/components';
import { MainCardStackNavigatorParams, Route, RootStackParams, Transaction, Filters } from 'app/consts';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';
import { NavigationService } from 'app/services';
import { palette, typography } from 'app/styles';

import BlueApp from '../../../BlueApp';
import { DashboarContentdHeader } from '../Dashboard/DashboarContentdHeader';

const i18n = require('../../../loc');

interface TransactionWithDay extends Transaction {
  day: moment.Moment;
  walletLabel: string;
  note: string;
}

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.RecoveryTransactionList>
  >;

  route: RouteProp<MainCardStackNavigatorParams, Route.RecoveryTransactionList>;
}

interface State {
  transactions: ReadonlyArray<SectionListData<TransactionWithDay>>;
  wallet: any;
}

export class RecoveryTransactionListScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { route } = props;
    const { wallet } = route.params;

    this.state = {
      transactions: [],
      wallet,
    };
  }

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
    const { wallet } = this.state;
    const recoveryWallets = wallets.filter(this.canMakeRecoveryTransactions);

    const selectedIndex = recoveryWallets.findIndex((w: any) => w.label === wallet.label);

    this.props.navigation.navigate(Route.ActionSheet, {
      wallets: recoveryWallets,
      selectedIndex,
      onPress: (index: number) => {
        const newWallet = recoveryWallets[index];
        this.setState({
          wallet: newWallet,
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

  render() {
    const { transactions, wallet } = this.state;
    const { navigation } = this.props;
    return (
      <ScreenTemplate header={<Header title={i18n.send.recovery.recover} isBackArrow navigation={navigation} />}>
        <DashboarContentdHeader
          onSelectPress={this.showModal}
          balance={wallet.balance}
          label={wallet.label}
          unit={wallet.preferredBalanceUnit}
        />
        {/* <SectionList
          ListFooterComponent={search ? <View style={{ height: transactions.length ? headerHeight / 2 : 0 }} /> : null}
          sections={transactions}
          keyExtractor={(item, index) => `${item.txid}-${index}`}
          renderItem={item => <TransactionItem item={item.item} onPress={this.onTransactionItemPress} />}
          renderSectionHeader={this.renderSectionTitle}
          ListEmptyComponent={this.renderListEmpty}
        /> */}
      </ScreenTemplate>
    );
  }
}

export default RecoveryTransactionListScreen;

const styles = StyleSheet.create({
  noTransactionsContainer: {
    alignItems: 'center',
  },
  noTransactionsImage: { height: 167, width: 167, marginVertical: 30 },
  noTransactionsLabel: {
    ...typography.caption,
    color: palette.textGrey,
  },
});
