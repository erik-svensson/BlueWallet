import config from 'app/config';
import { WalletPayload } from 'app/consts';

import createHttpClient from '../client';
import { Result } from '../types';
import { AirdropCheckWalletsSubscription } from './types';

const httpClient = createHttpClient(config.airdropApi);

export const checkWalletsAirdropSubscription = (
  data: AirdropCheckWalletsSubscription,
): Promise<AirdropCheckWalletsSubscription> => httpClient.post(`/airdrop/check/`, data);

export const subscribeAirdropWallet = (data: WalletPayload): Promise<WalletPayload> =>
  httpClient.post(`/airdrop/`, data);

export const checkBalance = (): Promise<Result> => httpClient.get(`/airdrop/`);

export const checkBalanceWallet = (wallet: any): Promise<Result> => httpClient.get(`/airdrop/${wallet}`);
