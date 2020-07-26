import { curry } from 'lodash/fp';
import moment from 'moment/min/moment-with-locales';
import React, { PureComponent } from 'react';
import { SectionList, SectionListData, StyleSheet, Text, View } from 'react-native';

import { images } from 'app/assets';
import { Image, TransactionItem } from 'app/components';
import { Route, Transaction, Filters } from 'app/consts';
import { filterTransaction, filterBySearch } from 'app/helpers/filters';
import { getGroupedTransactions } from 'app/helpers/transactions';
import { NavigationService } from 'app/services';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

interface TransactionWithDay extends Transaction {
  day: moment.Moment;
  walletLabel: string;
  note: string;
}

interface Props {
  label: string;
  search: string;
  filters: Filters;
  transactions: Transaction[];
  transactionNotes: Record<string, string>;
  headerHeight: number;
}

export class TransactionList extends PureComponent<Props> {
  renderSectionTitle = ({ section }: { section: SectionListData<Transation> }) => {
    return (
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Text style={{ ...typography.caption, color: palette.textGrey }}>{section.title}</Text>
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

  render() {
    const { headerHeight, search, transactions, filters } = this.props;
    return (
      <View style={{ padding: 20 }}>
        <SectionList
          ListFooterComponent={search ? <View style={{ height: transactions.length ? headerHeight / 2 : 0 }} /> : null}
          sections={getGroupedTransactions(
            transactions,
            curry(filterBySearch)(search),
            curry(filterTransaction)(filters),
          )}
          keyExtractor={(item, index) => `${item.txid}-${index}`}
          renderItem={item => <TransactionItem item={item.item} onPress={this.onTransactionItemPress} />}
          renderSectionHeader={this.renderSectionTitle}
          ListEmptyComponent={this.renderListEmpty}
        />
      </View>
    );
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
