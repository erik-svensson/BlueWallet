import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Wallet, Transaction } from 'app/consts';
import { isAllWallets } from 'app/helpers/helpers';
import { BlueApp } from 'app/legacy';

import { loadTransactionsSuccess } from '../transactions/actions';

const BlueElectrum = require('../../../BlueElectrum');

export enum AuthenticatorsAction {
  LoadWallets = 'LoadWallets',
  LoadWalletsRequest = 'LoadWalletsRequest',
  LoadWalletsSuccess = 'LoadWalletsSuccess',
  LoadWalletsFailure = 'LoadWalletsFailure',
  UpdateWallet = 'UpdateWallet',
}

export interface LoadWalletsAction {
  type: WalletsAction.LoadWallets;
}

export interface LoadWalletsRequestAction {
  type: WalletsAction.LoadWalletsRequest;
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
  | LoadWalletsRequestAction
  | LoadWalletsSuccessAction
  | LoadWalletsFailureAction
  | LoadWalletsAction
  | UpdateWalletAction;
