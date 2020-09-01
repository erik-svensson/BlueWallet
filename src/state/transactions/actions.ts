import { Transaction } from 'app/consts';

export enum TransactionsAction {
  LoadTransactionsSuccess = 'LoadTransactionsSuccess',
  CreateTransactionNote = 'CreateTransactionNote',
  UpdateTransactionNote = 'UpdateTransactionNote',
  DeleteTransactionNote = 'DeleteTransactionNote',
}

export interface LoadTransactionsSuccessAction {
  type: TransactionsAction.LoadTransactionsSuccess;
  transactions: Transaction[];
  walletAddress: string;
}

export interface CreateTransactionNoteAction {
  type: TransactionsAction.CreateTransactionNote;
  transactionID: string;
  note: string;
}

export interface UpdateTransactionNoteAction {
  type: TransactionsAction.UpdateTransactionNote;
  transactionID: string;
  note: string;
}

export interface DeleteTransactionNoteAction {
  type: TransactionsAction.DeleteTransactionNote;
  transactionID: string;
}

export type TransactionsActionType =
  | CreateTransactionNoteAction
  | UpdateTransactionNoteAction
  | DeleteTransactionNoteAction
  | LoadTransactionsSuccessAction;

export const loadTransactionsSuccess = (
  walletAddress: string,
  transactions: Transaction[],
): LoadTransactionsSuccessAction => ({
  type: TransactionsAction.LoadTransactionsSuccess,
  transactions,
  walletAddress,
});

export const createTransactionNote = (transactionID: string, note: string): CreateTransactionNoteAction => ({
  type: TransactionsAction.CreateTransactionNote,
  transactionID,
  note,
});

export const updateTransactionNote = (transactionID: string, note: string): UpdateTransactionNoteAction => ({
  type: TransactionsAction.UpdateTransactionNote,
  transactionID,
  note,
});

export const deleteTransactionNote = (transactionID: string): DeleteTransactionNoteAction => ({
  type: TransactionsAction.DeleteTransactionNote,
  transactionID,
});
