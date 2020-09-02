import { Wallet, ActionMeta } from 'app/consts';

export enum WalletsAction {
  LoadWallets = 'LoadWallets',
  LoadWalletsSuccess = 'LoadWalletsSuccess',
  LoadWalletsFailure = 'LoadWalletsFailure',
  DeleteWallet = 'DeleteWallet',
  DeleteWalletSuccess = 'DeleteWalletSuccess',
  DeleteWalletFailure = 'DeleteWalletFailure',
  UpdateWallet = 'UpdateWallet',
}

export interface LoadWalletsAction {
  type: WalletsAction.LoadWallets;
}

export interface LoadWalletsSuccessAction {
  type: WalletsAction.LoadWalletsSuccess;
  wallets: Wallet[];
}

export interface LoadWalletsFailureAction {
  type: WalletsAction.LoadWalletsFailure;
  error: Error;
}

export interface DeleteWalletAction {
  type: WalletsAction.DeleteWallet;
  payload: { id: string };
  meta?: ActionMeta;
}

export interface DeleteWalletSuccessAction {
  type: WalletsAction.DeleteWalletSuccess;
  wallet: Wallet;
}

export interface DeleteWalletFailureAction {
  type: WalletsAction.DeleteWalletFailure;
  error: Error;
}

export interface UpdateWalletAction {
  type: WalletsAction.UpdateWallet;
  wallet: Wallet;
}

export type WalletsActionType =
  | LoadWalletsSuccessAction
  | LoadWalletsFailureAction
  | LoadWalletsAction
  | DeleteWalletSuccessAction
  | DeleteWalletFailureAction
  | DeleteWalletAction
  | UpdateWalletAction;

export const loadWallets = (): LoadWalletsAction => ({
  type: WalletsAction.LoadWallets,
});

export const loadWalletsSuccess = (wallets: Wallet[]): LoadWalletsSuccessAction => ({
  type: WalletsAction.LoadWalletsSuccess,
  wallets,
});

export const loadWalletsFailure = (error: Error): LoadWalletsFailureAction => ({
  type: WalletsAction.LoadWalletsFailure,
  error,
});

export const deleteWallet = (id: string, meta?: ActionMeta): DeleteWalletAction => ({
  type: WalletsAction.DeleteWallet,
  payload: {
    id,
  },
  meta,
});

export const deleteWalletSuccess = (wallet: Wallet): DeleteWalletSuccessAction => ({
  type: WalletsAction.DeleteWalletSuccess,
  wallet,
});

export const deleteWalletFailure = (error: Error): DeleteWalletFailureAction => ({
  type: WalletsAction.DeleteWalletFailure,
  error,
});

export const updateWallet = (wallet: Wallet): UpdateWalletAction => ({
  type: WalletsAction.UpdateWallet,
  wallet,
});
