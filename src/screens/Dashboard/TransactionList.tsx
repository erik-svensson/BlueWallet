import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';

import { TransactionItem } from 'app/components';
import { palette, typography } from 'app/styles';

export class TransactionList extends Component {
  state = {
    transactions: [],
  };

  static getDerivedStateFromProps(props, state) {
    // if (state.transactions.length) {
    //   return null;
    // }
    const groupedTransactions = [];
    const dataToGroup = props.data.map(transaction => ({
      ...transaction,
      day: moment.unix(transaction.time).format('ll'),
      label: props.label,
    }));
    const uniqueValues = [...new Set(dataToGroup.map(item => item.day))];
    console.log('props.data', dataToGroup);
    uniqueValues.map(uniqueValue =>
      groupedTransactions.push({
        title: uniqueValue,
        data: dataToGroup.filter(transaction => transaction.day === uniqueValue),
      }),
    );
    return {
      transactions: groupedTransactions,
    };
  }

  renderSectionTitle = ({ section: { title } }) => {
    return (
      <View style={{ marginTop: 30, marginBottom: 10 }}>
        <Text style={{ ...typography.caption, color: palette.textGrey }}>{title}</Text>
      </View>
    );
  };

  render() {
    // console.log('transactions', this.state.transactions);

    return (
      <View style={{ padding: 20 }}>
        <SectionList
          sections={this.state.transactions}
          keyExtractor={(item, index) => item + index}
          renderItem={item => <TransactionItem item={item.item} />}
          renderSectionHeader={this.renderSectionTitle}
        />
      </View>
    );
  }
}
