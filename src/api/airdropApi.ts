import { AirdropCheckWalletsSubscription } from 'app/api';
import { WalletPayload } from 'app/consts';

import api from './client';

// Response:
// {
//   result: string // success or error
//   msg?:	string // error description
// }
export const subscribeWallet = (data: WalletPayload) => {
  return new Promise(resolve => {
    setTimeout(resolve({ result: 'success' }), Math.random() * 1000);
  });
  // api.post(`subscribe/`, data);
};

// czy wallety biorą udział w airdropie, hashe te same co przy notyfikacjach
// POST /check_subcription
// {
//  hashes:	[string]
// }
// Response:
// {
//   result: [array of subscription query result for requested wallets boolean] | 'error'
//   msg?:	string // error description
// }

export const checkWalletsSubscription = (data: AirdropCheckWalletsSubscription) => {
  return { result: [true, true] };
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
  //   result: [120000000, null, 5200000000, 21000000000] | 'error' // null dla walletów które nie wzięły udział w airdropie
  //   msg?:	string // error description
  // }
  // return api.post(`check_balances`, data);
};
