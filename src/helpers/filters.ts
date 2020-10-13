import moment from 'moment';

import { CONST, Transaction } from 'app/consts';

const i18n = require('../../loc');

const filterByTransactionType = (transactions: Transaction[], type: string) => {
  if (type === CONST.send) {
    return transactions.filter(transaction => Number(transaction.value) < 0);
  }
  return transactions.filter(transaction => Number(transaction.value) > 0);
};

const filterByAddress = (transactions: Transaction[], type: string, address: string) => {
  if (type === CONST.send) {
    return transactions.filter(transaction => {
      const inputs: string[] = [];
      transaction.inputs.filter(input => {
        inputs.push(...input.addresses);
      });
      if (inputs.includes(address)) return transaction;
    });
  } else {
    return transactions.filter(transaction => {
      const outputs: string[] = [];
      transaction.outputs.filter(output => {
        outputs.push(...output.addresses);
      });
      if (outputs.includes(address)) return transaction;
    });
  }
};

const filterByFromDate = (transactions: Transaction[], fromDate: number) => {
  return transactions.filter(transaction => {
    if (!transaction.received) {
      return;
    }
    return (
      parseInt(
        moment(fromDate)
          .startOf('day')
          .format('X'),
      ) <=
      parseInt(
        moment(transaction.received)
          .startOf('day')
          .format('X'),
      )
    );
  });
};

const filterByToDate = (transactions: Transaction[], toDate: number) => {
  return transactions.filter(transaction => {
    if (!transaction.received) {
      return;
    }
    return (
      parseInt(
        moment(toDate)
          .endOf('day')
          .format('X'),
      ) >=
      parseInt(
        moment(transaction.received)
          .startOf('day')
          .format('X'),
      )
    );
  });
};

const fileterByFromAmount = (transactions: Transaction[], fromAmount: number) => {
  return transactions.filter(transaction => {
    return (
      Math.abs(
        parseFloat(i18n.formatBalanceWithoutSuffix(Number(transaction.value), transaction.walletPreferredBalanceUnit)),
      ) >= Math.abs(fromAmount)
    );
  });
};

const fileterByToAmount = (transactions: Transaction[], toAmount: number) => {
  return transactions.filter(
    transaction =>
      Math.abs(
        parseFloat(i18n.formatBalanceWithoutSuffix(Number(transaction.value), transaction.walletPreferredBalanceUnit)),
      ) <= Math.abs(toAmount),
  );
};

export const filterBySearch = (transactions: Transaction[], search: string) => {
  return transactions.filter(transaction => {
    const inputs: string[] = [];
    const outputs: string[] = [];
    transaction.inputs.filter(input => {
      inputs.push(...input.addresses);
    });
    transaction.outputs.filter(output => {
      outputs.push(...output.addresses);
    });
    return (
      transaction.note?.toLowerCase().includes(search) ||
      inputs.map(input => input.toLowerCase().includes(search)).includes(true) ||
      outputs.map(output => output.toLowerCase().includes(search)).includes(true) ||
      i18n
        .formatBalanceWithoutSuffix(Math.abs(Number(transaction.value)), transaction.walletPreferredBalanceUnit)
        .includes(search)
    );
  });
};

export const filterTransaction = (transactions: Transaction[], filters: any) => {
  const filteredByType = filterByTransactionType(transactions, filters.transactionType);
  const filteredbyAddress = filters.address
    ? filterByAddress(filteredByType, filters.transactionType, filters.address)
    : filteredByType;
  const filteredByFromDate = filters.fromDate
    ? filterByFromDate(filteredbyAddress, filters.fromDate)
    : filteredbyAddress;
  const filteredByToDate = filters.toDate ? filterByToDate(filteredByFromDate, filters.toDate) : filteredByFromDate;
  const fileteredByFromAmount = filters.fromAmount
    ? fileterByFromAmount(filteredByToDate, parseFloat(filters.fromAmount))
    : filteredByToDate;
  const fileteredByToAmount = filters.toAmount
    ? fileterByToAmount(fileteredByFromAmount, parseFloat(filters.toAmount))
    : fileteredByFromAmount;
  return fileteredByToAmount;
};
