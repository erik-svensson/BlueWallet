import { Wallet } from 'app/consts';

export enum WalletsAction {
  LoadWallets = 'LoadWallets',
  LoadWalletsSuccess = 'LoadWalletsSuccess',
  LoadWalletsFailure = 'LoadWalletsFailure',
  UpdateWallet = 'UpdateWallet',
}

export interface LoadWalletsAction {
  type: WalletsAction.LoadWallets;
  walletIndex?: number;
}

export interface LoadWalletsSuccessAction {
  type: WalletsAction.LoadWalletsSuccess;
  wallets: Wallet[];
}

export interface LoadWalletsFailureAction {
  type: WalletsAction.LoadWalletsFailure;
  error: Error;
}

export interface UpdateWalletAction {
  type: WalletsAction.UpdateWallet;
  wallet: Wallet;
}

export type WalletsActionType =
  | LoadWalletsAction
  | LoadWalletsSuccessAction
  | LoadWalletsFailureAction
  | LoadWalletsAction
  | UpdateWalletAction;

export const loadWallets = (walletIndex?: number): LoadWalletsAction => ({
  type: WalletsAction.LoadWallets,
  walletIndex,
});

export const loadWalletsSuccess = (wallets: Wallet[]): LoadWalletsSuccessAction => ({
  type: WalletsAction.LoadWalletsSuccess,
  wallets,
});

export const loadWalletsFailure = (error: Error): LoadWalletsFailureAction => ({
  type: WalletsAction.LoadWalletsFailure,
  error,
});

export const updateWallet = (wallet: Wallet): UpdateWalletAction => ({
  type: WalletsAction.UpdateWallet,
  wallet,
});
