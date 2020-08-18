import { curry, map } from 'lodash/fp';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { images } from 'app/assets';
import { Image, TransactionItem } from 'app/components';
import { Route, Transaction, Filters } from 'app/consts';
import { filterTransaction, filterBySearch } from 'app/helpers/filters';
import { getGroupedTransactions } from 'app/helpers/transactions';
import { NavigationService } from 'app/services';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  label: string;
  search: string;
  filters: Filters;
  transactions: Transaction[];
  transactionNotes: Record<string, string>;
  headerHeight: number;
}

export class TransactionList extends PureComponent<Props> {
  renderSectionTitle = (title: string) => {
    return (
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Text style={{ ...typography.caption, color: palette.textGrey }}>{title}</Text>
      </View>
    );
  };

  onTransactionItemPress = (item: Transaction) => {
    NavigationService.navigate(Route.TransactionDetails, { transaction: item });
  };

  renderListEmpty = () => {
    return (
      <View style={styles.noTransactionsContainer}>
        <Image source={images.noTransactions} style={styles.noTransactionsImage} />
        <Text style={styles.noTransactionsLabel}>{i18n.wallets.dashboard.noTransactions}</Text>
      </View>
    );
  };

  getSectionData = () => {
    const { search, transactions, filters, transactionNotes } = this.props;

    return getGroupedTransactions(
      transactions,
      map((tx: Transaction) => ({ ...tx, note: transactionNotes[tx.txid] })),
      curry(filterBySearch)(search),
      curry(filterTransaction)(filters),
    );
  };

  renderTransactions = () => {
    const sections = this.getSectionData();
    return sections.map(section => {
      const { data: transactions, title } = section;
      return (
        <View key={title}>
          {this.renderSectionTitle(title)}
          {transactions.map(t => (
            <TransactionItem key={t.txid} item={t} onPress={this.onTransactionItemPress} />
          ))}
        </View>
      );
    });
  };

  renderContent = () => {
    const { headerHeight, search, transactions } = this.props;
    if (transactions.length === 0) {
      return this.renderListEmpty();
    }
    return (
      <>
        {search ? <View style={{ height: transactions.length ? headerHeight / 2 : 0 }} /> : null}
        {this.renderTransactions()}
      </>
    );
  };
  render() {
    return <View style={{ padding: 20 }}>{this.renderContent()}</View>;
  }
}

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
