import { Wallet } from 'app/consts';

export interface AuthenticateData {
  hash: string;
  pin: string;
}

export interface Authenticate {
  session_token: string;
  data: AuthenticateData[];
}

export interface IsRegisteredPayload {
  hashes: string[];
}

export interface IsRegisteredResponse {
  response: boolean[];
}

export interface RegisterPayload {
  payload: { wallets: Wallet[] };
}

export interface AuthenticatePayload {
  payload: Authenticate;
}
