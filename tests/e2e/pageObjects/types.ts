export type BasicWalletType = '3-Key Vault' | '2-Key Vault' | 'Standard HD P2SH';

export type WalletType = BasicWalletType | 'Standard P2SH' | 'Standard HD SegWit';

export type TransactionType = 'Secure' | 'Secure Fast';

export interface ImportWalletOptions {
  type: BasicWalletType;
  name: string;
  seedPhrase: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
  emailAddress?: string;
}

export interface CreateWalletOptions {
  type: WalletType;
  name: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
  emailAddress?: string;
}

export interface SendCoinsOptions {
  type: WalletType;
  amount: string;
  walletAddress: string;
  transactionNote?: string;
  transactionType?: TransactionType;
  transactionPassword: string;
}
