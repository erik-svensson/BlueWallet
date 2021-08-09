export interface Wallet {
  name: string;
  xpub: string;
  derivation_path: string[];
  gap_limit: string;
  recovery_public_key: string;
  instant_public_key: string;
}

export interface AuthenticateData {
  hash: string;
  pin: string;
}

export interface IsRegisteredPayload {
  hashes: string[];
}

export interface IsRegisteredResponse {
  response: boolean[];
}

export interface RegisterPayload {
  wallets: Wallet[];
}

export interface AuthenticatePayload {
  session_token: string;
  data: AuthenticateData[];
}
