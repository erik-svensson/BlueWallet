import { WalletPayload } from 'app/consts';

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

export interface UpdateNotificationEmailPayload {
  hashes: string[];
  old_email: string;
  new_email: string;
}

export interface UpdateNotificationEmailSuccessPayload {
  sessionToken: string;
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

export interface VerifyEmailResponse {
  result: string;
  pin: string;
}

export interface SubscribeWalletSuccessPayload {
  sessionToken: string;
}
