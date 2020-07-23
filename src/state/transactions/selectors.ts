import { createSelector } from 'reselect';

import { Transaction, TxType } from 'app/consts';
import { ApplicationState } from 'app/state';

import { TransactionsState } from './reducer';

const local = (state: ApplicationState): TransactionsState => state.transactions;

export const transactions = createSelector(local, state => state.transactions);

export const getTranasctionsByWalletId = createSelector(
  transactions,
  (_: TransactionsState, id: string) => id,
  (txs: Record<string, Transaction[]>, id) => txs[id],
);

export const getRecoveryTransactionsByWalletId = createSelector(getTranasctionsByWalletId, txs =>
  txs.filter(t => t.tx_type === TxType.ALERT_PENDING && t.value < 0),
);
