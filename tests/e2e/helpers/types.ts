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
