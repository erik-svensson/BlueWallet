import { Wallet } from 'app/consts';

export interface AuthenticateData {
  hash: string;
  pin: string;
}

export interface Authenticate {
  session_token: string;
  data: {
    [key: string]: string;
  };
}

export interface IsRegisteredPayload {
  wallets: string[];
}

export interface IsRegisteredResponse {
  response: boolean[];
}

export interface RegisterPayload {
  wallets: Wallet[];
}

export interface RegisterResponse {
  session_token: string;
  result: { [key: string]: string };
}

export interface AuthenticatePayload {
  payload: Authenticate;
}
