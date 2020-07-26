import { compose, map, flatten } from 'lodash/fp';
import { createSelector } from 'reselect';

import { Transaction, TxType } from 'app/consts';
import { ApplicationState } from 'app/state';

import { TransactionsState } from './reducer';

const local = (state: ApplicationState): TransactionsState => state.transactions;

export const transactions = createSelector(local, state => state.transactions);

export const getTranasctionsByWalletSecret = createSelector(
  transactions,
  (_: TransactionsState, secret: string) => secret,
  (txs: Record<string, Transaction[]>, secret) => txs[secret] || [],
);

export const getRecoveryTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  txs.filter(t => t.tx_type === TxType.RECOVERY),
);

export const getAlertPendingTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  txs.filter(t => t.tx_type === TxType.ALERT_PENDING),
);

export const getTransactionsToRecoverByWalletSecret = createSelector(
  getAlertPendingTransactions,
  getRecoveryTransactions,
  (alertTxs, recoveryTxs) => {
    const rTxInputsTxIds = compose(
      map((r: { txid: string }) => r.txid),
      flatten,
      map((rTx: Transaction) => rTx.inputs),
    )(recoveryTxs);

    return alertTxs.filter(aTx => {
      if (aTx.value > 0) {
        return false;
      }
      const aTxInputsTxIds = aTx.inputs.map(a => a.txid);
      for (let i = 0; i < aTxInputsTxIds.length; i++) {
        if (rTxInputsTxIds.includes(aTxInputsTxIds[i])) {
          return false;
        }
      }
      return true;
    });
  },
);
