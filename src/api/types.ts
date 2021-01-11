import { Transaction, WalletPayload } from 'app/consts';

export interface Wallet {
  balance: number;
  hideBalance: boolean;
  preferredBalanceUnit: string;
  label: string;
  chain: string;
  num_addresses: number;
  transactions: Transaction[];
  address?: string;
  secret: string;
  type: string;
  typeReadable: string;
  unconfirmed_balance: number;
  confirmed_balance: number;
  outgoing_balance: number;
  incoming_balance: number;
  utxo: any[];
  _xpub: string;
  id: string;
  password?: string;
}

export interface SubscribePayload {
  wallets: WalletPayload[];
  email: string;
  lang: string;
}

export interface UnsubscribePayload {
  hashes: string[];
  email: string;
}

export interface AuthenticatePayload {
  session_token: string;
  pin: string;
}

export interface ModifyPayload {
  hashes: string[];
  old_email: string;
  new_email: string;
}

export interface CheckSubscriptionPayload {
  hashes: string[];
  email: string;
}

export interface VerifyEmailPayload {
  email: string;
}
export interface SubscribeWalletSuccessPayload {
  sessionToken: string;
}
