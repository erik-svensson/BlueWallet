export type BasicWalletType = '3-Key Vault' | '2-Key Vault' | 'Standard HD P2SH';

export type WalletType = BasicWalletType | 'Standard P2SH' | 'Standard HD SegWit';

export type TransactionType = 'Secure' | 'Secure Fast';

export interface ImportWalletOptions {
  type: BasicWalletType;
  name: string;
  seedPhrase: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
}

export interface CreateWalletOptions {
  type: WalletType;
  name: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
}

export interface SendCoinsOptions {
  type: WalletType;
  amountToSend: string;
  walletAdress: string;
  transactionNote: string;
  transactionType?: TransactionType;
  transactionPassword: string;
}
