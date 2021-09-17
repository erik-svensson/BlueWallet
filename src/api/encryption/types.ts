export enum Result {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface EncryptPinPayload {
  data: string;
  pubkey: string;
}

export interface EncryptPinResponse {
  result: 'success';
  session_token: string;
}

export interface EncryptPinResponseFailure {
  result: 'error';
  msg: string;
}
