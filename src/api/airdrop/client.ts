import config from 'app/config';
import { WalletPayload } from 'app/consts';

import createHttpClient from '../client';
import { Result } from '../types';
import {
  AirdropCheckSubscriptionResponse,
  ResultResponse,
  AirdropCheckWalletsSubscription,
  SharePayload,
  CheckBalancesPayload,
  CheckBalancesResponse,
  GetUsersQuantityResponse,
} from './types';

const httpClient = createHttpClient(config.airdropApi);

export const subscribeWallet = (data: WalletPayload): Promise<ResultResponse> =>
  new Promise(resolve => {
    setTimeout(() => resolve({ result: Result.SUCCESS }), Math.random() * 5000);
  });
// httpClient.post(`/subscribe/`, data);

export const checkWalletsSubscription = (data: AirdropCheckWalletsSubscription): AirdropCheckSubscriptionResponse => ({
  result: [true],
});
// httpClient.post(`/check_subscription/`, data);

export const share = (data: SharePayload): Promise<ResultResponse> =>
  new Promise(resolve => {
    setTimeout(() => resolve({ result: Result.SUCCESS }), Math.random() * 5000);
  });
// httpClient.post(`/share/`, data);

export const check_balances = (data: CheckBalancesPayload): CheckBalancesResponse => ({
  result: [120000000, null, 5200000000, 21000000000],
});
// httpClient.put(`/check_balances/`, data);

export const getUsersQuantity = (): Promise<GetUsersQuantityResponse> =>
  new Promise(resolve => {
    setTimeout(() => resolve({ result: Result.SUCCESS, users: 4061 }), Math.random() * 1000);
  });
// httpClient.post(`/users/`, data);
