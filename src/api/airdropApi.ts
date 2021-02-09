import { WalletPayload } from 'app/consts';

export interface AirdropCheckWalletsSubscription {
  hashes: string[];
}

import api from './client';

export const subscribeWallet = (data: WalletPayload) => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ result: 'success' }), Math.random() * 1000);
  });
  // api.post(`subscribe/`, data);
};

export const checkWalletsSubscription = (data: AirdropCheckWalletsSubscription) => {
  return { result: [true] };
  // return { result: 'error' };
  // return api.post(`check_subscription`, data);
};

export const share = (data: { hash: string }) => {
  // hash of wallet from which user shared ^
  return { result: 'success' };
  // Response:
  // {
  //   result: string // success or error
  //   msg?:	string // error description
  // }
  // return api.post(`share`, data);
};

export const check_balances = (data: { hashes: string[] }) => {
  return { result: [120000000, null, 5200000000, 21000000000] };

  // Response:
  // {
  //   result: [120000000, null, 5200000000, 21000000000] | 'error' // null if wallet have not taken part in airdrop
  //   msg?:	string // error description
  // }
  // return api.post(`check_balances`, data);
};

// TODO: contract for this method has not been agreed on till now. When it s known, this have to be checked/reimplemented
export const getUsersQuantity = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ result: 'success', users: 4061 }), Math.random() * 1000);
  });
  // api.get(`users/`); // just an assumption
};
