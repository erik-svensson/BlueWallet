import { cloneDeep } from 'lodash';

import { RegisterResponse } from 'app/api/wallet/types';
import { Wallet } from 'app/consts';

import { WalletsAction, WalletsActionType } from './actions';

export interface WalletsState {
  wallets: Wallet[];
  isRegisteredWallets: boolean[];
  walletToRegister: RegisterResponse | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | Error | null;
}

const initialState: WalletsState = {
  wallets: [],
  isRegisteredWallets: [],
  walletToRegister: null,
  isInitialized: false,
  isLoading: false,
  error: null,
};

export const walletsReducer = (state = initialState, action: WalletsActionType): WalletsState => {
  switch (action.type) {
    case WalletsAction.LoadWallets:
    case WalletsAction.DeleteWallet:
    case WalletsAction.CreateWallet:
    case WalletsAction.ImportWallet:
    case WalletsAction.IsRegisteredWallet:
    case WalletsAction.RegisterWallet:
    case WalletsAction.AuthenticateWallet:
      return {
        ...state,
        isLoading: true,
      };
    case WalletsAction.LoadWalletsSuccess:
      return {
        ...state,
        wallets: cloneDeep(action.wallets),
        isLoading: false,
        isInitialized: true,
        error: null,
      };
    case WalletsAction.DeleteWalletSuccess:
      return {
        ...state,
        wallets: state.wallets.filter(w => w.id !== action.wallet.id),
        isLoading: false,
        error: null,
      };
    case WalletsAction.ImportWalletSuccess:
    case WalletsAction.CreateWalletSuccess:
      return {
        ...state,
        // filter wallets with same id to prevent duplicates
        wallets: [...state.wallets.filter(w => w.id !== action.wallet.id), cloneDeep(action.wallet)],
        isLoading: false,
        error: null,
      };
    case WalletsAction.DeleteWalletFailure:
    case WalletsAction.LoadWalletsFailure:
    case WalletsAction.CreateWalletFailure:
    case WalletsAction.ImportWalletFailure:
    case WalletsAction.RefreshWalletFailure:
    case WalletsAction.IsRegisteredWalletFailure:
    case WalletsAction.RegisterWalletFailure:
    case WalletsAction.AuthenticateWalletFailure:
    case WalletsAction.PrepareWalletsFailure:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case WalletsAction.UpdateWalletSuccess:
    case WalletsAction.RefreshWalletSuccess:
      return {
        ...state,
        wallets: state.wallets.map(wallet => {
          if (wallet.id === action.wallet.id) {
            return action.wallet;
          }
          return wallet;
        }),
      };
    case WalletsAction.IsRegisteredWalletSuccess:
      return {
        ...state,
        isRegisteredWallets: action.hashes,
        isLoading: false,
        error: null,
      };
    case WalletsAction.RegisterWalletSuccess:
      return {
        ...state,
        walletToRegister: action.data,
        isLoading: false,
        error: null,
      };
    case WalletsAction.AuthenticateWalletSuccess:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};
