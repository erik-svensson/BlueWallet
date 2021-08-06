export type SecureTransactionType = 'Secure' | 'Secure Fast';

export enum WalletType {
  S_HD_P2SH = 'Standard HD P2SH',
  S_P2SH = 'Standard P2SH',
  S_HD_SEGWIT = 'Standard HD SegWit',
  KEY_2 = '2-Key Vault',
  KEY_3 = '3-Key Vault',
}

export type BasicWalletType = WalletType.S_HD_P2SH | WalletType.KEY_2 | WalletType.KEY_3;

export type StandardWalletType = WalletType.S_HD_P2SH | WalletType.S_HD_SEGWIT | WalletType.S_P2SH;

export interface ECDSA {
  publicKey: string;
  privateKeyPhrase: string;
  privateKey: string;
}

interface SecretsStandard {
  seedPhrase: string;
}

interface Secrets2Key extends SecretsStandard {
  cancelKey: ECDSA;
}

interface Secrets3Key extends Secrets2Key {
  fastKey: ECDSA;
}

export interface DataActiveTxWallets {
  [WalletType.KEY_3]: Secrets3Key;
  [WalletType.KEY_2]: Secrets2Key;
  [WalletType.S_HD_P2SH]: SecretsStandard;
  [WalletType.S_P2SH]: SecretsStandard;
  [WalletType.S_HD_SEGWIT]: SecretsStandard;
}

export interface DataTxProperties {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  from: string;
  amount: number;
}

interface DataTx {
  transactions: Array<DataTxProperties>;
}

export interface DataFrozenTxWallets {
  [WalletType.KEY_3]: Secrets3Key & DataTx;
  [WalletType.KEY_2]: Secrets2Key & DataTx;
  [WalletType.S_HD_P2SH]: SecretsStandard & DataTx;
  [WalletType.S_P2SH]: SecretsStandard & DataTx;
  [WalletType.S_HD_SEGWIT]: SecretsStandard & DataTx;
}

export interface DataTestWallets {
  frozenTxWallets: DataFrozenTxWallets;
  activeTxWallets: DataActiveTxWallets;
  moneybox: {
    address: string;
  } & Secrets3Key;
  contactAddress: string;
}

export interface DataTestEnv {
  emailNotificationSenderAddress: string;
}

export interface ImportWalletOptions {
  type: BasicWalletType;
  name: string;
  secrets: SecretsStandard & Partial<Secrets3Key>;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

export interface CreateWalletOptions {
  type: WalletType;
  name: string;
  secrets?: Partial<Omit<Secrets3Key, 'seedPhrase'>>;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

interface CommonAddWalletOptions {
  name: string;
  emailAddress?: string;
  skipEmailSubscription?: boolean;
}

export interface CreateStandardWalletOptions extends CommonAddWalletOptions {
  type: StandardWalletType;
}

export interface Create2KeyWalletOptions extends CommonAddWalletOptions {
  type: WalletType.KEY_2;
  secrets: Omit<Secrets2Key, 'seedPhrase'>;
}

export interface Create3KeyWalletOptions extends CommonAddWalletOptions {
  type: WalletType.KEY_3;
  secrets: Omit<Secrets3Key, 'seedPhrase'>;
}

export interface ImportStandardWalletOptions extends CommonAddWalletOptions {
  secrets: SecretsStandard;
  type: WalletType.S_HD_P2SH;
}

export interface Import2KeyWalletOptions extends CommonAddWalletOptions {
  secrets: Secrets2Key;
  type: WalletType.KEY_2;
}

export interface Import3KeyWalletOptions extends CommonAddWalletOptions {
  secrets: Secrets3Key;
  type: WalletType.KEY_3;
}

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
