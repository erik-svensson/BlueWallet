export type SecureTransactionType = 'Secure' | 'Secure Fast';

export enum WalletType {
  S_HD_P2SH,
  S_P2SH,
  S_HD_SEGWIT,
  KEY_2,
  KEY_3,
}

export type BasicWalletType = WalletType.S_HD_P2SH | WalletType.KEY_2 | WalletType.KEY_3;

export type StandardWalletType = WalletType.S_HD_P2SH | WalletType.S_HD_SEGWIT | WalletType.S_P2SH;

export interface ImportWalletOptions {
  type: BasicWalletType;
  name: string;
  seedPhrase: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

export interface CreateWalletOptions {
  type: WalletType;
  name: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

interface CommonWalletOptions {
  name: string;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

interface CommonImportWalletOptions extends CommonWalletOptions {
  seedPhrase: string;
}

export interface StandardWalletOptions extends CommonWalletOptions {
  type: StandardWalletType;
}

export interface TwoKeyWalletOptions extends CommonWalletOptions {
  type: WalletType.KEY_2;
  cancelPublicKey: string;
}

export interface ThreeKeyWalletOptions extends CommonWalletOptions {
  type: WalletType.KEY_3;
  fastPublicKey: string;
  cancelPublicKey: string;
}

export interface ImportStandardWalletOptions extends CommonImportWalletOptions {
  type: WalletType.S_HD_P2SH;
}

export interface Import2KeyWalletOptions extends TwoKeyWalletOptions, CommonImportWalletOptions {}

export interface Import3KeyWalletOptions extends ThreeKeyWalletOptions, CommonImportWalletOptions {}

export interface SendCoinsOptions {
  type: WalletType;
  amount: string;
  walletAddress: string;
  transactionNote?: string;
  transactionType?: SecureTransactionType;
  transactionPassword: string;
}

export enum TransactionType {
  RECEIVED,
  SENT,
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  CANCELED_DONE = 'CANCELED_DONE',
}

export interface ECDSA {
  PUBLIC_KEY: string;
  PRIVATE_KEY_PHRASE: string;
  PRIVATE_KEY: string;
}
