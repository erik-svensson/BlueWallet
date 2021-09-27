import config from 'app/config';
import { WalletPayload } from 'app/consts';

import createHttpClient from '../client';
import { Result } from '../types';
import {
  AirdropCheckWalletsSubscription,
  AirdropCheckWalletsSubscriptionResponse,
  AirdropCheckBalanceWalletResponse,
  AirdropSocialLinksResponse,
} from './types';

const httpClient = createHttpClient(config.apiBaseUrl);

export const checkWalletsAirdropSubscription = (
  data: AirdropCheckWalletsSubscription,
): Promise<AirdropCheckWalletsSubscriptionResponse> => httpClient.post(`/airdrop/check/`, data);

export const subscribeAirdropWallet = (data: WalletPayload): Promise<WalletPayload> =>
  httpClient.post(`/airdrop/`, data);

export const checkBalance = (): Promise<Result> => httpClient.get(`/airdrop/`);

export const checkBalanceWallet = (data: any): Promise<AirdropCheckBalanceWalletResponse> =>
  httpClient.get(`/airdrop/${data.wallet}`);

export const getSocialLinks = (): Promise<AirdropSocialLinksResponse> => httpClient.get(`/airdrop_urls/`);
