import { compose, map, flatten, values, filter } from 'lodash/fp';
import { createSelector } from 'reselect';

import { Transaction, TxType } from 'app/consts';
import { ApplicationState } from 'app/state';

import { TransactionsState } from './reducer';

const local = (state: ApplicationState): TransactionsState => state.transactions;

const hasNotBeenRecovered = (aTxPending: Transaction, rTxInputsTxIds: any) => {
  if (aTxPending.value > 0) {
    return false;
  }
  const aTxInputsTxIds = aTxPending.inputs.map(a => a.txid);
  for (let i = 0; i < aTxInputsTxIds.length; i++) {
    if (rTxInputsTxIds.includes(aTxInputsTxIds[i])) {
      return false;
    }
  }
  return true;
};

const filterTransactionThatHasBeenRecovered = (txs: Transaction[]) => {
  const rTxInputsTxIds = compose(
    map((input: { txid: string }) => input.txid),
    flatten,
    map((rTx: Transaction) => rTx.inputs),
    filter((tx: Transaction) => tx.tx_type == TxType.RECOVERY),
  )(txs);

  return txs.filter(tx => {
    if (tx.tx_type == TxType.ALERT_PENDING) {
      return hasNotBeenRecovered(tx, rTxInputsTxIds);
    }
    return true;
  });
};

export const transactions = createSelector(local, state => state.transactions);

export const allTransactions = createSelector(transactions, compose(flatten, values));

export const allFilteredTransactions = createSelector(allTransactions, filterTransactionThatHasBeenRecovered);

export const getTranasctionsByWalletSecret = createSelector(
  transactions,
  (_: TransactionsState, secret: string) => secret,
  (txs: Record<string, Transaction[]>, secret) => txs[secret] || [],
);

export const filteredTransactionsByWalletSecret = createSelector(
  getTranasctionsByWalletSecret,
  filterTransactionThatHasBeenRecovered,
);

export const getRecoveryTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  txs.filter(t => t.tx_type === TxType.RECOVERY),
);

export const getAlertPendingTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  txs.filter(t => t.tx_type === TxType.ALERT_PENDING),
);

export const getTransactionsToRecoverByWalletSecret = createSelector(filteredTransactionsByWalletSecret, txs =>
  txs.filter(tx => tx.tx_type === TxType.ALERT_PENDING),
);
