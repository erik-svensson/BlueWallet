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
  return new Promise(resolve => {
    setTimeout(resolve({ result: [true] }), Math.random() * 1000);
  });
  // return api.post(`check_subscription`, data);
};

// TODO:
// // naliczanie bonusu dla walletu który zasherował na mediach społecznościowych
// POST /share
// {
//  hash: string
// }
// Response:
// {
//   result: string // success or error
//   msg?:	string // error description
// }

// // sprawdzanie balansu walletów w momencie rozdawania airdropu
// POST /check_balances
// {
//  hashes:	[string]
// }
// Response:
// {
//   result: [120000000, null, 5200000000, 21000000000] | 'error' // null dla walletów które nie wzięły udział w airdropie
//   msg?:	string // error description
// }
