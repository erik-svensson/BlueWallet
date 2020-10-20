import { flatten, negate, max } from 'lodash';
import { flatten as flattenFp, some, map, compose } from 'lodash/fp';
import { createSelector } from 'reselect';

import { TxType, Wallet, TransactionInput, TransactionOutput } from 'app/consts';
import { isAllWallets } from 'app/helpers/helpers';
import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from 'app/legacy';
import { ApplicationState } from 'app/state';

import { roundBtcToSatoshis, btcToSatoshi } from '../../../utils/bitcoin';
import { selectors as electrumXSelectors } from '../electrumX';
import { WalletsState } from './reducer';

const local = (state: ApplicationState): WalletsState => state.wallets;

export const wallets = createSelector(local, state => state.wallets);

export const getById = createSelector(
  wallets,
  (_: WalletsState, id: string) => id,
  (data, id) => data.find(w => w.id === id),
);

export const getWalletsLabels = createSelector(wallets, walletsList => walletsList.map(w => w.label));

export const walletsWithRecoveryTransaction = createSelector(wallets, walletsList =>
  walletsList.filter(wallet => [HDSegwitP2SHArWallet.type, HDSegwitP2SHAirWallet.type].includes(wallet.type)),
);

export const allWallet = createSelector(wallets, walletsList => {
  const { incoming_balance, balance } = walletsList.reduce(
    (acc, wallet) => ({
      incoming_balance: acc.incoming_balance + wallet.incoming_balance,
      balance: acc.balance + wallet.balance,
    }),
    { incoming_balance: 0, balance: 0 },
  );

  return {
    label: 'All wallets',
    balance,
    incoming_balance,
    preferredBalanceUnit: 'BTCV',
    type: '',
  };
});

export const allWallets = createSelector(wallets, allWallet, (walletsList, aw) => {
  if (walletsList.length > 1) {
    return [aw as Wallet, ...walletsList];
  }
  return walletsList;
});

type TxEntity = TransactionInput | TransactionOutput;
const getMyAmount = (wallet: Wallet, entities: TxEntity[]) =>
  entities.reduce((amount: number, entity: TxEntity) => {
    if (wallet.weOwnAddress(entity.addresses[0])) {
      return entity.value + amount;
    }
    return amount;
  }, 0);

export const transactions = createSelector(wallets, electrumXSelectors.blockHeight, (walletsList, blockHeight) => {
  const txs = flatten(
    walletsList.filter(negate(isAllWallets)).map(wallet => {
      const walletBalanceUnit = wallet.getPreferredBalanceUnit();
      const walletLabel = wallet.getLabel();
      const id = wallet.id;
      return wallet.transactions.map(transaction => {
        const { height } = transaction;
        const confirmations = height > 0 ? blockHeight - height : 0;
        const inputsAmount = transaction.inputs.reduce((amount, i) => amount + i.value, 0);
        const outputsAmount = transaction.outputs.reduce((amount, o) => amount + o.value, 0);

        const fee = outputsAmount - inputsAmount;

        const inputsMyAmount = getMyAmount(wallet, transaction.inputs);

        const outputsMyAmount = getMyAmount(wallet, transaction.outputs);

        const feeSatoshi = btcToSatoshi(fee, 0);

        const myBalanceChangeSatoshi = btcToSatoshi(outputsMyAmount - inputsMyAmount, 0);

        let blockedAmount;
        if ([TxType.ALERT_PENDING, TxType.ALERT_CONFIRMED, TxType.ALERT_RECOVERED].includes(transaction.tx_type)) {
          blockedAmount = roundBtcToSatoshis(outputsMyAmount);
        }

        let unblockedAmount;
        if ([TxType.ALERT_CONFIRMED].includes(transaction.tx_type)) {
          unblockedAmount = blockedAmount;
        }

        const isFromMyWalletTx = wallet.weOwnAddress(transaction.inputs[0].addresses[0]);
        let toExternalAddress;
        let toInternalAddress;

        if ([TxType.RECOVERY].includes(transaction.tx_type) && isFromMyWalletTx) {
          const toAddress = transaction.outputs[0].addresses[0];
          const isInternalAddress = wallet.weOwnAddress(toAddress);

          if (isInternalAddress) {
            toInternalAddress = toAddress;
          } else {
            toExternalAddress = toAddress;
          }
        }

        return {
          ...transaction,
          confirmations: max([confirmations, 0]),
          walletPreferredBalanceUnit: walletBalanceUnit,
          walletId: id,
          walletLabel,
          toExternalAddress,
          toInternalAddress,
          ...(isFromMyWalletTx && { fee: roundBtcToSatoshis(fee), blockedAmount, unblockedAmount }),
          value: isFromMyWalletTx ? myBalanceChangeSatoshi - feeSatoshi : myBalanceChangeSatoshi,
          walletTypeReadable: wallet.typeReadable,
        };
      });
    }),
  );

  return txs.map(tx => {
    if (tx.tx_type !== TxType.RECOVERY) {
      return tx;
    }

    const recoveryInputsTxIds = flatten(tx.inputs.map(({ txid }) => txid));

    const recoveredTxs = txs.filter(t => {
      if (t.value >= 0 || t.walletId !== tx.walletId || t.txid === tx.txid) {
        return false;
      }

      const inputsTxIds = flatten(t.inputs.map(({ txid }) => txid));

      return inputsTxIds.some(inTxid => recoveryInputsTxIds.includes(inTxid));
    });

    if (recoveredTxs.length === 0) {
      return tx;
    }

    const { value: v, returnedFee: rF, unblockedAmount: uA } = recoveredTxs.reduce(
      (
        { value, returnedFee, unblockedAmount }: { value: number; returnedFee: number; unblockedAmount: number },
        rTx,
      ) => {
        return {
          value: value + Math.abs(rTx.value),
          returnedFee: returnedFee + Math.abs(rTx.fee || 0),
          unblockedAmount: unblockedAmount + (rTx.blockedAmount || 0),
        };
      },
      { value: 0, returnedFee: 0, unblockedAmount: 0 },
    );

    return {
      ...tx,
      value: v,
      returnedFee: rF,
      unblockedAmount: uA,
      recoveredTxsCounter: recoveredTxs.length,
    };
  });
});

export const getTranasctionsByWalletId = createSelector(
  transactions,
  (_: WalletsState, id: string) => id,
  (txs, id) => txs.filter(t => t.walletId === id),
);

export const getRecoveryTransactions = createSelector(getTranasctionsByWalletId, txs =>
  txs.filter(t => t.tx_type === TxType.RECOVERY),
);

export const getAlertPendingTransactions = createSelector(getTranasctionsByWalletId, txs =>
  txs.filter(t => t.tx_type === TxType.ALERT_PENDING),
);

export const getTransactionsToRecoverByWalletId = createSelector(getAlertPendingTransactions, txs =>
  txs.filter(tx => tx.value < 0 && tx.time),
);

export const hasWallets = createSelector(wallets, walletsList => walletsList.length > 0);

export const isLoading = createSelector(local, state => state.isLoading);
