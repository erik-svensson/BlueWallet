import { Result } from '../types';

export interface ResultResponse {
  result: Result;
  msg?: string;
}

export interface AirdropCheckWalletsSubscription {
  hashes: string[];
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

export interface GetUsersQuantityResponse {
  result: Result.ERROR | Result.SUCCESS;
  users: number;
}
