import { Result } from '../types';

export interface ResultResponse {
  result: Result;
  msg?: string;
}

export interface AirdropCheckWalletsSubscription {
  wallets: string[];
}
export interface AirdropCheckWalletsSubscriptionResponse {
  result: { [key: string]: number } | 'error';
}

export interface AirdropCheckSubscriptionResponse {
  result: boolean[];
}

export interface SharePayload {
  hash: string;
}

export interface CheckBalancesPayload {
  hashes: string[];
}

export interface CheckBalancesResponse {
  result: (number | null)[] | Result.ERROR;
  msg?: string;
}

export interface AirdropCheckBalanceWalletResponse {
  result: {
    badge: string;
    balance: string;
  };
}

export interface AirdropSocialLinksResponse {
  result: {
    medium: string;
    twitter: string;
    facebook: string;
  };
}
