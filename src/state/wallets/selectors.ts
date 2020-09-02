import { flatten, negate } from 'lodash';
import { createSelector } from 'reselect';

import { EnhancedTransactions, TxType } from 'app/consts';
import { isAllWallets } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';

import { WalletsState } from './reducer';

const local = (state: ApplicationState): WalletsState => state.wallets;

export const wallets = createSelector(local, state => state.wallets);

export const transactions = createSelector(wallets, walletsList =>
  flatten(
    walletsList.filter(negate(isAllWallets)).map(wallet => {
      const walletBalanceUnit = wallet.getPreferredBalanceUnit();
      const walletLabel = wallet.getLabel();
      const secret = wallet.secret;
      return wallet.transactions.map(transaction => ({
        ...transaction,
        walletPreferredBalanceUnit: walletBalanceUnit,
        walletSecret: secret,
        walletLabel,
      }));
    }),
  ),
);

export const getTranasctionsByWalletSecret = createSelector(
  transactions,
  (_: WalletsState, secret: string) => secret,
  (txs, secret) => txs.find(t => t.walletSecret === secret) || [],
);

export const getRecoveryTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  (txs as EnhancedTransactions[]).filter(t => t.tx_type === TxType.RECOVERY),
);

export const getAlertPendingTransactions = createSelector(getTranasctionsByWalletSecret, txs =>
  (txs as EnhancedTransactions[]).filter(t => t.tx_type === TxType.ALERT_PENDING),
);

export const getTransactionsToRecoverByWalletSecret = createSelector(getAlertPendingTransactions, txs =>
  txs.filter(tx => tx.value < 0 && tx.confirmations > 0),
);
